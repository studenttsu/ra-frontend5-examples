export function createSongElement(data, btnName = '') {
    const elem = document.createElement('li');
    
    elem.innerHTML = `
        <div class="song-el" data-id=${data.id}>
            <div>${data.author} - <span>${data.name}</span></div>
        </div>
        <button>${btnName}</button>
    `;

    return elem;
}

export const isTargetButton = event => event.target.tagName === 'BUTTON';