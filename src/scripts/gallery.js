import { Http } from './http';
import { ShoppingCart } from './shopping-cart';

const cart = new ShoppingCart();

export class Gallery {
    constructor(galleryTarget, cartTarget, cartStatus, taxRate) {
        this.taxRate = taxRate;
        this.cartStatus = cartStatus;
        this.cartTarget = cartTarget;
        this.galleryTarget = galleryTarget;
        this.products = new Map();

        Http.get('https://j-parre.myshopify.com/products.json')
            .then(res => {
                this.populateGallery(this.sortProducts(res.products));
            }).catch(err => {
                console.error(err);
            });
    }

    populateGallery(items) {
        this.galleryTarget.innerHTML = '';
        for (let product of items) {
            this.products.set(product.id, product);

            let article = document.createElement('article');
            article.className = 'product'
            article.innerHTML = `
            <div class="product-outter">
                <div class="product-inner">
                    <figure>
                        <div class="product-img-wrapper">
                            <img src="${product.images[0].src}" alt="">
                        </div>
                        <figcaption>
                            <p class="title">${product.title}</p>
                            <p class="price">£${product.variants[0].price}</p>
                        </figcaption>
                    </figure>

                    <div class="button-group">
                        
                    </div>
                </div>
            </div>
        `;

            let addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart';
            addToCartBtn.textContent = 'add to cart'
            addToCartBtn.addEventListener('click', () => { this.addToCart(product.id) });

            let quickViewBtn = document.createElement('button');
            quickViewBtn.className = 'quick-view';
            quickViewBtn.textContent = 'Quick View';

            article.querySelector('.button-group').appendChild(addToCartBtn);
            article.querySelector('.button-group').appendChild(quickViewBtn);

            this.galleryTarget.appendChild(article);
        }

    }


    sortProducts(items, by = 'title', ascending = true) {
        if (by !== 'price' && by !== 'title') {
            throw new Error('Items must be sorted by "price" or "title"');
        }

        let result;
        let sorted = items.sort((a, b) => {
            if (by == 'price') {
                a = parseFloat(a.variants[0].price);
                b = parseFloat(b.variants[0].price);

                if (a === b) {
                    result = 0;
                }

                if (a < b) {
                    result = ascending ? -1 : 1;
                }

                if (a > b) {
                    result = ascending ? 1 : -1;
                }
            }
            else {
                a = a.title;
                b = b.title
                if (a === b) {
                    result = 0;
                }

                if (a < b) {
                    result = ascending ? -1 : 1;
                }

                if (a > b) {
                    result = ascending ? 1 : -1;
                }
            }
            
            return result;
        });

        return sorted;
    }

    addToCart(id) {
        cart.add(this.products.get(id));
        this.populateCartTarget(this.cartTarget, cart.items);
        this.populateCartStatus(this.cartStatus, cart.items);
    }

    removeFromCart(id) {
        cart.remove(id);
        this.populateCartTarget(this.cartTarget, cart.items);
        this.populateCartStatus(this.cartStatus, cart.items);
    }

    populateCartTarget(target, cartItems) {
        const totalAmount = target.querySelector('.amount');
        const totalTaxes = target.querySelector('.taxes');
        let runningTotal = 0;
        let runninTotalTaxes = 0;
        const itemsList = target.querySelector('#items');

        itemsList.innerHTML = '';

        for (let item of this.sortProducts(cartItems, 'title')) {
            let el = document.createElement('div');
            el.className = "item";
            el.innerHTML = `
            <p>${item.title} <span class="remove">&#128473;</span></p>
            <p>${item.variants[0].price}</p>
            <hr>
        `
            el.querySelector('.remove').addEventListener('click', () => {
                this.removeFromCart(item.id);
            });
            itemsList.appendChild(el);
            runningTotal += parseFloat(item.variants[0].price);
            runninTotalTaxes = parseFloat(runningTotal - (runningTotal / (1 + this.taxRate)));
        }

        totalAmount.textContent = runningTotal.toFixed(2);
        totalTaxes.textContent = runninTotalTaxes.toFixed(2);
    }

    populateCartStatus(cartSummary, items) {
        let runningTotal = 0;
        let runningCount = 0;

        let cartValueTarget = cartSummary.querySelector('#cart-value');
        let cartCountTargets = document.querySelectorAll('.cart-count');


        for (let item of items) {
            runningTotal += parseFloat(item.variants[0].price);
            runningCount++;
        }

        for (let cartCountTarget of cartCountTargets) {
            cartCountTarget.textContent = runningCount;
        }
        cartValueTarget.textContent = runningTotal.toFixed(2);
    }

}