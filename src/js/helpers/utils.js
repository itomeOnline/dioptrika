let Utils = {
	map:  (x, in_min, in_max, out_min, out_max) => ((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min),
	throttle: (fn, interval) => {
		let lastTime;
		return function throttled() {
			let timeSinceLastExecution = Date.now() - lastTime;
			if (!lastTime || (timeSinceLastExecution >= interval)) {
				fn.apply(this, arguments);
				lastTime = Date.now();
			}
		}
	},
	debounce: (func, wait, immediate) => {
		let timeout;
		return function() {
			let context = this, args = arguments;
			const later = () => {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},
	declOfNum: (number, titles) => {  
		const cases = [2, 0, 1, 1, 1, 2];  
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
	}
}


export default Utils;