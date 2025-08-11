//https://react-leaflet.js.org/docs/api-map/

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//핀을 누르면 팝업 화면 같은게 나와서 사진이랑 정보같은걸 보여줘보는게 좋을것같다.
//지도에서 핀을 누르면 visitedCities에 들어가도록 해보는것도 좋을것같다.

const visitedCities = [
  { name: '파리', coords: [48.8566, 2.3522] },
  { name: '바르셀로나', coords: [41.3851, 2.1734] },
  { name: '로마', coords: [41.9028, 12.4964] },
  { name: '서울', coords: [37.5665, 126.9780] },
  { name: '베트남 (하노이)', coords: [21.0285, 105.8544] },
  { name: '괌', coords: [13.4443, 144.7937] },
  { name: '인도네시아 (자카르타)', coords: [-6.2088, 106.8456] },
  { name: '라오스 (비엔티안)', coords: [17.9757, 102.6331] },
  { name: '삿포로', coords: [43.0618, 141.3545] },
  { name: '도쿄', coords: [35.6764, 139.6500] },
  { name: '후쿠오카', coords: [33.5904, 130.4017] },
  { name: '오사카', coords: [34.6937, 135.5023] },
];

function MapSection() {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={[36.5, 125.5]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visitedCities.map((city) => (
          <Marker key={city.name} position={city.coords}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapSection;
