import React from 'react';

import { IBook } from '../../types/types';

import './bookBlock.sass';

const BookBlock: React.FunctionComponent = () => {
    const book: IBook = {
        id: 1,
        name: "Приключения майора Звягина",
        link: "https://www.litmir.me/br/?b=29250&p=1",
        rating: 5,
        comment: "Впервые выпущен в 1991 году издательством «Периодика» тиражом 100 000 экземпляров. Совокупный тираж составляет около одного миллиона экземпляров. В книге описываются эпизоды из жизни моралиста, циника, гуманиста и идеального героя «по Веллеру» — майора Звягина.",
        cover: "https://static.daru-dar.org/s600/02/03/f6/6f/f66f338174864c1e0420ef05b92e3b004e985b92.jpg",
        countryId: 1,
        authorId: 1,
        userId: 1
    };

    return (
        <div className='book'>
            <div className="book__wrapper">
                <img src={book.cover} className='book__wrapper__cover' />
                <div className="book__wrapper__text">                    
                    <div className="book__author">{book.authorId}. Михаил Веллер</div>
                    <div className="book__name">{book.name}</div>
                    <div className="book__country">{book.countryId}. Россия</div>
                    <div className="book__rating">Рейтинг: {book.rating}</div>
                    <a className="book__link" href={book.link} target="_blank">ссылка</a>
                    <div className="book__comment">{book.comment}</div>
                </div>                
            </div>            
            <button className='book__button'>Редактировать</button>
            <button className='book__button'>Удалить</button>
        </div>
    );
};

export default BookBlock;