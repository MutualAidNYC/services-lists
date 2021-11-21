import ReactMapGL, { Feature, Layer } from "react-mapbox-gl"
import { Coordinate } from '../models'

interface MapProps {
  defaultCenter: Coordinate
  coordinateToNameMap: Map<Coordinate, string>
}

export const Map = ({defaultCenter, coordinateToNameMap}: MapProps): JSX.Element => {
  const Map = ReactMapGL({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '',
  })

  const features: JSX.Element[] = []
  coordinateToNameMap.forEach((name, coordinate) => {
    features.push(
      <Feature
        key={coordinate.toString()}
        coordinates={[coordinate.longitude, coordinate.latitude]}
        properties={{ name }}
      />
    )
  })

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: "500px",
        width: "500px"
      }}
      center={[defaultCenter.longitude, defaultCenter.latitude]}
    >
      <Layer
        id="services"
        type="symbol"
        layout={{
          "icon-image": "marker-15",
        }}
      >
        {features}
      </Layer>
    </Map>
  )
}
