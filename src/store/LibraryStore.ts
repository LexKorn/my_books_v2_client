import {makeAutoObservable} from 'mobx';

import { IBook, IAuthor, ICountry } from '../types/types';

export default class LibraryStore {
    _countries: ICountry[];
    _authors: IAuthor[];
    _books: IBook[];
    _selectedCountry: ICountry;
    _selectedAuthor: IAuthor;

    constructor() {
       this._countries = [];
       this._authors = [];
       this._books = [];
       this._selectedCountry = {};
       this._selectedAuthor = {};

       makeAutoObservable(this); 
    };

    setCountries(countries: ICountry[]) {
        this._countries = countries;
    };
    setAuthors(authors: IAuthor[]) {
        this._authors = authors;
    };
    setBooks(books: IBook[]) {
        this._books = books;
    };
    setSelectedCountry(country: ICountry) {
        this._selectedCountry = country;
    };
    setSelectedAuthor(author: IAuthor) {
        this._selectedAuthor = author;
    };


    get countries() {
        return this._countries;
    };
    get authors() {
        return this._authors;
    };
    get books() {
        return this._books;
    };
    get selectedCountry() {
        return this._selectedCountry;
    }
    get selectedAuthor() {
        return this._selectedAuthor;
    }
};