import { Spinner, Text } from '@chakra-ui/react'
import { 
  GoogleMap,
  GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api'
import { getCenter } from 'geolib'
import { GeolibInputCoordinates } from 'geolib/es/types'
import { Address } from 'models'
import { MapMarker } from './MapMarker'

interface MapProps extends GoogleMapProps {
  defaultCenter: google.maps.LatLngLiteral
  addressIdToLabel: Record<string, string>
  addresses: Address[]
}

export const Map = ({
  defaultCenter,
  addressIdToLabel,
  addresses,
  ...props
}: MapProps): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY ?? '',
  })

  const coords: GeolibInputCoordinates[] = []
  addresses.forEach(address => {
    if (address.latitude && address.longitude) {
      coords.push({
        lat: address.latitude,
        lng: address.longitude,
      })
    }
  })
  const center = getCenter(coords)
  

  return (
    loadError
    ? <Text>{loadError}</Text>
    : isLoaded 
      ? <GoogleMap
          mapContainerStyle={{
            height: "400px",
            width: "67%",
          }}
          center={
            center
              ? {lat: center.latitude, lng: center.longitude}
              : defaultCenter
          }
          zoom={11}
          {...props}
        >
          {addresses.map(address => (
            <MapMarker
              key={address.id}
              label={addressIdToLabel[address.id]}
              address={address} 
            />
          ))}
        </GoogleMap>
      : <Spinner />
  )
}
