import { $authHost } from "./index";

export const createNote = async (name: string) => {
    const {data} = await $authHost.post('api/note', {name});    //   (`api/note?name=${name}`)
    return data;
};

export const deleteNote = async (id: number) => {
    const {data} = await $authHost.delete('api/note/' + id);
    return data;
};

export const fetchNotes = async () => {
    const {data} = await $authHost.get('api/note');
    return data;
};