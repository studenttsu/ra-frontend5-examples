import 'slick-carousel/slick/slick';
import "@fancyapps/ui";
import $ from 'jquery';

import ApiService from './services/ApiService';

function init() {
    $('.slider').slick({
        slidesToShow: 4,
        prevArrow: '.slider-prev',
        nextArrow: '.slider-next',
        infinite: false
    });

    const API_PATH = 'https://beauty-saloon-server.herokuapp.com/api';

    const order = {
        name: 'Иван Пупкин',
        phone: '+7 999 999-99-99'
    };


    fetch(`${API_PATH}/orders`, {
        method: 'POST',
        body: JSON.stringify(order)
    })
        .then(() => {
            console.log('Successful');
        });


    async function makeRequests() {
        const { access_token } = await ApiService.login({
            userName: 'admin',
            password: 'admin'
        });

        const orders = await ApiService.getOrders(access_token);
        console.log(orders);
    }
}

init();