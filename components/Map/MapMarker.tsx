import { Text } from '@chakra-ui/react'
import { InfoWindow, Marker, MarkerProps } from '@react-google-maps/api'
import { useState } from 'react'

export const MapMarker = ({position, title}: MarkerProps): JSX.Element => {
  const marker = new google.maps.Marker()
  marker.setOptions({
    anchorPoint: new google.maps.Point(0, -40),
  })

  const [showInfoWindow, setShowInfoWindow] = useState(false)

  return (
    <>
      <Marker
        position={position}
        onClick={() => setShowInfoWindow(true)}
      />
      {showInfoWindow &&
        <InfoWindow
          position={position}
          anchor={marker}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <Text>{title}</Text>
        </InfoWindow>
      }
    </>
  )
}
