import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const Map = () => {
  const [origin, setOrigin] = useState({ lat: 40.712776, lng: -74.005974 }); // Default origin coordinates (New York City)
  const [destination, setDestination] = useState({ lat: 34.052235, lng: -118.243683 }); // Default destination coordinates (Los Angeles)
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    // Function to calculate distance and duration
    const calculateDistanceAndDuration = () => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const result = response.rows[0].elements[0];
            setDistance(result.distance.text);
            setDuration(result.duration.text);
          } else {
            setDistance(null);
            setDuration(null);
          }
        }
      );
    };

    calculateDistanceAndDuration();
  }, [origin, destination]);

  // Function to handle map click and update destination
  const handleMapClick = (event) => {
    const { latLng } = event;
    setDestination({ lat: latLng.lat(), lng: latLng.lng() });
  };

  // Function to handle directions response
  const onDirectionsResponse = (result) => {
    if (result.status === 'OK') {
      setDirections(result);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '500px' }}
        center={origin}
        zoom={8}
        onClick={handleMapClick}
      >
        <Marker position={origin} label="Origin" />
        <Marker position={destination} label="Destination" />

        {destination && (
          <DirectionsService
            options={{
              destination,
              origin,
              travelMode: 'DRIVING',
            }}
            callback={onDirectionsResponse}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}

        {distance && <div>Distance: {distance}</div>}
        {duration && <div>Duration: {duration}</div>}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
