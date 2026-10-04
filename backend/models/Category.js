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
        this._name = value;
    }
}