$(document).ready(function () {
    //модальное меню

    let closeHamburgerMenu = $('#closeHamburgerMenu');
    closeHamburgerMenu.on('click', function () {
        $('#hamburgerMenu').hide();
    });

    let hamburgerMenuLink = $('#hamburgerMenuLink');
    hamburgerMenuLink.on('click', function () {
        $('#hamburgerMenu').show();
    });


    //аккордеоны

    accordeon('team');
    accordeon('menu');

    function accordeon(blockName) {
        let blockAccoTrigger = $('.' + blockName + '-acco__trigger');
        blockAccoTrigger.on('click', function (elem) {
            elem.preventDefault();

            let self = $(this);
            let active = self.closest('.' + blockName + '-acco__item').hasClass('active');
            blockAccoTrigger.closest('.' + blockName + '-acco__item').removeClass('active');
            if (active) {
                self.closest('.' + blockName + '-acco__item').removeClass('active');
            } else {
                self.closest('.' + blockName + '-acco__item').addClass('active');
            }
        });
    }


    //слайдер

    var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.slider__arrow-right',
            prevEl: '.slider__arrow-left',
        },
    });


    // Якарта

    ymaps.ready(init);

    var placemarks = [
        {
            latitude: 59.93,
            longitude: 30.21,
            hintContent: '<div class="map__hint">Ул. Красных фонарей д.152</div>',
            balloonContent:
                'Самые вкусные бургеры ЗДЕСЬ!',
        },
        {
            latitude: 59.92,
            longitude: 30.34,
            hintContent: '<div class="map__hint">Ул. Сочных бургеров д.17</div>',
            balloonContent:
                'Самые вкусные бургеры У НАС!',
        },

        {
            latitude: 59.87,
            longitude: 30.27,
            hintContent: '<div class="map__hint">Ул. Мясоедов д.19</div>',
            balloonContent:
                'Таких вкусных бургеров ВЫ ЕЩЕ НЕ ПРОБОВАЛИ!!',
        },
    ];

    function init() {
        var map = new ymaps.Map('map', {
            center: [59.92, 30.31],
            zoom: 11,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        placemarks.forEach(function (obj) {
            var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
                    hintContent: '<div class="map__hint">' + obj.hintContent + '</div>',
                    balloonContent: obj.balloonContent,
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: './images/icons/map-marker.svg',
                    iconImageSize: [44, 56],
                    iconImageOffset: [-22, -56]

                });

            map.geoObjects.add(placemark);
        });

        map.setBounds(map.geoObjects.getBounds());
    }
});