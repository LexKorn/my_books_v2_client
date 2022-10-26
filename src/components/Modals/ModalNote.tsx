import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

import { updateNote } from '../../http/noteAPI';

interface ModalNoteProps {
    show: boolean;
    onHide: () => void;
    idNote: number;
};


const ModalNote: React.FC<ModalNoteProps> = ({show, onHide, idNote}) => {
    const [value, setValue] = useState<string>('');

    const editNote = () => {
        if (!value.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        updateNote(idNote, value)
            .then(() => {
                setValue('');
                onHide();
            })
            .catch(err => alert(err.response.data.message)); 
    };

    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
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
                    Обновите заметку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyPress={e => keyPress(e)}
                        placeholder={"Введите название книги"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-danger"} onClick={editNote}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNote;