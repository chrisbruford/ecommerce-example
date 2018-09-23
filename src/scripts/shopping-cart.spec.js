import { ShoppingCart } from './shopping-cart';

describe('shopping cart',()=>{

    let cart;
    
    beforeEach(()=>{
        cart = new ShoppingCart();
    });

    it('should track and return total number of items in the cart', () => {
        for (let i = 1; i <= 5; i++) {
            cart.add({id: i});
        }
        cart.remove(1);
        expect(cart.count).toBe(4);
    });

    it('should return all items in the cart', () => {
        let addedItems = [];
        for (let i = 1; i <= 5; i++) {
            let item = {id: i};
            cart.add(item);
            addedItems.push(item);
        }

        expect(cart.items).toEqual(jasmine.arrayContaining(addedItems));
    });
});