import React, { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import geoJSONData from "../../assets/geoJSON/boroughs.json";
import { changeColor } from "../helpers/mapFunctions";
import { findMostCommonBoro, findMostCommonLocation, findMostCommonTime } from "../helpers/genData";
import "../Styles/Map.css"
import { getShootings } from "../helpers/fetch";


const App = () => {
    const [allShootings, setAllShootings] = useState([])
    const [toggleModal, setToggleModal] = useState(false)
    const [boro, setBoro] = useState('')
    const prevBoroRef = useRef(null);
    const mapRef = useRef(null);

    const closeModal = () => {
        setToggleModal(false)
    }

    const grabBoroData = (boro) => {
        const boroShootingsArr = allShootings.filter(s => s.boro === boro)
        // console.log(boroShootings)
        return {
            boroName: boro,
            boroShootings: boroShootingsArr.length,
            fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
            commonLocation: findMostCommonLocation(boroShootingsArr),
            commonTime: findMostCommonTime(boroShootingsArr)
        }
    }

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


            const { BoroName } = feature.properties;
            const formattedClassName = BoroName.split(' ').join('-')
            // Insert a new icon for each 'feature' (borough). This will add an html div element containing the boroughs name
            const label = L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: `leaflet-label ${formattedClassName}`,
                    html: `<div>${BoroName}</div>`
                })
            }).addTo(map);
        

                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: () => {
                        const clickedBoro = feature.properties.BoroName.toUpperCase();
        
                        // If the clicked feature's boro is different from the previous boro, keep the modal open
                        if (clickedBoro !== prevBoroRef.current) {
                            setToggleModal(true); // Keep the modal open
                            setBoro(clickedBoro); // Update the boro state
                            grabBoroData(clickedBoro); // Update data for the clicked boro
                        } else {
                            // If the clicked feature's boro is the same as the previous boro, toggle the modal
                            setToggleModal(prevToggleModal => !prevToggleModal);
                        }
                    }
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
    }, [allShootings, toggleModal]); // Empty dependency array ensures this runs only once
    
    useEffect(() => {
        if (boro !== null) {
            // Update the previous boro ref when boro changes
            prevBoroRef.current = boro;
        }
    }, [boro]);

    useEffect(() => {
        getShootings().then((data) => setAllShootings(data));
    }, []);
    
    return (
        <>
        <div className="map-container">
            <div id="map">
            </div>
        </div>
        {toggleModal && (
            <div className="modal" onClick={() => setToggleModal(false)}>
                    <div className="modal-content" >
                        <p>{boro.includes(' ') ? boro.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ') : boro[0] + boro.slice(1).toLowerCase()}</p>
                        <p>Total Shootings: {grabBoroData(boro).boroShootings}</p>
                        <p>Fatal Deaths: {grabBoroData(boro).fatalDeaths}</p>
                        <p>Most Common Location: {grabBoroData(boro).commonLocation[0] + grabBoroData(boro).commonLocation.slice(1).toLowerCase()}</p>
                        <p>Most Common Time: {grabBoroData(boro).commonTime}</p>
                    </div>
                </div>
            )}
        <div className="gen-data">
        <h1>General Data</h1>
        {allShootings.length > 0 &&
        <ul>
          <li># of shootings resulting in fatal deaths: {allShootings.filter(s => s.statistical_murder_flag === "Y").length}</li>
          <li>Total # of shootings: {allShootings.length}</li>
          <li>Most shootings are {findMostCommonLocation(allShootings).toLowerCase()}</li>
          <li>Most shootings happen in the {findMostCommonBoro(allShootings)[0] + findMostCommonBoro(allShootings).slice(1).toLowerCase()}</li>
          <li>Most shootings occur {findMostCommonTime(allShootings)}</li>
        </ul>
        }
      </div>
        </>
    );
};

export default App;
