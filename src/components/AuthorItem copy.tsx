import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { IAuthor } from '../types/types';
// import {Context} from '../index';
// import { fetchCountry } from '../http/bookAPI';

interface AuthorItemProps {
    author: IAuthor;
    onClick: (author: IAuthor) => void;
};


const AuthorItem: React.FC<AuthorItemProps> = observer(({author, onClick}) => {
    // const {book} = useContext(Context);

    // useEffect(() => {
    //     fetchCountry().then(data => book.setCountries(data));
    // }, []);

    // const countryAuthor = book.countries.filter(country => country.id === author.countryId);  
    
    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
            onClick={() => onClick(author)}
        >
            {author.name}  -  добавлен пользователем {author.userId}
        </Card>
    );
});

export default AuthorItem;
//{countryAuthor[0].name} 