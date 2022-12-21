import React from 'react';

import BookBlock from '../components/BookBlock/BookBlock';
import QuotesList from '../components/QuotesList/QuotesList';


const BookPage: React.FC = () => {
    return (
        <div>
            <BookBlock />
            <QuotesList />
        </div>
    );
};

export default BookPage;