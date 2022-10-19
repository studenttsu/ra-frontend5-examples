import 'slick-carousel/slick/slick';
import "@fancyapps/ui";
import $ from 'jquery';

function init() {
    $('.slider').slick({
        slidesToShow: 4,
        prevArrow: '.slider-prev',
        nextArrow: '.slider-next',
        infinite: false
    });
}

init();