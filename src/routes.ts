import { FIRST_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, BOOK_ROUTE, AUTHOR_ROUTE, AUTHORS_ROUTE, NOTE_ROUTE, MAIN_ROUTE, ADD_AUTHOR_ROUTE, ADD_BOOK_ROUTE, MANUAL_ROUTE } from "./utils/consts";
import {AddAuthorPage, AddBookPage, AuthorPage, AuthorsPage, AuthPage, BookPage, FirstPage, MainPage, NotesPage, ManualPage} from './pages';

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: BookPage
    },
    {
        path: ADD_BOOK_ROUTE,
        Component: AddBookPage
    },
    {
        path: AUTHORS_ROUTE,
        Component: AuthorsPage
    },
    {
        path: AUTHOR_ROUTE + '/:id',
        Component: AuthorPage
    },
    {
        path: ADD_AUTHOR_ROUTE,
        Component: AddAuthorPage
    },
    {
        path: NOTE_ROUTE,
        Component: NotesPage
    },
    {
        path: MANUAL_ROUTE,
        Component: ManualPage
    },
];

export const publicRoutes = [
    {
        path: FIRST_ROUTE,
        Component: FirstPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: REGISTER_ROUTE,
        Component: AuthPage
    }
];