import { Spinner, Text } from '@chakra-ui/react'
import {
  GoogleMap,
  GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api'
import { getCenter } from 'geolib'
import { useEffect, useMemo } from 'react'
import { Address } from '../../models'
import { MapMarker } from './MapMarker'


interface MapProps extends GoogleMapProps {
  defaultCenter: google.maps.LatLngLiteral
  addressIdToLabel: Record<string, string>
  addresses: Address[]
  selectedAddress: Address | undefined
  filteredAddreses: Address[]

}

export const Map = ({
  defaultCenter,
  addressIdToLabel,
  addresses,
  selectedAddress,
  filteredAddreses,

  ...props
}: MapProps): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_JS_API_KEY ?? '',
  })



  const center = getCenter(addresses.map(address => ({ latitude: address.latitude, longitude: address.longitude })))

  const addressMatch = (address: Address) => {
    for (let i = 0; i < filteredAddreses.length; i++) {
      if (filteredAddreses[i] === address) {
        return true
      }
    }
    return false
  }



  return (
    loadError
      ? <Text>{loadError}</Text>
      : isLoaded
        ? <GoogleMap
          mapContainerStyle={{
            minHeight: '100%',
            height: '100%',
            width: "100%",
            overflow: 'hidden',

          }}
          center={
            center
              ? { lat: center.latitude, lng: center.longitude }
              : defaultCenter
          }
          zoom={11}
          {...props}
        >

          {
            filteredAddreses.length > 0 ?
              filteredAddreses.map((address) => (
                <MapMarker
                  opacity={selectedAddress ? selectedAddress === address ? 1.0 : 0.3 : 1.0}
                  key={address.id}
                  label={addressIdToLabel[address.id]}
                  address={address}
                />
              ))
              :
              addresses.map((address) => (
                <MapMarker
                  opacity={selectedAddress ? selectedAddress === address ? 1.0 : 0.3 : 1.0}
                  key={address.id}
                  label={addressIdToLabel[address.id]}
                  address={address}
                />
              ))
          }

        </GoogleMap>
        : <Spinner />
  )
}

{/* <MapMarker
              opacity={selectedAddress? selectedAddress===address? 1.0 : 0.3 : 1.0}
              key={address.id}
              label={addressIdToLabel[address.id]}
              address={address}            
            /> */}

            // addresses.map((address) => (
            //   <MapMarker
            //     opacity={selectedAddress ? selectedAddress === address ? 1.0 : 0.3 : 1.0}
            //     key={address.id}
            //     label={addressIdToLabel[address.id]}
            //     address={address}
            //   />
            // ))