import { $authHost } from "./index";

export const createQuote = async (quote: FormData) => {
    const {data} = await $authHost.post('api/quote', quote);    
    return data;
};

export const fetchQuotes = async () => {
    const {data} = await $authHost.get('api/quote');
    return data;
};

export const fetchOneQuote = async (id: number) => {
    const {data} = await $authHost.get('api/quote/' + id);
    return data;
};

export const deleteQuote = async (id: number) => {
    const {data} = await $authHost.delete('api/quote/' + id);
    return data;
};

export const updateQuote = async (id: number, quote: FormData) => {
    const {data} = await $authHost.put('api/quote/' + id, quote);
    return data;
};