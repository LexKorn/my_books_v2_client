import React from 'react';

import AuthorBlock from '../components/AuthorBlock/AuthorBlock';
import BooksList from '../components/BooksList';

const AuthorPage: React.FC = () => {
    return (
        <div>
            <AuthorBlock />
            <BooksList />
        </div>
    );
};

export default AuthorPage;