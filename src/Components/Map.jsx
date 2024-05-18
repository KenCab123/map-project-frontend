import React, { useEffect, useRef } from "react";
import L from 'leaflet';
import geoJSONData from "../../assets/geoJSON/boroughs.json";
import { changeColor } from "../helpers/mapFunctions";
import "../Styles/Map.css"

const App = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Create the map
      const map = L.map('map', {
        zoomControl: false, // Disable zoom control
        doubleClickZoom: false, // Disable zoom on double-click
        scrollWheelZoom: false, // Disable zoom with scroll wheel
        touchZoom: false, // Disable touch zoom
        dragging: false // Disable dragging
      }).setView([40.7128, -74.0060], 10);

      // Add GeoJSON layer for the boroughs with custom styling
      const geojson = L.geoJSON(geoJSONData, {
        style:style,
        onEachFeature: onEachFeature
      }).addTo(map);

    function style(feature,percentage = 30) {
        return {
            fillColor: changeColor(percentage),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
      const layer = e.target;
  
      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });
  
      layer.bringToFront();
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }
      // Store the map instance in the ref
      mapRef.current = map;
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

export default App;
