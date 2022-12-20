import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

import { updateNote } from '../../http/noteAPI';
import {INote} from '../../types/types';

interface ModalNoteProps {
    show: boolean;
    onHide: () => void;
    noteInit: INote;
    // idNote: number;
    // nameNote: string;
};


const ModalNote: React.FC<ModalNoteProps> = ({show, onHide, noteInit}) => {
    const [newName, setNewName] = useState<string>(noteInit.name);

    const editNote = () => {
        if (!newName.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        updateNote(noteInit.id, newName)
            .then(() => {
                setNewName('');
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
            // @ts-ignore
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
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        // @ts-ignore
                        onKeyPress={e => keyPress(e)}
                        // placeholder={"Введите название книги"}
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