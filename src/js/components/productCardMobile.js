function productCardMobile () {
    const cardLink = document.querySelectorAll('.hits_slide');

    if (window.matchMedia("(max-width:750px)").matches) {
        
        cardLink.forEach(link => {
            link.dataset.linkedModal = "";
            link.href = "/product_page";
        })
    } 
}

export default productCardMobile;