import { useState, useEffect } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  GeoJSON,
} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Building } from 'types/Client';
import type { RootState } from 'app/store';
import { useAppSelector } from 'app/hooks';
import countries from 'mocking/countries.json';

import './Map.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const [marker, setMarker] = useState<number[]>();

  const client = useAppSelector(
    (state: RootState) => state.clients.selectedClient
  );

  const selectedBuilding = useAppSelector(
    (state: RootState) => state.clients.selectedBuilding
  );

  useEffect(() => {
    const selected = client?.buildings.find(
      (building: Building) => building.id === selectedBuilding!.id
    );

    if (!!selected) {
      setMarker(selected!.position as any);
    }
  }, [client, selectedBuilding]);

  return (
    <div className="map-wrapper">
      <div className="header">
        Selected Building <strong>{selectedBuilding?.name}</strong> Map View
      </div>
      {marker && (
        <MapContainer
          center={{ lat: marker![0], lng: marker![1] }}
          zoom={8}
          scrollWheelZoom={false}
          key={Math.random()}
          className="map-view"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={countries.features as any} />
          <Marker position={{ lat: marker![0], lng: marker![1] }}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            <Tooltip>
              <strong>{selectedBuilding?.name}</strong> Located in{' '}
              <strong>{selectedBuilding?.country}</strong>
            </Tooltip>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
