import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown, Col, Row} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { createAuthor, fetchAuthor, deleteAuthor, updateAuthor } from '../http/bookAPI';
import { AUTHOR_ROUTE, AUTHORS_ROUTE } from '../utils/consts';
import { IAuthor } from '../types/types';


const AddAuthorPage: React.FC = observer(() => {
    const {book} = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<string | Blob>(null);
    const [selectedCountry, setselectedCountry] = useState<number>(2);
    const [id, setId] = useState<number>(0);
    const userId: number = 1;

    // useEffect(() => {
    //     fetchCountries().then(data => book.setCountries(data));
    // }, []);

    // let auth: IAuthor;
    // auth.

    const selectFile = (e) => { 
        setFile(e.target.files[0]);
    };
    //: React.ChangeEvent<HTMLInputElement>

    const addAuthor = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', file);
        // formData.append('countryId', `${selectedCountry}`);
        // formData.append('userId', `${userId}`);

        createAuthor(formData).then(data => {
            navigate(AUTHORS_ROUTE);
            // navigate(AUTHOR_ROUTE + `/${id}`);
        });
    };

    /*
    const removeAuthor = () => {
        deleteAuthor(id).then(data => {
            navigate(MAIN_ROUTE);
        });
    };

    const editAuthor = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', `${description}`);

        updateAuthor(id, formData).then(data => {
            navigate(MAIN_ROUTE);
        });
    };
    */


    return (
        <Container className="d-flex justify-content-center" style={{width: '75%'}}>
            <div style={{width: '50%'}}>
                <h1>Добавить автора</h1>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите автора"
                    />
                    <Form.Control as="textarea"
                        className="mt-3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Введите описание"
                    />              
                    <label htmlFor="file" className="mt-3">Загрузите фото автора</label>       
                    <Form.Control                        
                        type="file"
                        onChange={selectFile}
                    />                    
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle>Выберите страну</Dropdown.Toggle>
                        {/* <Dropdown.Toggle>{book.selectedCountry.name || 'Выберите страну'}</Dropdown.Toggle> */}
                        <Dropdown.Menu>
                            <Dropdown.Item>Россия</Dropdown.Item>                            
                            {/* {book.countries.map(country => 
                                <Dropdown.Item 
                                    onClick={() => book.setSelectedCountry(country)} 
                                    key={country.id} >
                                        {country.name}
                                </Dropdown.Item>
                            )} */}
                            <Dropdown.Item>Добавить страну</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </Form>

                <Button variant={"primary"} onClick={addAuthor} className="mt-3">Добавить</Button>           
                {/* <Button variant={"outline-danger"} onClick={editAuthor}>Обновить</Button>     
                <Button variant={"outline-danger"} onClick={removeAuthor}>Удалить</Button> */}
            </div>   
        </Container>
    );
});

export default AddAuthorPage;