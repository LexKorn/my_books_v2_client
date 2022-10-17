import React from 'react';

import { IAuthor } from '../../types/types';

import './authorBlock.sass';

const AuthorBlock: React.FunctionComponent = () => {
    const author: IAuthor = {
        id: 1,
        name: "Веллер Михаил",
        description: "Философские взгляды Михаила Веллера излагались им в разных произведениях, начиная с 1988 года, пока не были обобщены автором в единую теорию, названную в итоге энергоэволюционизмом. Основы энергоэволюционизма заключаются в том, что существование Вселенной рассматривается как эволюция первичной энергии Большого Взрыва, и эта энергия связывается в материальные структуры, все более сложные, которые, в свою очередь, распадаются с выделением энергии, и эти циклы идут с ускорением...",
        photo: "https://sun9-29.userapi.com/impf/5xziTl1-XqJx-KjNZca3hjH6izuKYd2Q_OD0cQ/3VzQ06sT03c.jpg?size=697x1080&quality=96&sign=4589f204099433e2bb2c6102199c03b2&type=album",
        countryId: 1,
        userId: 1
    };

    return (
        <div className='author'>
            <div className="author__wrapper">
                <img src={author.photo} className='author__wrapper__photo' />
                <div className="author__wrapper__text">
                    <div className="author__name">{author.name}</div>
                    <div className="author__country">{author.countryId}. Россия</div>
                    <div className="author__description">{author.description}</div>
                </div>                
            </div>            
            <button className='author__button'>Редактировать</button>
            <button className='author__button'>Удалить</button>
        </div>
    );
};

export default AuthorBlock;