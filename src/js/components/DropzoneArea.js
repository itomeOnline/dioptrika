import Dropzone from "dropzone";

class DropzoneArea {
    constructor (el) {
        this.el = el;
        // this.dropzoneTitle = this.el.querySelector('[data-dropzone-title]');
        // this.fileNameEl = this.el.querySelector('[data-file-name]');
        // this.dropzoneIcon = this.el.querySelector('[data-icon]');
        this.btn = this.el.querySelector('[data-btn]')
        // this.btnText = this.el.querySelector('[data-btn-text]');
        this.input = this.el.querySelector('input[name="file"]');
    }

    addedFile(file) {
        // this.title = this.dropzoneTitle.dataset.text;
        // this.dropzoneTitle.dataset.text = this.dropzoneTitle.innerHTML;
        // this.dropzoneTitle.innerHTML = "Загрузка файла...";

        // this.dropzoneIcon.innerHTML = loadingIcon;

        this.changeViewEl(false)
        

        this.el.classList.add('is-loading');
    }

    success(file) {
        this.el.classList.remove('is-loading')
        this.el.classList.add('is-loaded');

        this.dropzoneTitle.innerHTML = this.title ? this.title : "Файл загружен";
        // this.fileNameEl.textContent = file.name;
        // this.dropzoneIcon.innerHTML = successIcon;

        this.changeViewEl(true);
        
        this.btn.textContent = "Загрузить другой файл";

        this.input.value = JSON.parse(file.xhr.response).path;
    }

    changeViewEl(viewState) {
        this.btn.style.display = viewState ? "" : "none";
        // this.fileNameEl.style.display = viewState ? "" : "none";
    }

    bindEvents() {
        this.dropzone.on("addedfile", file => {
            this.addedFile(file)
        });

        this.dropzone.on("success", file => {
            this.success(file);
        });

    }

    init() {
        this.dropzone = new Dropzone(this.el, {
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 2, // MB
            uploadMultiple: false,
            url: "/api/upload",
            //previewTemplate: document.querySelector('.dropzone').innerHTML,
        });
        this.el.dropzone = this.dropzone;

        this.bindEvents();
    }
}

export default DropzoneArea;