export interface IAddress {
    street: string;
    city: string;
    zipcode: string;
};

export interface IUser {
    id: number;
    name: string;
    email: string;
    address: IAddress;
};

export interface ITodo {
    id: number;
    title: string;
    completed: boolean;
};


export interface INote {
    id: number;
    name: string;
    userId: number;
};

export interface IAuthor {
    id: number;
    name: string;
    description: string;
    photo: string;
    userId: number;
    countryId: number;
};

export interface IBook {
    id: number;
    name: string;
    link: string;
    rating: number;
    comment: string;
    cover: string;
    userId: number;
    countryId: number;
    authorId: number;
};

export interface ICountry {
    id: number;
    name: string;
    userId: number;
};