import { Utils } from './utils.js';

console.log(Utils.sum(1, 2));

let name = '';
name = 'name';

const COLOR = '#fff';

// Api key from GitHub
const API_KEY = 'qehfjn324234';

/**
 *  
 */

const firstName = '1', lastName = '2', patronymic = '3';
const fullName = `${lastName} ${firstName} ${patronymic}`;

const isAdmin = true;

if (!isAdmin) {
    // истинно
} else {
    // ложно
}

const condition = isAdmin ? 'true' : 'false';

const action = 'Create';

switch (action) {
    case 'Create': 
    console.log(1);
    break;
    
    case 'Edit':
        console.log(2);
        break;

    default:
        console.log('nothing');
}

// Циклы
const arr = [1, 2, 3];

for (let i = 0; i <= arr.length; i++) {
    console.log(arr[i]);
}

for (let item of arr) {
    console.log(item);
}

const _user = {
    name: '',
    age: 12
};

for (let key in _user) {
    console.log(key, _user[key]);
}

let count = 0;

while (count <= 5) {
	// Выводим в консоль значение переменной count
	console.log(count);

	// Увеличиваем значение переменной на 1;
	count++;
}

// False-value
0, null, undefined, false, ''

// Functions

function log(message = '') {
    if (message) {
        console.log(message);
    }
}

log('Alert');

// const makeAlert = function() {
//     alert();
// };

// const makeAlert = () => (2 + 1);

function makeAlert(callback) {
    if (callback) {
        console.log('callback');

        callback('value');
    }
}

makeAlert(value => {
    console.log('cb run', value);
});

[1, 2].map(function(item) {
    return item + 1;
});

[1, 2].map(item => item + 1);

// Objects

console.log('-------------------');

const user = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    age: 18,
    gender: 'male',
    getFullName: function() {
        return `${this.lastName} ${this.firstName}`;
    }
};


Object.keys(user).forEach(key => console.log(user[key]));
Object.values(user);

console.log(user.getFullName());

function func({ firstName, age }) {

}

func(user);

// const { firstName, age } = user;

const fruits = ['apple', 'orange'];
const [apple, orange] = fruits;

apple // apple
orange // orange

// Classes

/* const user = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    age: 18,
    gender: 'male',
    getFullName: function() {
        return `${this.lastName} ${this.firstName}`;
    }
};*/

class User {
    firstName = '';
    lastName = '';
    age = null;
    gender;

    constructor(user) {
        if (user) {
            this.lastName = user.lastName;
            this.firstName = user.firstName;
            this.age = user.age;
            this.gender = user.gender;
        }
    }

    getFullName() {
        return `${this.lastName} ${this.firstName}`;
    }
}

class Student extends User {
    #course;

    constructor(user, course) {
        super(user);
        this.#course = course;
    }

    sayHello() {
        alert('Hello');
    }
}

const student = new Student();