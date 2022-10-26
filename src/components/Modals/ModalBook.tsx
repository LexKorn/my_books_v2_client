import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateBook } from '../../http/bookAPI';
import CUBook from '../CUBook';

interface ModalBookProps {
    show: boolean;
    onHide: () => void;
    idInit: number;
    nameInit: string;
    linkInit: string;
    ratingInit: string;
    commentInit: string;
    coverInit: string;
};


const ModalBook: React.FC<ModalBookProps> = ({show, onHide, idInit, nameInit, linkInit, ratingInit, commentInit, coverInit}) => {
    const [name, setName] = useState<string>(nameInit);
    const [link, setLink] = useState<string>(linkInit);
    const [rating, setRating] = useState<string>(ratingInit);
    const [comment, setComment] = useState<string>(commentInit);
    const [file, setFile] = useState<string | Blob>(coverInit);
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body>
                <CUBook 
                    id={idInit}
                    name={name}
                    link={link}
                    rating={rating}
                    comment={comment}
                    file={file}
                    setName={setName}
                    setLink={setLink}
                    setRating={setRating}
                    setComment={setComment}
                    setFile={setFile}
                    handler={updateBook}
                    title='Обновить книгу'
                    btnName='Обновить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBook;