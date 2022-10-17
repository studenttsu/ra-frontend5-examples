import { SongsApp } from './app.js';

const songsMockData = [
    {
        id: 1,
        name: 'Диалоги тет-а-тет',
        author: 'ALEKS ATAMAN, FINIK',
    },
    {
        id: 2,
        name: 'Батарейка',
        author: 'Жуки',
    },
];

new SongsApp(songsMockData);