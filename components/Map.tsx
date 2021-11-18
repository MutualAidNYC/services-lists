import ReactMapGL, { Layer, Feature } from "react-mapbox-gl"

export const Map = (): JSX.Element => {
  const Map = ReactMapGL({
    accessToken: process.env.MAP_BOX_ACCESS_TOKEN
  });

  return <Map
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw'
    }}
  >
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'harbor-15' }}>
      <Feature coordinates={[40.74964, -73.93957]} />
    </Layer>
  </Map>;
}