import { MarkerElement } from './markerElement';
import { MapList } from './mapList';

export default class Map {
    constructor({container, markers, token, style, zoom, mapCenter}) {
        this.container = container;
        this.markers = markers;
        this.map = null;
        this.token = token;
        this.style = style;
        this.mapCenter = mapCenter;
        this.zoom = zoom;
        this.markerList = {};

        this.createMap();
        this.bindEventListeners();
        this.createList();
    }

    bindEventListeners() {
       

        let {markers, map} = this;
        
        this.map.on('load', () => {
            
            markers.features.forEach(markerData => {
                new mapboxgl.Marker(new MarkerElement(markerData, map).marker, {offset: [0, -46]})
                .setLngLat(markerData.geometry.coordinates)
                .addTo(map);
            });

            map.addSource('markers', {
                type: 'geojson',
                data: markers,
            });

            map.getSource('markers').setData(markers);
        })
    }

    createMap() {
        mapboxgl.accessToken = this.token;
        this.map = new mapboxgl.Map({
            container: this.container,
            style: this.style,
            center: this.mapCenter,
            zoom: this.zoom,
        });
        
        this.map.scrollZoom.disable();
        this.map.addControl(new mapboxgl.NavigationControl());
    }

    createList() {
        this.markers.features.forEach(markerData => {
            new MapList(markerData, this.map);
        });
    }
    
}