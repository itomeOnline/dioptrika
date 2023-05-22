// import { quizObj } from './quizObj';

const quizObj = {
	"test": [
	    {
            question: "lorem ipsum lorem ipsum lorem ipsum?",
            answers: ['da', 'net', 'idi naxuy'],
        },
        {
            question: "lorem ipsum lorem ipsum lorem ipsum?",
            answers: ['da', 'net', 'idi naxuy'],
        },
        {
            question: "lorem ipsum lorem ipsum lorem ipsum?",
            answers: ['da', 'net', 'idi naxuy'],
        },
    ],
	"test2": [
	    {
            question: "lorem ipsum lorem ipsum lorem ipsum?",
            answers: ['da', 'net', 'idi naxuy'],
        },
        {
            question: "lorem ipsum lorem ipsum lorem ipsum?",
            answers: ['da', 'net', 'idi naxuy'],
        },
        {
            question: "lorem ipsum lorem ipsum lorem ipsum?",
            answers: ['da', 'net', 'idi naxuy'],
        },
    ]
}


export default class Quiz {
	constructor({ref, key}) {
		this.ref = ref,
		this.quizObj = quizObj,
		this.key = key,
		this.quizArr = this.quizObj[this.key];

		this.ref.insertAdjacentHTML('beforeend', this.render);
		this.ref.innerHTML = this.render();
	}

	// render() {

	// 	return `
	// 			${this.renderQuestion()}
	// 			${this.renderAnswers()}
	// 		`
	// }

	render() {

		return `
				${this.renderAnswers()}
			`
	}
	
	// renderQuestion(quizArr = this.quizArr) {
	// 	return quizArr.reduce((html, arr) => {
	// 		return html += `<button type="button">${arr.question}</button>`
	// 		}, '')
	// }

	renderAnswers(quizArr = this.quizArr) {
		console.log(quizArr)
		
        return quizArr.reduce((html, arr) => {
				let answers = arr.answers;
				return html += `<button type="button">${answers}</button>`
				}, '')
    }

};


