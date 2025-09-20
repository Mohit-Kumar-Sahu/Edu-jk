"use client";

import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Navigation } from 'lucide-react';

interface College {
  id: string;
  'College Name': string;
  District: string;
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  colleges: College[];
  userLocation: { latitude: number; longitude: number } | null;
}

const containerStyle = {
  width: '100%',
  height: '600px', // You can adjust the height
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: 33.7782, // A central point in J&K
  lng: 75.3412,
};

export function MapView({ colleges, userLocation }: MapViewProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

  const handleMarkerClick = (college: College) => {
    setSelectedCollege(college);
    setDirectionsResponse(null); // Clear previous directions
  };

  const handleGetDirections = () => {
    if (!userLocation || !selectedCollege || !selectedCollege.latitude || !selectedCollege.longitude) {
      alert("Could not get directions. User location or college location is missing.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new google.maps.LatLng(userLocation.latitude, userLocation.longitude),
        destination: new google.maps.LatLng(selectedCollege.latitude, selectedCollege.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`error fetching directions ${result}`);
          alert("Error fetching directions.");
        }
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <Card>
      <CardContent className="p-2">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : defaultCenter}
          zoom={userLocation ? 10 : 7}
        >
          {/* User's Location Marker */}
          {userLocation && (
            <Marker
              position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
              title="Your Location"
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
              }}
            />
          )}

          {/* College Markers */}
          {colleges.map((college) => (
            college.latitude && college.longitude && (
              <Marker
                key={college.id}
                position={{ lat: college.latitude, lng: college.longitude }}
                onClick={() => handleMarkerClick(college)}
              />
            )
          ))}

          {/* InfoWindow for Selected College */}
          {selectedCollege && selectedCollege.latitude && selectedCollege.longitude && (
            <InfoWindow
              position={{ lat: selectedCollege.latitude, lng: selectedCollege.longitude }}
              onCloseClick={() => setSelectedCollege(null)}
            >
              <div className="p-2 space-y-2">
                <h4 className="font-bold">{selectedCollege['College Name']}</h4>
                <p className="text-sm">{selectedCollege.District}</p>
                <Button onClick={handleGetDirections} size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </InfoWindow>
          )}

          {/* Directions Renderer */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </CardContent>
    </Card>
  );
}