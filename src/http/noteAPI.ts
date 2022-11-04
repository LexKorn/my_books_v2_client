import { $authHost } from "./index";
import {INote} from '../types/types';

const _transformNote = (note: INote) => {
    return {
        id: note.id,
        name: note.name,
        userId: note.userId
    }
};

export const createNote = async (name: string) => {
    const {data} = await $authHost.post('api/note', {name});    //   (`api/note?name=${name}`)
    return data;
};

export const deleteNote = async (id: number) => {
    const {data} = await $authHost.delete('api/note/' + id);
    return data;
};

export const updateNote = async (id: number, name: string) => {
    const {data} = await $authHost.put('api/note/' + id, {name});
    return data;
};

export const fetchNotes = async () => {
    const {data} = await $authHost.get('api/note');
    // return data.rows.map(_transformNote);
    // return _transformNote(data.rows[0]);
    // return data.rows;
    return data;
};

/*
const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
}

const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
}

const _transformCharacter = (char) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description ? `${char.description.slice(0, 140)}...` : 'There is no description for this character.',
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
}
*/