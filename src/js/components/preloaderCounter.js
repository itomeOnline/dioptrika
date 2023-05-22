function preloaderCounter () {

    function animate(obj, initVal, lastVal, duration, addText) {

        let startTime = null;

        //get the current timestamp and assign it to the currentTime variable
        let currentTime = Date.now();

        //pass the current timestamp to the step function
        const step = (currentTime ) => {

            //if the start time is null, assign the current time to startTime
            if (!startTime) {
                startTime = currentTime ;
            }

            //calculate the value to be used in calculating the number to be displayed
            const progress = Math.min((currentTime  - startTime) / duration, 1);

            //calculate what to be displayed using the value gotten above
            obj.innerHTML = `${Math.floor(progress * (lastVal - initVal) + initVal)}${addText}`;

            //checking to make sure the counter does not exceed the last value (lastVal)
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
            else{
                window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        };

        //start animating
        window.requestAnimationFrame(step);
    }

    function initCounter() {
        const counters = document.querySelectorAll('[data-counter]');

        counters.forEach( el => {
            const start = +el.dataset.start; //number
            const end = +el.dataset.end;   //number
            const duration = +el.dataset.timeDelay; //ms
            const addText = el.dataset.addText ? el.dataset.addText : "";
        

            animate(el, start, end, duration, addText)
        })
    }

    initCounter()
}

export default preloaderCounter;