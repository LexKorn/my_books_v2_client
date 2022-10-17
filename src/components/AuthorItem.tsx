import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { IAuthor } from '../types/types';

interface AuthorItemProps {
    author: IAuthor;
    onClick: (author: IAuthor) => void;
};


const AuthorItem: React.FC<AuthorItemProps> = ({author, onClick}) => {
    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row'}}
        >
            <div style={{fontSize: 18, lineHeight: '35px'}}>{author.id}. {author.name} создана пользователем {author.userId}</div>
            <div>
                <Button 
                    variant={"outline-secondary"}
                    style={{marginRight: 10}}
                    onClick={() => onClick(author)}
                    >Редактировать
                </Button>
                <Button 
                    variant={"outline-danger"}
                    onClick={() => onClick(author)}
                    >Удалить
                </Button>
            </div>
        </Card>
    );
};

export default AuthorItem;