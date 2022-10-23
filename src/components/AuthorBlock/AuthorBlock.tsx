import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { IAuthor } from '../../types/types';
import { AUTHORS_ROUTE } from '../../utils/consts';
import { deleteAuthor, updateAuthor, fetchOneAuthor } from '../../http/authorAPI';
import { fetchCountries } from '../../http/countryAPI';
import {Context} from '../../index';

import './authorBlock.sass';


const AuthorBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [author, setAuthor] = useState<IAuthor>({});    
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCountries().then(data => library.setCountries(data));
        fetchOneAuthor(id)
            .then(data => setAuthor(data))
            .finally(() => setLoading(false));
    }, []);

    const countryAuthor = library.countries.filter(country => country.id === author.countryId);

    const removeAuthor = () => {
        if (window.confirm('Вы действительно хотите удалить автора? Все книги, связанные с ним, будут удалены.')) {
            deleteAuthor(author.id);
            navigate(AUTHORS_ROUTE);
        }        
    };

    const editAuthor = () => {
        // const formData = new FormData();
        // formData.append('name', author.name);
        // formData.append('description', author.description);

        // updateAuthor(id, formData).then(data => {
        //     navigate(MAIN_ROUTE);
        // });
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <div className='author'>
            <div className="author__wrapper">
                <img src={process.env.REACT_APP_API_URL + author.photo} className='author__wrapper__photo' />
                <div className="author__wrapper__text">
                    <div className="author__name">{author.name}</div>
                    <div className="author__country">{countryAuthor[0].name}</div>
                    <div className="author__description">{author.description}</div>
                </div>                
            </div>            
            <button className='author__button' onClick={editAuthor}>Редактировать</button>
            <button className='author__button' onClick={removeAuthor}>Удалить</button>
        </div>
    );
};

export default AuthorBlock;