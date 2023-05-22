export default function formSubmit() {
    
    window.dataLayer = window.dataLayer || [];

    function appendFormData(form, data) {
        if (form.dataset.appendForm) {
            const appendForm = document.querySelector(`#${form.dataset.appendForm}`);
            
            const appendData = new FormData(appendForm);

            console.log([...appendData.entries()]);

            [...appendData.entries()].forEach(item => {
                data.append(item[0], item[1])
            })

            console.log(data);

            return data;
        }
        
        return data;
    }


    document.addEventListener('submit', function(event) {
        
        if (event.target.closest('[data-mailer]')) {
            event.preventDefault();
            event.stopPropagation();
            let form = event.target.closest('form');
            let data = new FormData(form);
            const utm = sessionStorage.utm ? JSON.parse(sessionStorage.utm) : {};
    		Object.keys(utm).forEach(key => {
    			data.append(`utm_${key}`, utm[key]);
    		})
    		
    		if (data.get('phone') && data.get('phone') === '+7 (___) ___-__-__') {
                return;
            }
            
    		
    		data.append(`page_href`, window.location.href);
    		data.append('referrer', document.referrer);
            data.append('date', new Date().toLocaleString());
            
            // data = appendFormData(form, data);
            form.classList.add("on-request");
            
            fetch("/mailer.php", {
                method: 'POST',
                body: data
            }).then(function(r) {

                return r.text();

            }).then(function () {
                window.dataLayer.push({
                    event: 'formSubmission',
                    data: {
	                    formId: form.dataset.formId,
	                }
                })
                window.dataLayer.push({
                        formId: form.dataset.formId,
                })
                
                if (event.target.closest('[data-presentation]')) {
                    const presentationData = JSON.parse(event.target.closest('[data-presentation]').dataset.presentation);

                    var link = document.createElement('a');
                    link.setAttribute('href', presentationData.href);
                    //link.setAttribute('target', '_blank');
                    link.download = presentationData.name;
                    link.click();
                    // document.dispatchEvent(new CustomEvent('needModal', {detail: 'presentation_success'}));
                } else {
                    if (!(form.dataset.feedbackOff && form.dataset.feedbackOff === "true")) {
                        document.dispatchEvent(new CustomEvent('needModal', {detail: 'modal_success'}));                        
                    }
                }
                
                form.classList.remove("on-request");
            });
        }
    })
}