import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
// import {observer} from 'mobx-react-lite';

import { IAuthor, IBook, ICountry } from '../../types/types';
import { MAIN_ROUTE, AUTHOR_ROUTE } from '../../utils/consts';
import { deleteBook, updateBook, fetchOneBook } from '../../http/bookAPI';
import { fetchAuthors } from '../../http/authorAPI';
import { fetchCountries } from '../../http/countryAPI';
import {Context} from '../../index';
import ModalBook from '../Modals/ModalBook';

import './bookBlock.sass';


const BookBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [book, setBook] = useState<IBook>({});    
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    // const [authorBook, setAuthorBook] = useState<IAuthor[]>([]);
    // const [countryAuthor, setCountryAuthor] = useState<ICountry[]>([]);
    
    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data.rows));
        fetchCountries().then(data => library.setCountries(data));
        fetchOneBook(id)
            .then(data => setBook(data))
            .finally(() => setLoading(false));
    }, [id]);

    // useEffect(() => {
    //     fetchAuthors()
    //         .then(data => library.setAuthors(data.rows))
    //         .then(() => setAuthorBook(library.authors.filter(author => author.id === book.authorId)))
    //         .then(() => fetchCountries().then(data => library.setCountries(data)))
    //         .then(() => setCountryAuthor(library.countries.filter(country => country.id === authorBook[0].countryId)))
    //         .then(() => fetchOneBook(id).then(data => setBook(data)))
    //         .finally(() => setLoading(false))        
    // }, [id]);

    // useEffect(() => {
    //     fetchAuthors()
    //         .then(data => {
    //             library.setAuthors(data.rows);
    //             setAuthorBook(library.authors.filter(author => author.id === book.authorId));
    //         })
    //         .then(() => fetchCountries().then(data => {
    //             library.setCountries(data);
    //             setCountryAuthor(library.countries.filter(country => country.id === authorBook[0].countryId));
    //         }))
    //         .then(() => fetchOneBook(id).then(data => setBook(data)))
    //         .finally(() => setLoading(false))        
    // }, [id]);

    const authorBook = library.authors.filter(author => author.id === book.authorId);
    // const countryAuthor = library.countries.filter(country => country.id === authorBook[0].countryId);  
    // console.log(authorBook);
    

    const removeBook = () => {
        if (window.confirm('Вы действительно хотите удалить книгу?')) {
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
                    <div 
                        className="book__author"
                        style={{cursor: 'pointer'}}
                        onClick={() => {navigate(AUTHOR_ROUTE + `/${authorBook[0].id}`)}}
                        >{authorBook[0].name}
                    </div>
                    <div className="book__name">{book.name}</div>
                    {/* <div className="book__country">{countryAuthor[0].name}</div> */}
                    <div className="book__rating">{book.rating}</div>
                    <a className="book__link" href={book.link} target="_blank">Прочитать можно здесь</a>
                    <div className="book__comment">{book.comment}</div>
                </div>                
            </div>            
            <button className='book__button' onClick={() => setVisible(true)}>Редактировать</button>
            <button className='book__button'  onClick={removeBook}>Удалить</button>
            <ModalBook 
                show={visible} 
                onHide={() => setVisible(false)} 
                idInit={id} 
                nameInit={book.name}
                linkInit={book.link}
                ratingInit={book.rating}
                commentInit={book.comment}
                coverInit={book.cover}
            />
        </div>
    );
};

export default BookBlock;