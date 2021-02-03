import Leaflet from 'leaflet'

import mapMarkerImg from '../../assets/images/marker.svg'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [38, 38],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default mapIcon
