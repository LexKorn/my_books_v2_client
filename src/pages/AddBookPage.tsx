import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { createBook } from '../http/bookAPI';
import { fetchAuthors } from '../http/authorAPI';
import { ADD_AUTHOR_ROUTE, MAIN_ROUTE } from '../utils/consts';


const AddBookPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [file, setFile] = useState<string | Blob>(null);

    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data.rows));
    }, []);    

    const selectFile = e => { 
        setFile(e.target.files[0]);
    };

    const addBook = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('link', link);
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('cover', file);
        formData.append('authorId', `${library.selectedAuthor.id}`);

        createBook(formData).then(data => {
            library.setSelectedAuthor({});
            navigate(MAIN_ROUTE);
        });
    };


    return (
        <Container className="d-flex justify-content-center" style={{width: '75%'}}>
            <div style={{width: '50%'}}>
                <h1>Добавить книгу</h1>
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
                    <Form.Control
                        className="mt-3"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        placeholder="Поставьте оценку книги"
                    />
                    <Form.Control as="textarea"
                        className="mt-3"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Введите коментарий"
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
                <Button variant={"outline-dark"} onClick={addBook} className="mt-3">Добавить</Button>           
            </div>
        </Container>
    );
});

export default AddBookPage;