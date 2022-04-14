import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import Leaflet, { LatLng, latLngBounds, FeatureGroup } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import RedDotIcon from './RedDotIcon'

// Setup default icons for makers
let DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

Leaflet.Marker.prototype.options.icon = DefaultIcon

const defaultCenter = [10.0312, 105.7709]
const defaultZoom = 16

const Map = ({ center, zoom, style, markers, handleClick, useRedDotIcon }) => {
  return (
    <MapContainer
      center={center || defaultCenter}
      zoom={zoom || defaultZoom}
      style={style || { width: '100%', height: '100%' }}
    >
      {markers && markers.length > 1 && <ChangeView markers={markers} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers &&
        markers.map(
          (maker, index) =>
            maker.position && (
              <Marker
                key={index}
                position={maker.position}
                icon={(useRedDotIcon && RedDotIcon) || DefaultIcon}
              >
                <Popup>{maker.popup}</Popup>
              </Marker>
            )
        )}
      <MapEvents handleClick={handleClick} />
    </MapContainer>
  )
}

const ChangeView = ({ markers }) => {
  const map = useMap()

  let markerBounds = latLngBounds([])

  markers.forEach((marker) => {
    markerBounds.extend([marker.position.lat, marker.position.lng])
  })

  map.fitBounds(markerBounds)

  return null
}

const MapEvents = ({ handleClick }) => {
  useMapEvents({
    click(e) {
      handleClick && handleClick(e)
    },
  })
  return false
}

export default Map
