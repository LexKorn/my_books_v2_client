import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { fetchAuthors } from '../http/authorAPI';
import { ADD_AUTHOR_ROUTE, MAIN_ROUTE } from '../utils/consts';
import {IBook} from '../types/types';
import {isValidUrl} from '../utils/validURL';
// import unknownAuthor from '../assets/unknown_author.jpg';

interface CUBookProps {
    id: number;
    name: string;
    link: string;
    rating: number;
    comment: string;
    file: string;
    setName: (name: string) => void;
    setLink: (link: string) => void;
    setRating: (rating: number) => void;
    setComment: (comment: string) => void;
    setFile: (file: File) => void;
    handler: (id: number, book: FormData) => Promise<any>;
    title: string;
    btnName: string;
};


const CUBook: React.FC<CUBookProps> = observer(({id, name, link, rating, comment, file, setName, setLink, setRating, setComment, setFile, handler, title, btnName}) => {
    const {library} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data));
    }, []);    

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const files: FileList | null = e.target.files;
        if (files) {
            setFile(files[0]);
        }                
    };

    const onClick = () => {
        if (!name.trim() || !comment.trim()) {
            return alert('Все поля обязательны для заполнения');
        } else if (!library.selectedAuthor.id) {
            return alert('Автора необходимо указать');
        } else if (!file) {
            return alert('Обложку необходимо загрузить');
        } else if (rating < 1 || rating > 10) {
            return alert ('Оценка книги должна быть от 1 до 10');
        } else if (!isValidUrl(link)) {
            return alert ('Неверный формат ссылки');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('link', link);
        formData.append('rating', `${rating}`);
        formData.append('comment', comment);
        formData.append('cover', file);
        formData.append('authorId', `${library.selectedAuthor.id}`);
        formData.append('countryId', `${library.selectedAuthor.countryId}`);

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(formData).then(() => {
                library.setSelectedAuthor({
                    id: 0,
                    name: '',
                    description: '',
                    photo: '',
                    userId: 0,
                    countryId: 0,        
                });
                navigate(MAIN_ROUTE);
            });
        } else {
            handler(id, formData).then(() => {
                library.setSelectedAuthor({
                    id: 0,
                    name: '',
                    description: '',
                    photo: '',
                    userId: 0,
                    countryId: 0,        
                });
                navigate(MAIN_ROUTE);
                // navigate(AUTHOR_ROUTE + `/${id}`);
        });
    }
    };


    return (
        <Container className="d-flex justify-content-center">
            <div>
                <h1>{title}</h1>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите название книги"
                    />
                    <Form.Control
                        className="mt-3"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder="Введите ссылку на книгу"
                    />
                    <label htmlFor="rating" className="mt-3">Поставьте оценку книги от 1 до 10</label> 
                    <Form.Control
                        value={rating}
                        type="number"
                        onChange={e => setRating(+e.target.value)}
                    />
                    <Form.Control as="textarea"
                        className="mt-3"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Введите коментарий"
                        maxLength={700}
                    />              
                    <label htmlFor="file" className="mt-3">Загрузите обложку книги</label>       
                    <Form.Control                        
                        type="file"
                        onChange={selectFile}
                    />                    
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle variant={"outline-dark"}>{library.selectedAuthor.name || 'Выберите автора'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {library.authors.map(author => 
                                <Dropdown.Item 
                                    onClick={() => library.setSelectedAuthor(author)} 
                                    key={author.id} >
                                        {author.name}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={() => navigate(ADD_AUTHOR_ROUTE)} >Добавить автора</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </Form>
                <Button variant={"outline-dark"} onClick={onClick} className="mt-3">{btnName}</Button>           
            </div>
        </Container>
    );
});

export default CUBook;