import React, { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import geoJSONData from "../../assets/geoJSON/boroughs.json";
import { changeColor } from "../helpers/mapFunctions";
import { findMostCommonBoro, findMostCommonLocation, findMostCommonTime } from "../helpers/genData";
import "../Styles/Map.css"
import { getShootings } from "../helpers/fetch";


const App = () => {
    const [allShootings, setAllShootings] = useState([])
    const [bronxModal, setBronxModal] = useState(false)
    const [manhattanModal, setManhattanModal] = useState(false)
    const [brooklynModal, setBrooklynModal] = useState(false)
    const [queensModal, setQueensModal] = useState(false)
    const [statenIslandModal, setStatenIslandModal] = useState(false)
    const mapRef = useRef(null);


    const grabBronxData = () => {
        const boroShootingsArr = allShootings.filter(s => s.boro === "BRONX")

        return {
            boroShootings: boroShootingsArr.length,
            fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
            commonLocation: findMostCommonLocation(boroShootingsArr),
            commonTime: findMostCommonTime(boroShootingsArr)
        }
    }
    const grabManhattanData = () => {
        const boroShootingsArr = allShootings.filter(s => s.boro === 'MANHATTAN')

        return {
            boroShootings: boroShootingsArr.length,
            fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
            commonLocation: findMostCommonLocation(boroShootingsArr),
            commonTime: findMostCommonTime(boroShootingsArr)
        }
    }
    const grabBrooklynData = () => {
        const boroShootingsArr = allShootings.filter(s => s.boro === "BROOKLYN")

        return {
            boroShootings: boroShootingsArr.length,
            fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
            commonLocation: findMostCommonLocation(boroShootingsArr),
            commonTime: findMostCommonTime(boroShootingsArr)
        }
    }
    const grabQueensData = () => {
        const boroShootingsArr = allShootings.filter(s => s.boro === "QUEENS")

        return {
            boroShootings: boroShootingsArr.length,
            fatalDeaths: boroShootingsArr.filter(s => s.statistical_murder_flag === 'Y').length,
            commonLocation: findMostCommonLocation(boroShootingsArr),
            commonTime: findMostCommonTime(boroShootingsArr)
        }
    }
    const grabStatenIslandData = () => {
        const boroShootingsArr = allShootings.filter(s => s.boro === "STATEN ISLAND")

        return {
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
        
                        switch(clickedBoro) {
                            case "BRONX":
                                setBronxModal(prevBronxModal => !prevBronxModal);
                                grabBronxData()
                                break;
                            case "MANHATTAN":
                                setManhattanModal(prevManhattanModal => !prevManhattanModal)
                                grabManhattanData()
                                break;
                            case "BROOKLYN":
                                setBrooklynModal(prevBrooklynModal => !prevBrooklynModal)
                                grabBrooklynData()
                                break;
                            case "QUEENS":
                                setQueensModal(prevQueensModal => !prevQueensModal)
                                grabQueensData()
                                break;
                            case "STATEN ISLAND":
                                setStatenIslandModal(prevStatenIslandModal => ! prevStatenIslandModal)
                                grabStatenIslandData()
                                break;
                            default:
                                break;
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
    }, [allShootings]); // Empty dependency array ensures this runs only once
    

    useEffect(() => {
        getShootings().then((data) => setAllShootings(data));
    }, []);
    
    return (
        <div className="map-page-wrap">
        <div className="map-container">
            <div id="map"></div>
        </div>
        {bronxModal && (
            <div className="Bronx-modal modal" onClick={() => setBronxModal(false)} >
                    <div className="modal-content" >
                        <h3>Bronx</h3>
                        <p>Total Shootings: {grabBronxData().boroShootings}</p>
                        <p>Fatal Deaths: {grabBronxData().fatalDeaths}</p>
                        <p>Most Common Location: {grabBronxData().commonLocation[0] + grabBronxData().commonLocation.slice(1).toLowerCase()}</p>
                        <p>Most Common Time: {grabBronxData().commonTime}</p>
                    </div>
                </div>
            )}
        {manhattanModal && (
            <div className="Manhattan-modal modal" onClick={() => setManhattanModal(false)} >
                    <div className="modal-content" >
                        <h3>Manhattan</h3>
                        <p>Total Shootings: {grabManhattanData().boroShootings}</p>
                        <p>Fatal Deaths: {grabManhattanData().fatalDeaths}</p>
                        <p>Most Common Location: {grabManhattanData().commonLocation[0] + grabManhattanData().commonLocation.slice(1).toLowerCase()}</p>
                        <p>Most Common Time: {grabManhattanData().commonTime}</p>
                    </div>
                </div>
            )}
        {brooklynModal && (
            <div className="Brooklyn-modal modal" onClick={() => setBrooklynModal(false)} >
                    <div className="modal-content" >
                        <h3>Brooklyn</h3>
                        <p>Total Shootings: {grabBrooklynData().boroShootings}</p>
                        <p>Fatal Deaths: {grabBrooklynData().fatalDeaths}</p>
                        <p>Most Common Location: {grabBrooklynData().commonLocation[0] + grabBrooklynData().commonLocation.slice(1).toLowerCase()}</p>
                        <p>Most Common Time: {grabBrooklynData().commonTime}</p>
                    </div>
                </div>
            )}
        {queensModal && (
            <div className="Queens-modal modal" onClick={() => setQueensModal(false)} >
                    <div className="modal-content" >
                        <h3>Queens</h3>
                        <p>Total Shootings: {grabQueensData().boroShootings}</p>
                        <p>Fatal Deaths: {grabQueensData().fatalDeaths}</p>
                        <p>Most Common Location: {grabQueensData().commonLocation[0] + grabQueensData().commonLocation.slice(1).toLowerCase()}</p>
                        <p>Most Common Time: {grabQueensData().commonTime}</p>
                    </div>
                </div>
            )}
        {statenIslandModal && (
            <div className="SI-modal modal" onClick={() => setBrooklynModal(false)} >
                    <div className="modal-content" >
                        <h3>Staten Island</h3>
                        <p>Total Shootings: {grabStatenIslandData().boroShootings}</p>
                        <p>Fatal Deaths: {grabStatenIslandData().fatalDeaths}</p>
                        <p>Most Common Location: {grabStatenIslandData().commonLocation[0] + grabStatenIslandData().commonLocation.slice(1).toLowerCase()}</p>
                        <p>Most Common Time: {grabStatenIslandData().commonTime}</p>
                    </div>
                </div>
            )}
        <div className="gen-data">
        <h1>General Data</h1>
        {allShootings.length > 0 &&
        
        <ul className="gen-data-info">
            <p className="summary-p">
                The City of Dreams, New York City is a hotspot for visitors from all across the world. 
                With many visitors unfamiliar to the culture and goings on, it's important
                for many to consider the safety of their destination, and a city with a population of 8 million
                is no exception to the concerns of human safety.
                <br></br> 
                <br></br>
                The goal of BulletProof NYC is to inform its users on the data concerning shooting incidents in the city,
                to contextualize this information so users can be aware of the varying statistics and safety
                of the city's 5 boroughs.
                </p>
          <li># of shootings resulting in fatal deaths: {allShootings.filter(s => s.statistical_murder_flag === "Y").length}</li>
          <li>Total # of shootings: {allShootings.length}</li>
          <li>Most shootings are {findMostCommonLocation(allShootings).toLowerCase()}</li>
          <li>Most shootings happen in the {findMostCommonBoro(allShootings)[0] + findMostCommonBoro(allShootings).slice(1).toLowerCase()}</li>
          <li>Most shootings occur {findMostCommonTime(allShootings)}</li>
        </ul>
        }
      </div>
    </div>
    );
};

export default App;