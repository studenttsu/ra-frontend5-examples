document.querySelector('#mobile-menu-hamb')
    .addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.header__nav').classList.toggle('mobile-open');
    });


// JS - однопоточный
// синхронные и асинхронные

setTimeout(() => {
    console.log('time out');
}, 1000);

// Работа через коллбэки
// Promise
// Async/await

console.log('Request data...');

setTimeout(() => {
    console.log('Preparing data...');

    const data = {
        name: 'Ivanov Ivan'
    };

    setTimeout(() => {
        console.log(data);
    }, 2000);
}, 2000);


function getData() {
    console.log('Preparing data...');

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                name: 'Ivanov Ivan'
            };
    
            resolve(data);
        }, 2000);
    });
}

getData()
    .then((data) => console.log(data))
    .catch(error => console.log(error));

let isLoading = false;

async function init() {
    isLoading = true;

    try {
        const data = await getData();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        isLoading = false;
    }
}

init();