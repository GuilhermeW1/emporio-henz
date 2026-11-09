export class ProductImage {
    constructor(id, productId, url, color) {
        this._id = id;
        this._productId = productId;
        this._url = url;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get productId() {
        return this._productId;
    }

    get url(){
        return this._url;
    }

    get color(){
        return this._color;
    }

    set id(value) {
        this._id = value;
    }

    set productId(value) {
        this._productId = value;
    }

    set url(value) {
        this._url = value;
    }

    set color(value) {
        this._color = value;
    }
}