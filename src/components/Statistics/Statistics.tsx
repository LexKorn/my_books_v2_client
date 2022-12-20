import React, {useState, useEffect} from 'react';

import { fetchAuthors } from '../../http/authorAPI';
import { fetchBooks } from '../../http/bookAPI';

import './statistics.sass';

const Statistics: React.FC = () => {
    const [quantityAuthors, setQuantityAuthors] = useState<number>(0);
    const [quantityBooks, setQuantityBooks] = useState<number>(0);

    useEffect(() => {
        fetchAuthors().then(data => setQuantityAuthors(data.length));
        fetchBooks().then(data => setQuantityBooks(data.length));
    }, []);

    return (
        <>
            <div className='statistics'>У меня добавлено на портал: {quantityAuthors} авторов и {quantityBooks} книг</div>
        </>
    );
};

export default Statistics;