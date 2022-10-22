import { $authHost } from "./index";
import { ICountry } from "../types/types";

export const createCountry = async (country: ICountry) => {
    const {data} = await $authHost.post('api/country', country);    
    return data;
};

export const fetchCountries = async () => {
    const {data} = await $authHost.get('api/country');
    return data;
};

export const deleteCountry = async (id: string) => {
    const {data} = await $authHost.delete('api/country/' + id);
    return data;
};