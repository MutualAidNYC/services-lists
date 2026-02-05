import { Box, Heading, Text } from '@chakra-ui/react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import { MapMarkerAddress } from 'models'
import { useState } from 'react'

interface MapMarkerProps {
  label: string
  address: MapMarkerAddress
  opacity?: number | undefined
}

export const MapMarker = ({
  label,
  address,
  opacity,
}: MapMarkerProps): JSX.Element => {
  const position = {
    lat: Number(address.latitude),
    lng: Number(address.longitude),
  }

  const marker = new google.maps.Marker()
  marker.setOptions({
    anchorPoint: new google.maps.Point(0, -40),
  })

  const [showInfoWindow, setShowInfoWindow] = useState(false)

  return (
    <>
      <Marker
        opacity={opacity}
        position={position}
        onClick={() => setShowInfoWindow(true)}
      />
      {showInfoWindow && (
        <InfoWindow
          position={position}
          anchor={marker}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <Box w="240px">
            <Heading fontSize="16px" mb="8px">
              {label}
            </Heading>
            <Text>{address.streetAddress}</Text>
            <Text>{`${address.city}, ${address.state} ${address.zip}`}</Text>
          </Box>
        </InfoWindow>
      )}
    </>
  )
}
