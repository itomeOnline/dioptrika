import { MapListElement } from './mapListElement';

class MapList {

    constructor(markerData, map) {
        this.markerData = markerData;
        this.map = map;
        this.button = null;
        this.mapList = document.querySelector('[data-map-list] .simplebar-content');

        this.createList();
    }

    createList() {
        this.button = new MapListElement(this.markerData, this.map).listEl;
        this.mapList.appendChild(this.button);
    }
}

export { MapList };