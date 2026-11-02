export class Product {
    constructor(id = null, name, categoryIds = [], viewCount = 0, description, price, images = []) {
        this._id = id;
        this.name = name;
        this.categoryIds = categoryIds;
        this.description = description;
        this.price = price;
        this._viewCount = viewCount;
        this._images = images;
    }

    //getters
    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get categoryIds(){
        return this._categoryIds;
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

    set name(value) {
        if (!value || typeof value !== "string" || value.trim().length < 2) {
            throw new Error("O nome do produto é obrigatório e deve ter no minimo 2 caracteres.");
        }
        this._name = value.trim();
    }

    set categoryIds(value) {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error("O produto deve ser associado a pelo menos uma categoria");
        }
        const hasInvalidId = value.some((id) => typeof id !== "number" || id <= 0);
        if (hasInvalidId) {
            throw new Error("Os Ids das categorias devem ser numeros validos");
        }
        this._categoryIds = value;
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