import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';

import List from '../components/List';
import AuthorItem from '../components/AuthorItem';
import { IAuthor } from '../types/types';
import { fetchAuthor } from '../http/bookAPI';


const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    
    const removeAuthor = (author: IAuthor) => {};

    useEffect(() => {
        getAuthors();
    }, []);
  
    async function getAuthors() {
        fetchAuthor()
            .then(data => setAuthors(data.rows))
            .catch(err => alert(err.message));
    }


    return (
        <Container style={{width: '75%'}}>
            <h1>AuthorsPage</h1>
            <List 
                items={authors} 
                renderItem={(author: IAuthor) => 
                    <AuthorItem 
                        onClick={(author) => removeAuthor(author)} 
                        author={author} 
                        key={author.id} 
                    />
                } 
            />
        </Container>
    );
};

export default AuthorsPage;