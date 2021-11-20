import { Text } from '@chakra-ui/react'
import { InfoWindow, Marker, MarkerProps } from '@react-google-maps/api'
import { useState } from 'react'

export const MapMarker = ({position, title}: MarkerProps): JSX.Element => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false)

  return (
    <>
      <Marker position={position} onClick={() => setIsInfoWindowOpen(true)}/>
      {isInfoWindowOpen && 
        <InfoWindow
          position={position}
          onCloseClick={() => setIsInfoWindowOpen(false)} 
        >
          <Text>{title}</Text>
        </InfoWindow>
      }
    </>
  )
}
