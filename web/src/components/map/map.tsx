import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { MapContainer } from './styles'
export const MapComponent = () => {
  const beaches = [
    {
      name: 'Beach 1',
      lat: -24.014985,
      lng: -46.416246
    },
    {
      name: 'Beach 2',
      lat: -23.99884,
      lng: -46.259506
    },
    {
      name: 'Beach 3',
      lat: -23.970462,
      lng: -46.336828
    },
    {
      name: 'Beach 4',
      lat: -23.965266,
      lng: -46.184412
    },
    {
      name: 'Beach 5',
      lat: -23.835567,
      lng: -46.117809
    },
    {
      name: 'Beach 6',
      lat: -23.756509,
      lng: -45.834832
    },
    {
      name: 'Beach 7',
      lat: -24.184869,
      lng: -46.784054
    }
  ]

  const mapStyles = {
    height: '100%',
    width: '100%'
  }

  const defaultCenter = {
    lat: -24.006523,
    lng: -46.265617
  }

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey="AIzaSyALSm0yC_KxJeUM78yjFEmWxupbmtgu6ao">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
          {beaches.map(beach => {
            return (
              <Marker
                key={beach.name}
                position={{ lat: beach.lat, lng: beach.lng }}
                title={beach.name}
              />
            )
          })}
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  )
}
