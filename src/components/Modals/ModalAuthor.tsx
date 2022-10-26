import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateAuthor } from '../../http/authorAPI';
import CUAuthor from '../CUAuthor';

interface ModalAuthorProps {
    show: boolean;
    onHide: () => void;
    idInit: number;
    nameInit: string;
    descriptionInit: string;
    photoInit: string;
    countryInit: string;
};


const ModalAuthor: React.FC<ModalAuthorProps> = ({show, onHide, idInit, nameInit, descriptionInit, photoInit, countryInit}) => {
    const [name, setName] = useState<string>(nameInit);
    const [description, setDescription] = useState<string>(descriptionInit);
    const [file, setFile] = useState<string | Blob>(photoInit);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body>
                <CUAuthor 
                    id={idInit}
                    name={name}
                    description={description}
                    file={file}
                    setName={setName}
                    setDescription={setDescription}
                    setFile={setFile}
                    handler={updateAuthor}
                    title='Обновить автора'
                    btnName='Обновить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAuthor;