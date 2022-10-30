import { $authHost } from "./index";
import { IAuthor } from "../types/types";

export const createAuthor = async (author: IAuthor) => {
    const {data} = await $authHost.post('api/author', author);    
    return data;
};

export const fetchAuthors = async () => {
    const {data} = await $authHost.get('api/author');
    return data;
};

export const fetchOneAuthor = async (id: number) => {
    const {data} = await $authHost.get('api/author/' + id);
    return data;
};

export const deleteAuthor = async (id: number) => {
    const {data} = await $authHost.delete('api/author/' + id);
    return data;
};

export const updateAuthor = async (id: number, author: IAuthor) => {
    const {data} = await $authHost.put('api/author/' + id, author);
    return data;
};