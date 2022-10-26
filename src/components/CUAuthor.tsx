import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { fetchCountries } from '../http/countryAPI';
import { AUTHORS_ROUTE, AUTHOR_ROUTE } from '../utils/consts';
import ModalCountry from './Modals/ModalCountry';
import { IAuthor } from '../types/types';

interface CUAuthorProps {
    name: string;
    description: string;
    file: string | Blob;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setFile: (file: string) => void;
    handler: (author: IAuthor) => Promise<any>;
    title: string;
    btnName: string;
};


const CUAuthor: React.FC<CUAuthorProps> = observer(({id, name, description, file, setName, setDescription, setFile, handler, title, btnName}) => {
    const {library} = useContext(Context);
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchCountries().then(data => library.setCountries(data));
    }, [visible]);

    const selectFile = e => { 
        setFile(e.target.files[0]);
    };

    const onClick = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', file);
        formData.append('countryId', `${library.selectedCountry.id}`);

        if (btnName === 'Добавить') {
            handler(formData).then(data => {
                library.setSelectedCountry({});
                navigate(AUTHORS_ROUTE);
            });
        } else {
            handler(id, formData).then(data => {
                library.setSelectedCountry({});
                navigate(AUTHORS_ROUTE);
                // navigate(AUTHOR_ROUTE + `/${id}`);
            });
        }
    };


    return (
        <Container className="d-flex justify-content-center">
            <div style={{width: '50%'}}>
                <h1>{title}</h1>
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
                        <Dropdown.Toggle variant={"outline-dark"}>{library.selectedCountry.name || 'Выберите страну'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {library.countries.map(country => 
                                <Dropdown.Item 
                                    onClick={() => library.setSelectedCountry(country)} 
                                    key={country.id} >
                                        {country.name}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={() => setVisible(true)} >Добавить / удалить страну</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </Form>
                <Button variant={"outline-dark"} onClick={onClick} className="mt-3">{btnName}</Button>           
            </div>   
            <ModalCountry show={visible} onHide={() => setVisible(false)} />
        </Container>
    );
});

export default CUAuthor;