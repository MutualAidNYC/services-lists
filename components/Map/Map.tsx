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
  selectedAddress?: Address
  width: string
  height: string
}

export const Map = ({
  defaultCenter,
  addressIdToLabel,
  addresses,
  selectedAddress,
  width,
  height,
  ...props
}: MapProps): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY ?? '',
  })

  const coords: GeolibInputCoordinates[] = []
  addresses.forEach((address) => {
    if (address['y-latitutude'] && address['y-longitude']) {
      coords.push({
        lat: address['y-latitutude'],
        lng: address['y-longitude'],
      })
    }
  })
  const center = getCenter(coords)

  return loadError ? (
    <Text>{loadError}</Text>
  ) : isLoaded ? (
    // For some reason  doesn't work with % width & height you need to use pixel numbers unless pos is absolute
    <GoogleMap
      mapContainerStyle={{
        minHeight: height,
        height: height,
        width: width,
        overflow: 'hidden',
      }}
      center={
        center ? { lat: center.latitude, lng: center.longitude } : defaultCenter
      }
      zoom={11}
      {...props}
    >
      {addresses.map((address) => (
        <MapMarker
          opacity={
            selectedAddress ? (selectedAddress === address ? 1.0 : 0.3) : 1.0
          }
          key={address.id}
          label={addressIdToLabel[address.id]}
          address={address}
        />
      ))}
    </GoogleMap>
  ) : (
    <Spinner />
  )
}
