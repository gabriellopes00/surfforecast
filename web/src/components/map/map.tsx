import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapWrapper } from './styles'
import { mapIcon } from './map-icon'

import { Props } from '../interfaces/beach'

export const MapComponent: React.FC<Props> = ({ beaches }) => {
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
