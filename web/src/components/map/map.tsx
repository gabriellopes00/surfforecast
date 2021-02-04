import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapWrapper } from './styles'
import { mapIcon } from './map-icon'

const beaches = [
  {
    name: 'Beach 1 asdf asdf asdf',
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

export const MapComponent: React.FC = () => {
  const position = {
    lat: -24.006523,
    lng: -46.265617
  }

  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {beaches.map(beach => {
          return (
            <Marker position={[beach.lat, beach.lng]} icon={mapIcon}>
              <Popup closeButton={true} maxWidth={50} minWidth={50}>
                {beach.name}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </MapWrapper>
  )
}
