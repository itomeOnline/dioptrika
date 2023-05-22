import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

function rangeSliders () {
    const blocks = document.querySelectorAll('[data-range-block=""]');
    const rangeSliders = document.querySelectorAll('[data-range-slider=""]');
    const inputLeft = document.querySelector('[data-input-left=""]');
    const inputRight = document.querySelector('[data-input-right=""]');
    const inputs = [inputLeft, inputRight];

    rangeSliders.forEach(slider => {

        noUiSlider.create(slider, {
            start: [1, 3],
            connect: true,
            range: {
                'min': 1,
                'max': 3
            }
        });

        slider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = values[handle];
        });
    })

}

export default rangeSliders;