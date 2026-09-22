//modulo de hash
import crypto from 'node:crypto';

//cria objeto com os papeis e congela
export const ProfileType = Object.freeze({
    SUPERADMIN: 'SUPERADMIN',
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
})

export class User {
    constructor (id = null, name, email, profile = ProfileType.CLIENT, password) {
        this._id = id;
        this._name = name;
        this._email = email;
        this.profile = profile;
        this._password = this._generateHash(password);
    }

    //criptografia com hash
    _generateHash(plainPassword) {
        if (!plainPassword) return null;
        if (plainPassword.includes(':')) return plainPassword;
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.scryptSync(plainPassword, salt, 64).toString('hex');
        //une o salt com hash
        return `${salt}:${hash}`;
    }

    verifyPassword(plainPassword) {
        if (!this._password) return false;
        //separa o salt do hash
        const [salt, origHash] = this._password.split(':');
        const hashTest = crypto.scryptSync(plainPassword, salt, 64).toString('hex');
        //compara os dois hashes
        return crypto.timingSafeEqual(Buffer.from(origHash), Buffer.from(hashTest));
    }

    //getters
    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get email(){
        return this._email;
    }

    get profile() {
        return this._profile;
    }

    get password() {
        return this._password;
    }

    //setters
    set name(value) {
        this._name = value;
    }

    set email(value) {
        this._email = value;
    }

    //setter com validacao de profile
    set profile(value) {
        const validProfiles = Object.values(ProfileType);
        if (!validProfiles.includes(value)) {
            throw new Error(`Perfil invalido: "{$value}". Perfis aceitos: ${validProfiles.join(', ')}`);      
        }
        this._profile = value;
    }

    //setter da senha com hash
    set password(newPass) {
        this._password = this._generateHash(newPass);
    }
}