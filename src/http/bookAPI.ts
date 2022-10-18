import { $authHost } from "./index";
import { IAuthor, IBook, ICountry } from "../types/types";

export const createAuthor = async (author: IAuthor) => {
    const {data} = await $authHost.post('api/author', author);    
    return data;
};

export const fetchAuthor = async () => {
    const {data} = await $authHost.get('api/author');
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


export const createCountry = async (country: ICountry) => {
    const {data} = await $authHost.post('api/country', country);    
    return data;
};

export const fetchCountry = async () => {
    const {data} = await $authHost.get('api/country');
    return data;
};

export const deleteCountry = async (id: number) => {
    const {data} = await $authHost.delete('api/country/' + id);
    return data;
};