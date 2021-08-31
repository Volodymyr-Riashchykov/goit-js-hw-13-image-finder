
import galleryEl from './searchImages'
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');

let currentImg = '';

galleryEl.addEventListener('click', onCard);
lightboxEl.addEventListener('click', onModalClose);

function onCard(e) {
    e.preventDefault();
    let current = 0;
    switch (e.target.classList.value) {
        case 'stats':
            current = e.target.previousElementSibling;
            break;
        case 'stats-item':
            current = e.target.parentNode.previousElementSibling;
            break;
        case 'material-icons':
            current = e.target.parentNode.parentNode.previousElementSibling;
            break;
        case 'image':
            current = e.target;
            break;
        case 'photo-card':
            current = e.target.firstElementChild;
            break;
        default:
            return;
    }
    openModal(current)
}
 
function openModal(current) {
    window.addEventListener('keydown', onKeyPress)
    lightboxEl.classList.add('is-open')
    valueModal(current);
}

function onModalClose(e) {
    if (e.target.dataset.action !== ('close-lightbox')
        && !e.target.classList.contains('lightbox__overlay')) { return }
    closeModal();
}

function closeModal() {
    window.removeEventListener('keydown', onKeyPress)
    lightboxImageEl.attributes['src'].value = '';
    lightboxImageEl.attributes['alt'].value = '';
    lightboxEl.classList.remove('is-open')
 }

function onKeyPress(e) {
    let neighborEl;
    switch (e.keyCode) {
        case 27:
            closeModal()
            break;
        
        case 39:
            neighborEl = currentImg.parentNode.parentNode.nextElementSibling;
            if(neighborEl === null){neighborEl = galleryEl.firstElementChild;}
            neighborEl = neighborEl.firstElementChild.firstElementChild;
            valueModal(neighborEl);
            break;
        
        case 37:
            neighborEl = currentImg.parentNode.parentNode.previousElementSibling;
            if(neighborEl === null){neighborEl = galleryEl.lastElementChild;}
            neighborEl = neighborEl.firstElementChild.firstElementChild;
            valueModal(neighborEl);
            break;
        
        default:
            break;
    }
    
}

function valueModal(current) {
    currentImg = current;
    lightboxImageEl.attributes['src'].value = current.dataset.source;
    lightboxImageEl.attributes['alt'].value = current.attributes['alt'].value;
}