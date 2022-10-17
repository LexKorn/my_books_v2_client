import {makeAutoObservable} from 'mobx';

import { INote } from '../types/types';

export default class NoteStore {
    _notes: INote[];

    constructor() {
       this._notes = [];
       makeAutoObservable(this); 
    };

    setTypes(notes: INote[]) {
        this._notes = notes;
    };

    get notes() {
        return this._notes;
    };
};