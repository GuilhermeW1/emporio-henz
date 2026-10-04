export class Product {
    constructor(id = null, categoryId, viewCount = 0, description, price, images = []) {
        this._id = id;
        this.categoryId = categoryId;
        this.description = description;
        this.price = price;
        this._viewCount = viewCount;
        this._images = images;
    }

    //getters
    get id(){
        return this._id;
    }

    get categoryId(){
        return this._categoryId;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    get viewCount(){
        return this._viewCount;
    }

    get images(){
        return this
    }

    //setters com validacao
    set id(value) {
        this._id = value;
    }

    set categoryId(value) {
        if (!value || typeof value !== "number") {
            throw new Error("O ID da categoria é obrigatorio e deve ser um numero");
        }
        this._categoryId = value;
    }

    set description(value) {
        if (!value || typeof value !== "string" || value.trim().length === 0) {
            throw new Error("A descricao do produto é obrigatoria");
        }
        this._description = value;
    }

    set price(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("O preço do produto deve ser um valor maior que 0");
        }
        this._price = value;
    }

    incrementViewCount(){
        this._viewCount += 1;
    }

    addImage(image) {
        this._images.push(image);
    }
}