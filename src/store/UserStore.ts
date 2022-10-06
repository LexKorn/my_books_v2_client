import {makeAutoObservable} from 'mobx';

export default class UserStore {
    _isAuth: boolean;
    // _isUser: {};

    constructor() {
       this._isAuth = false;
    //    this._isUser = {};
       makeAutoObservable(this); 
    };

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    };

    // setIsUser(bool: {}) {
    //     this._isUser = bool;
    // };

    get isAuth() {
        return this._isAuth;
    };

    // get isUser() {
    //     return this._isUser;
    // };
};