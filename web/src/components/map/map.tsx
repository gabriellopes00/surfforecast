import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { MapComponent } from './styles'
import mapIcon from './map-icon'
import 'leaflet/dist/leaflet.css'

export const Map: React.FC = () => {
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
  return (
    <MapComponent>
      <MapContainer
        center={[-23.888554, -46.36045]}
        zoom={10}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution="&copy; Surfforecast"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {beaches.map(beach => {
          return (
            <Marker position={[beach.lat, beach.lng]} icon={mapIcon}>
              <Popup>{beach.name}</Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </MapComponent>
  )
}
