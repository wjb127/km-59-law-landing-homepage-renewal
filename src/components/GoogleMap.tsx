'use client';

import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

interface GoogleMapComponentProps {
  address: string;
  lat?: number;
  lng?: number;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// 서초구 법조타운 근처 좌표 (예시)
const defaultCenter = {
  lat: 37.4923,
  lng: 127.0066,
};

export default function GoogleMapComponent({
  address,
  lat = defaultCenter.lat,
  lng = defaultCenter.lng
}: GoogleMapComponentProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const center = { lat, lng };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-full bg-grey-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-grey-400 mx-auto mb-2" />
          <p className="text-grey-500">지도를 불러올 수 없습니다</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-grey-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin mx-auto mb-2" />
          <p className="text-grey-500">지도 로딩중...</p>
        </div>
      </div>
    );
  }

  // API 키가 없는 경우 placeholder 표시
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full bg-grey-100 flex items-center justify-center">
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-primary-700 mx-auto mb-3" />
          <p className="text-grey-700 font-medium mb-2">법무법인 성진</p>
          <p className="text-grey-500 text-sm">{address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-primary-800 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
          >
            Google Maps에서 보기
          </a>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      <Marker
        position={center}
        title="법무법인 성진"
      />
    </GoogleMap>
  );
}
