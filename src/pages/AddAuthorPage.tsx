import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { createAuthor, fetchCountry } from '../http/bookAPI';
import { AUTHOR_ROUTE, AUTHORS_ROUTE } from '../utils/consts';
import ModalCountry from '../components/ModalCountry';


const AddAuthorPage: React.FC = observer(() => {
    const {book} = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<string | Blob>(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchCountry().then(data => book.setCountries(data));
    }, []);

    const selectFile = e => { 
        setFile(e.target.files[0]);
    };
    //: React.ChangeEvent<HTMLInputElement>

    const addAuthor = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', file);
        formData.append('countryId', book.selectedCountry.id);

        createAuthor(formData).then(data => {
            navigate(AUTHORS_ROUTE);
            // navigate(AUTHOR_ROUTE + `/${id}`);
        });
    };


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
                        maxLength={1000}
                    />              
                    <label htmlFor="file" className="mt-3">Загрузите фото автора</label>       
                    <Form.Control                        
                        type="file"
                        onChange={selectFile}
                    />                    
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle>Выберите страну</Dropdown.Toggle>
                        <Dropdown.Toggle>{book.selectedCountry.name || 'Выберите страну'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.countries.map(country => 
                                <Dropdown.Item 
                                    onClick={() => book.setSelectedCountry(country)} 
                                    key={country.id} >
                                        {country.name}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={() => setVisible(true)} >Добавить / удалить страну</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </Form>
                <Button variant={"primary"} onClick={addAuthor} className="mt-3">Добавить</Button>           
            </div>   
            <ModalCountry show={visible} onHide={() => setVisible(false)} />
        </Container>
    );
});

export default AddAuthorPage;