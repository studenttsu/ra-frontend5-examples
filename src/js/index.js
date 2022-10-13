const songs = [
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

const favoriteSongs = [];

function init() {
    const formEl = document.getElementById('form');
    const songsListEl = document.getElementById('songs-list').querySelector('ul.songs-list');
    const favoriteSongsEl = document.getElementById('favorite-song').querySelector('ul.songs-list');

    // Наполнение списка песнями
    songs.forEach(song => {
        const songEl = createDefaultSongElement(song);

        songEl.querySelector('button')
            .addEventListener('click', event => addToFavoriteList(event, song));

        songsListEl.append(songEl);
    });

    formEl.addEventListener('submit', event => {
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

        newSongEl.querySelector('button')
            .addEventListener('click', event => addToFavoriteList(event, newSongItem));
        
        songsListEl.append(newSongEl);
        songs.push(newSongItem);

        formEl.reset();
    });

    function addToFavoriteList(event, song) {
        const songId = event.target.previousElementSibling.dataset.id;
    
        if (!favoriteSongs.includes(songId)) {
            favoriteSongs.push(songId);
    
            const favoriteSongEl = createFavoriteSongElement(song);
            favoriteSongEl.addEventListener('click', removeFromFavoriteList);
    
            favoriteSongsEl.append(favoriteSongEl);
            event.target.classList.add('favorite');
        }
    }
    
    function removeFromFavoriteList(event) {
        const songId = event.target.previousElementSibling.dataset.id;
        const index = favoriteSongs.indexOf(songId);
    
        if (index !== -1) {
            favoriteSongs.splice(index, 1);
            event.target.closest('li').remove();
            songEl.classList.remove('favorite');
        }
    }
}

function createSongElement(song, btnName) {
    const elem = document.createElement('li');
    
    elem.innerHTML = `
        <div class="song-el" data-id=${song.id}>
            <div>${song.author} - <span>${song.name}</span></div>
        </div>
    `;

    const btn = document.createElement('button');
    btn.textContent = btnName;

    elem.append(btn);
    return elem;
}

function createDefaultSongElement(song) {
    return createSongElement(song, 'В избранное');
}

function createFavoriteSongElement(song) {
    return createSongElement(song, 'Удалить');
}

init();



// Attributes

// const el = document.createElement('a');
// el.getAttribute('href');
// el.hasAttribute('');
// el.setAttribute('class', 'active favorite isBlue');
// el.removeAttribute('class');
// el.attributes




// const links = document.querySelectorAll('a');

// formEl.parentElement;
// formEl.children;
// formEl.firstElementChild
// formEl.lastElementChild
// formEl.previousSibling;
// formEl.nextSibling;
// formEl.hasChildNodes();