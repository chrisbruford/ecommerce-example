export class ShoppingCart {
    constructor() {
        this._items = new Map();
    }

    get count() {
        return this._items.size;
    }

    get items() {
        return Array.from(this._items.values());
    }

    add(item) {
        this._items.set(item.id, item);
    }

    remove(id) {
        this._items.delete(id);
    }
}