import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { IAuthor, IBook, ICountry } from '../../types/types';
import { MAIN_ROUTE } from '../../utils/consts';
import { deleteBook, updateBook, fetchOneBook } from '../../http/bookAPI';
import { fetchAuthors } from '../../http/authorAPI';
import { fetchCountries } from '../../http/countryAPI';
import {Context} from '../../index';

import './bookBlock.sass';


const BookBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [book, setBook] = useState<IBook>({});    
    const [loading, setLoading] = useState<boolean>(true);
    const [authorBook, setAuthorBook] = useState<IAuthor[]>([]);
    const [countryAuthor, setCountryAuthor] = useState<ICountry[]>([]);
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchAuthors()
            .then(data => library.setAuthors(data.rows))
            .then(() => setAuthorBook(library.authors.filter(author => author.id === book.authorId)));
        fetchCountries()
            .then(data => library.setCountries(data))
            .then(() => setCountryAuthor(library.countries.filter(country => country.id === authorBook[0].countryId)));
        fetchOneBook(id)
            .then(data => setBook(data))
            .finally(() => setLoading(false));
    }, []);

    // const authorBook = library.authors.filter(author => author.id === book.authorId);
    // const countryAuthor = library.countries.filter(country => country.id === authorBook[0].countryId);

    const removeBook = () => {
        if (window.confirm('Ты действительно хочешь удалить книгу?')) {
            deleteBook(book.id);
            navigate(MAIN_ROUTE);
        }        
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }    


    return (
        <div className='book'>
            <div className="book__wrapper">
                <img src={process.env.REACT_APP_API_URL + book.cover} className='book__wrapper__cover' />
                <div className="book__wrapper__text">                    
                    <div className="book__author">{authorBook[0].name}</div>
                    <div className="book__name">{book.name}</div>
                    <div className="book__country">{countryAuthor[0].name}</div>
                    <div className="book__rating">Рейтинг: {book.rating}</div>
                    <a className="book__link" href={book.link} target="_blank">ссылка</a>
                    <div className="book__comment">{book.comment}</div>
                </div>                
            </div>            
            <button className='book__button'>Редактировать</button>
            <button className='book__button'  onClick={removeBook}>Удалить</button>
        </div>
    );
};

export default BookBlock;