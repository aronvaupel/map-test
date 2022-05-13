import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { stores } from "../assets/data";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

type Feature = {
  type: string;
  geometry: Geometry;
  properties: Properties;
};

type Geometry = {
  type: string;
  coordinates: LngLatLike;
};

type Properties = {
  title: string;
  address: string;
  city: string;
  country: string;
  crossStreet: string;
  postalCode: string;
  state: string;
};

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);
  const [zoom, setZoom] = useState(14);

  //Load Map
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
  //Load layer with external data & list data for sidebar
  useEffect(() => {
    if (!map.current) return;
    // @ts-ignore
    map.current.on("load", () => {
      // @ts-ignore
      map.current.addLayer({
        id: "locations",
        type: "circle",
        source: {
          type: "geojson",
          data: stores,
        },
      });
    });

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

  function createPopUp(currentFeature: Feature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.title}</h3><h4>${currentFeature.properties.address}</h4>`
      )
      //@ts-ignore
      .addTo(map);
  }

  return (
    <div>
      <div className="sidebar">
        <div className="heading">
          <h1>Our locations</h1>
        </div>
        <div id="listings" className="listings">
          {stores.features.length &&
            stores.features.map((feature, i) => (
              <div
                key={i}
                id={`listing-${i}`}
                className="item"
                onClick={() => {
                  //@ts-ignore
                  map.current.flyTo({
                    center: feature.geometry.coordinates,
                    zoom: 15,
                  });
                }}
              >
                <a href="#" className="title" id={`link-${i}`}>
                  <div>{feature.properties.title}</div>
                </a>
              </div>
            ))}
        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
