import React from 'react'
import {useState} from "react";

//"use client";

import {
    APIProvider,
    Map,
    AdvanceMarker,
    Pin,
    InfoWindow,
}   from "@vis.gl/react-google-maps";

export default function GoogleMaps() {
  const position = { lat: 53.54, lng: 10};

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div style={{height: "100vh"}}>
            <Map zoom={9} center={position}></Map>
        </div>
    </APIProvider>
  );
    
}
