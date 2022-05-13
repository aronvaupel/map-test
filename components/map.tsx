import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { stores } from "../assets/data";
import buildLocationList from "../utils/storeListing";

stores.features.forEach(function (store, i) {
  // @ts-ignore
  store.properties.id = i;
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (map.current) return;
    //@ts-ignore
    map.current = new mapboxgl.Map({
      //@ts-ignore
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    // @ts-ignore
    map.current.on("load", () => {
      /* Add the data to your map as a layer */
      // @ts-ignore
      map.current.addLayer({
        id: "locations",
        type: "circle",
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
          type: "geojson",
          data: stores,
        },
      });
    });
    buildLocationList(stores);
    //@ts-ignore
    map.current.on("move", () => {
      //@ts-ignore

      setLng(map.current.getCenter().lng.toFixed(4));
      //@ts-ignore

      setLat(map.current.getCenter().lat.toFixed(4));
      //@ts-ignore

      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" className="listings"></div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
