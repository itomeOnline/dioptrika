function mapWidget () {
    if (document.querySelector('#modalMap')) {
        ymaps.ready(function () {
            var myMap = new ymaps.Map('modalMap', {
                    center: [55.755864, 37.617698],
                    zoom: 10,
                    controls: ['zoomControl']
                }),
        
                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    // hintContent: 'Собственный значок метки',
                    // balloonContent: 'Это красивая метка'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: '/assets/img/map_marker.svg',
                    // Размеры метки.
                    iconImageSize: [42, 53],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-15, -58]
                });
        
            myMap.geoObjects
                .add(myPlacemark)
        });
    }
}

export default mapWidget;