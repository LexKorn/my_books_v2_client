import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { createBook } from '../http/bookAPI';
import CUBook from '../components/CUBook';


const AddBookPage: React.FC = observer(() => {
    const [name, setName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [file, setFile] = useState<string | Blob>(null);

    return (
        <>
            <CUBook 
                id={0}
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
                handler={createBook}
                title='Добавить книгу'
                btnName='Добавить'
            />
        </>
    );
});

export default AddBookPage;