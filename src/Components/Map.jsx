import React, { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import geoJSONData from "../../assets/geoJSON/boroughs.json";
import { changeColor } from "../helpers/mapFunctions";
import "../Styles/Map.css"
import { getShootings } from "../helpers/fetch";

const App = () => {
    const [allShootings, setAllShootings] = useState([])
    const mapRef = useRef(null);

    useEffect(() => {
        if(allShootings.length === 0) return;

        if (!mapRef.current) {
            // Create the map
            const map = L.map('map', {
                zoomControl: false,
                doubleClickZoom: false,
                scrollWheelZoom: false,
                touchZoom: false,
                dragging: false
            }).setView([40.7128, -74.0060], 10);

            async function addGeoJSONLayer() {
                // Modify geoJSON to include a new key called shootingsData for each borough(Feature)
                // This new key will contain the shooting data by borough to update choropleth map
                const geoJSONWithShootingsData = await Promise.all(geoJSONData.features.map(async (feature) => {
                    const shootingsByBorough = await getShootings(feature.properties.BoroName);
                    return {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            shootingsData: shootingsByBorough
                        }
                    };
                }));

                const geojson = L.geoJSON(geoJSONWithShootingsData, {
                    style: style,
                    onEachFeature: onEachFeature
                }).addTo(map);


            function highlightFeature(e) {
                const layer = e.target;

                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7,
                });

                layer.bringToFront();
            }

            function resetHighlight(e) {
                const layer = e.target;
                geojson.resetStyle(layer);
            }

            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                });
            }
            }

            function style(feature) {
                const { shootingsData } = feature.properties;
                const percentage = (shootingsData.length / allShootings.length) * 100;
                const color = changeColor(percentage);

                return {
                    fillColor: color,
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 2
                };
            }


            addGeoJSONLayer();

            // Store the map instance in the ref
            mapRef.current = map;
        }
    }, [allShootings]); // Empty dependency array ensures this runs only once

    useEffect(() => {
        getShootings().then((data) => setAllShootings(data));
    }, []);

    return (
        <div className="map-container">
            <div id="map"></div>
        </div>
    );
};

export default App;
