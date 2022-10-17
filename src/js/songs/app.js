import { createSongElement, isTargetButton } from './utils.js';

const canHandleButton = (event, id) => isTargetButton(event) && event.target.closest(id);

export class SongsApp {
    constructor(songsData = []) {
        this.favoriteSongIds = [];
        this.songsData = songsData;

        this.formEl = document.getElementById('form');
        this.songsListEl = document.getElementById('songs-list').querySelector('ul.songs-list');
        this.favoriteSongsEl = document.getElementById('favorite-song').querySelector('ul.songs-list');

        this.init();
    }

    init() {
        this.songsData.forEach(song => {
            const songEl = createSongElement(song, 'В избранное');
            this.songsListEl.append(songEl);
        });

        this.bindEvents();
    }

    bindEvents() {
        this.formEl.addEventListener('submit', this.createSong);
        this.songsListEl.addEventListener('click', this.addToFavorite);
        this.favoriteSongsEl.addEventListener('click', this.removeFromFavorite);
    }

    removeFromFavorite = event => {        
        if (canHandleButton(event, '#favorite-song')) {
            const songId = event.target.previousElementSibling.dataset.id;
            const index = this.favoriteSongIds.indexOf(songId);
        
            if (index !== -1) {
                this.favoriteSongIds.splice(index, 1);
                event.target.closest('li').remove();

                const songEl = this.songsListEl.querySelector(`.song-el[data-id=${songId}]`);

                if (songEl) {
                    songEl.classList.remove('favorite');
                }
            }
        }
    }

    addToFavorite = event => {
        if (canHandleButton(event, '#songs-list')) {
            const songId = event.target.previousElementSibling.dataset.id;
            const song = this.songsData.find(s => s.id === parseInt(songId, 0));
        
            if (!this.favoriteSongIds.includes(songId) && song) {
                this.favoriteSongIds.push(songId);
        
                event.target.classList.add('favorite');
                this.favoriteSongsEl.append(createSongElement(song, 'Удалить'));
            }
        }
    }

    createSong = event => {
        event.preventDefault();

        const { elements } = event.target;
        const author = elements.author.value;
        const name = elements.name.value;

        const newSongItem = {
            id: songs.length + 1,
            author,
            name
        };
        
        const newSongEl = createDefaultSongElement(newSongItem);        
        this.songsListEl.append(newSongEl);

        songs.push(newSongItem);
        this.formEl.reset();
    }
}