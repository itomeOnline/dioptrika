import { MarkerElement } from './markerElement';

class MapListElement {

    constructor(markerData, map) {
        this.markerData = markerData;
        this.map = map;
        this.listEl = null;

        this.createListElement();
        this.bindEventListeners();
    }

    bindEventListeners() {
        let map = this.map;
        let markerData = this.markerData;

        this.listEl.addEventListener('click', () =>  {

            let listElems = document.querySelectorAll(`[data-list-id]`);
            let activeListEl = [].find.call(listElems, el => el.classList.contains('is-active'));

            if (activeListEl) {
                activeListEl.classList.remove('is-active');
            }
            
            this.listEl.classList.add('is-active');

            map.easeTo({
                center: markerData.geometry.coordinates,
                bearing: 180,
                pitch: 70,
                zoom: 12,
                duration: 1500
            })
        })
    }

    createListElement() {
        this.listEl = document.createElement('button');
        this.listEl.classList.add('map_list_element');
        this.listEl.setAttribute('data-list-id', `${this.markerData.properties.id}`);
        this.listEl.innerHTML = `${this.markerData.properties.text}`
    }

}

export { MapListElement };