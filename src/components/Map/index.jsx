import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// Setup default icons for makers
let DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

Leaflet.Marker.prototype.options.icon = DefaultIcon

const Map = ({ center, zoom, style, makers, handleClick }) => {
  return (
    <MapContainer
      center={center || [10.0312, 105.7709]}
      zoom={zoom || 20}
      style={style || { width: '100%', height: '100%' }}
      onClick={handleClick}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {makers &&
        makers.map((maker, index) => (
          <Marker key={index} position={maker.position}>
            <Popup>{maker.popup}</Popup>
          </Marker>
        ))}
      <MapEvents handleClick={handleClick} />
    </MapContainer>
  )
}

const MapEvents = ({ handleClick }) => {
  useMapEvents({
    click(e) {
      handleClick(e)
    },
  })
  return false
}

export default Map
