import "@babel/polyfill";
import ApiService from './apiService';
import card from '../templates/card.hbs';
import { error } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const galleryEl = document.querySelector('.gallery');
export default galleryEl;
const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('[name=query]');
const btnEl = document.querySelector('.button');
 
const app = new ApiService;

btnEl.addEventListener('click', onButton);
formEl.addEventListener('submit', onInput);

let y = 0;

function onInput(e) {
    e.preventDefault();
    if (inputEl.value === '') {
        error({
            title: 'Пустая строка!',
            delay: 2000,
        });
        return;
    }
    galleryEl.innerHTML = '';
    app.resPage();
    app.keywords = (inputEl.value)
    btnEl.disabled = false;
    fetchMarkup();
    y = 0;
    }

function onButton() {
    fetchMarkup();
}

async function fetchMarkup() {
    try {
        const hits = await app.searchImages();
        if (hits.length === 0) {
            error({
            title: 'Ничего не найдено, измени запрос',
            delay: 2000,
            });
            return
        }
        createMarkup(hits);
        const element = document.getElementById(hits[0].id);
        element.scrollIntoView(
            {
            behavior: 'smooth',
            block: 'end',
            }
        );
        observer.observe(document.getElementById(hits[11].id));
    }
    catch(err) {
        console.warn(err);
    }
}

function createMarkup(data) {
    const cards = card(data);
    galleryEl.insertAdjacentHTML('beforeend', cards);
}

//-------------------observer----------------
let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}
let callback = function (entries,observer) {
    if (y === 0) {
        y = 1;
        return
    }
    if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        fetchMarkup();
    }
}
let observer = new IntersectionObserver(callback, options)
// ------------------------------------------------------------------------------
