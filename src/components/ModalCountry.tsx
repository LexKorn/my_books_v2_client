import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, Button, Form} from 'react-bootstrap';

import {createCountry, deleteCountry} from '../http/bookAPI';
import { ADD_AUTHOR_ROUTE } from '../utils/consts';

interface ModalCountryProps {
    show: boolean;
    onHide: () => void;
};


const ModalCountry: React.FC<ModalCountryProps> = ({show, onHide}) => {
    const [value, setValue] = useState<string>('');
    const navigate = useNavigate();

    const addCountry = () => {
        createCountry({name: value})
            .then(data => {
                setValue('');
                onHide();
                navigate(ADD_AUTHOR_ROUTE);
            })
            .catch(err => alert(err.response.data.message));       
    };

    const removeCountry = () => {
        deleteCountry(value).then(data => {
            setValue('');
            onHide();
            navigate(ADD_AUTHOR_ROUTE);
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Выберите действие со страной
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название страны"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCountry}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={removeCountry}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCountry;