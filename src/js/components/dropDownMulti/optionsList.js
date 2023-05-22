import { Option } from './option';

export default class OptionList {
    constructor(optionsList, dataOption, ref) {
        this.optionsList = optionsList,
        this.dataOption = dataOption,
        this.option = null,
        this.ref = ref,
        this.render()
    }

    render() {
        this.optionsList.setAttribute('data-dropdown-list', '');
        this.option = new Option(this.dataOption, this.ref).option;
        this.optionsList.appendChild(this.option);
    }
}

export { OptionList };