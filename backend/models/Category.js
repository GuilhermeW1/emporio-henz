export class Category {
    constructor(id = null, name) {
        this._id = id;
        this._name = name;
    }

    //getters
    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    //setters
    set id(value){
        this._id = value;
    }

    set name(value){
        if (!value || typeof value !== "string" || value.trim().length < 2) {
            throw new error("O nome da categoria deve ser um texto com no minimo 2 caracteres");
        }
        this._name = value.trim();
    }
}