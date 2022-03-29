import L from 'leaflet'

import icon from '../../assets/icons/red_dot_icon.png'

const RedDotIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconSize: [10, 10],
  // iconAnchor: [12, 41],
})

export default RedDotIcon
