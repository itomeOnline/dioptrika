export default class InputHidden {
    constructor(placeholder) {
        this.placeholder = placeholder,
        this.inputHidden = document.createElement('input');
        this.render();
    }

    render() {

        this.inputHidden.setAttribute('data-dropdown-value', '');
        this.inputHidden.setAttribute('type', 'hidden');
        this.inputHidden.setAttribute('name', `${this.placeholder}`);
        
    }
    
}

export { InputHidden };