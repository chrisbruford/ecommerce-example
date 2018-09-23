import './main.scss';
import { Gallery } from './scripts/gallery';
import { TAX_RATE } from './scripts/globals'


const cartTarget = document.querySelector('#cart-preview');
const cartStatus = document.querySelector('#cart-status')
const sortBy = document.querySelector('#sortBy');
const ascending = document.querySelector('#ascending');
const galleryTarget = document.querySelector('#gallery-inner');

const gallery = new Gallery(galleryTarget, cartTarget, cartStatus, TAX_RATE);

sortBy.addEventListener('change',evt=>{
    let sortBy = evt.target.value;
    let isAscending = ascending.value === 'true';
    gallery.populateGallery(gallery.sortProducts(Array.from(gallery.products.values()), sortBy, isAscending));
});

ascending.addEventListener('change',evt=>{
    let isAscending = evt.target.value === 'true';
    let sorted = gallery.sortProducts(Array.from(gallery.products.values()), sortBy.value, isAscending);
    gallery.populateGallery(sorted, sortBy.value, isAscending);
})