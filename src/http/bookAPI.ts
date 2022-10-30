import { $authHost } from "./index";
import { IBook } from "../types/types";

export const createBook = async (book: IBook) => {
    const {data} = await $authHost.post('api/book', book);    
    return data;
};

export const fetchBooks = async () => {
    const {data} = await $authHost.get('api/book');
    return data;
};

export const fetchOneBook = async (id: number) => {
    const {data} = await $authHost.get('api/book/' + id);
    return data;
};

export const deleteBook = async (id: number) => {
    const {data} = await $authHost.delete('api/book/' + id);
    return data;
};

export const updateBook = async (id: number, book: IBook) => {
    const {data} = await $authHost.put('api/book/' + id, book);
    return data;
};