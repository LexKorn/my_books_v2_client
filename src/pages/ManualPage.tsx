import React from 'react';
import { Container } from 'react-bootstrap';
import {Helmet} from "react-helmet";


const ManualPage: React.FC = () => {
    return (
        <Container style={{width: '70%'}} className="manual">
            <Helmet>
                <title>Инструкция</title>
                <meta name="description" content="Рекомендации" />
            </Helmet>
            <h1 className="manual__title">Рекомендации</h1>
            <ol className="manual__list">
                <li>Для рейтинга книг используется 10-бальная шкала. Каждый может сам придумать как ранжировать книги.<br/>
                    Мой вариант рейтинга книг:
                    <ul>
                        <li>10 - читал более 2 раз</li>
                        <li>9 - читал 2 раза</li>
                        <li>8 - читал 1 раз, очень понравилась</li>
                        <li>7 - понравилась</li>
                        <li>6 - нормально +</li>
                        <li>5 - средне</li>
                        <li>4 - не понравилась</li>
                        <li>3 - не понравилась, не дочитал</li>
                        <li>ниже 3 не ставлю, ибо не вижу смысла такие книги вообще добавлять на портал.</li>
                    </ul>
                </li>
                <li>Фильтр "Любимые" в разделе Книги - выдаёт книги с рейтингом от 8 и выше.</li>
                <li>Фильтр "Любимые" в разделе Авторы - выдаёт авторов, у которых добавлено на портал от 3 книг.</li>
                <li>Чтобы авторов и книги фильтровать на Отечественные - при создании отечественного автора необходимо указать страну Россия либо СССР.</li>
                <li>Если удалить автора - то удалятся все книги, прикреплённые к нему.</li>
                <li>Удалить страну, к которой прикреплён хотя бы один автор, - нельзя.</li>                
            </ol>
        </Container>
    );
};

export default ManualPage;