import $ from 'jquery';
import 'slick-carousel/slick/slick';
import "@fancyapps/ui";

function init() {
    $('.slider').slick({
        slidesToShow: 4,
        prevArrow: '.slider-prev',
        nextArrow: '.slider-next',
        infinite: false
    });
}

$(init)