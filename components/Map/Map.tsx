import { Spinner, Text } from '@chakra-ui/react'
import { 
  GoogleMap,
  GoogleMapProps,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import { getCenter } from 'geolib'
import { GeolibInputCoordinates } from 'geolib/es/types'
import { MapMarker } from './MapMarker'

interface MapProps extends GoogleMapProps {
  defaultCenter: google.maps.LatLngLiteral
  markerPositionToTitleMap?: Map<google.maps.LatLngLiteral, string>
}

export const Map = ({
  defaultCenter,
  markerPositionToTitleMap,
  ...props
}: MapProps): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY ?? '',
  })

  const geoLibCoords: GeolibInputCoordinates[] = []
  const markers: JSX.Element[] = []
  markerPositionToTitleMap?.forEach((title, position) => {
    markers.push(<MapMarker key={title} position={position} title={title} />)
    geoLibCoords.push({latitude: position.lat, longitude: position.lng})
  })

  const center = getCenter(geoLibCoords)

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
          zoom={12}
          {...props}
        >
          {markers}
        </GoogleMap>
      : <Spinner />
  )
}
