class MarkerElement {

    constructor(markerData, map) {
        this.map = map;
        this.markerData = markerData;
        this.marker = null;
        
        this.render();
        this.bindEventListeners();
    }

    bindEventListeners() {
        let map = this.map;
        let markerData = this.markerData;
        let marker = this.marker;


        this.marker.addEventListener('click', () =>  {

            let listEl = document.querySelector(`[data-list-id="${markerData.properties.id}"]`);
            let listElems = document.querySelectorAll(`[data-list-id]`);
            let activeListEl = [].find.call(listElems, el => el.classList.contains('is-active'));

            if (activeListEl) {
                activeListEl.classList.remove('is-active');
            }

            listEl.classList.add('is-active');

            listEl.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            

            map.easeTo({
                center: markerData.geometry.coordinates,
                bearing: 180,
                pitch: 70,
                zoom: 12,
                duration: 1500
            })

        })
    }
    
    render() {
        this.marker = document.createElement('button');
        this.marker.classList.add('marker');
        this.marker.setAttribute('data-map-link', `${this.markerData.properties.id}`);
        this.marker.innerHTML = `<div data-map-tooltip="">${this.markerData.properties.text}</div>`
        this.marker.style.backgroundImage = 'url("/assets/img/marker.svg")';
    }

}

export { MarkerElement };