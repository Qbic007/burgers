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

    let swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.slider__arrow-right',
            prevEl: '.slider__arrow-left',
        },
    });

    let onePageScroller = new Swiper('.one-page-scroller', {
        direction: 'vertical',
        slidesPerView: 1,
        effect: 'fade',
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // кнопка заказать

    document.querySelector('.js-order-button').addEventListener('click', function (e) {
        e.preventDefault();
        onePageScroller.slideTo(7, 0);
    });

    // навигация меню

    let jsNavItem=$('.js-nav-item');

    jsNavItem.on('click', function (elem) {
        elem.preventDefault();

        let self = $(this);
        onePageScroller.slideTo(self.data('page'), 0);
    });

    // Якарта

    ymaps.ready(init);

    let placemarks = [
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
        let map = new ymaps.Map('map', {
            center: [59.92, 30.31],
            zoom: 11,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        placemarks.forEach(function (obj) {
            let placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
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

    // отправка формы

    let orderForm = $('#order-form');
    let orderFormSubmitButton = orderForm.find('[type="submit"]');
    let fieldName = orderForm.find('[name="name"]');
    let fieldPhone = orderForm.find('[name="phone"]');
    let fieldComment = orderForm.find('[name="comment"]');
    let fieldTo = orderForm.find('[name="to"]');

    const myform = document.querySelector("#order-form");

    orderFormSubmitButton.on('click', function (elem) {
        elem.preventDefault();

        if (validateForm(myform)) {
            let data = new FormData();
            data.append("name", fieldName.val());
            data.append("phone", fieldPhone.val());
            data.append("comment", fieldComment.val());
            data.append("to", fieldTo.val());

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send(data);
            xhr.addEventListener('load', () => {
                if (xhr.response.status) {
                    showModal('Отправка заказа', xhr.response.message);
                } else {
                    showModal('Отправка заказа', 'Произошла ошибка');
                }
            });
        }
    });

    function validateForm(form) {
        valid = validateField(form.elements.name);
        valid = validateField(form.elements.phone);
        valid = validateField(form.elements.comment);
        valid = validateField(form.elements.to);

        return valid;
    }

    function validateField(field) {
        if (field.checkValidity()) {
            return true;
        }

        $(field).attr('placeholder', 'Обязательное поле');
        return false;
    }

    //показ и закрытие модального окна

    let modal = $('#modal');
    let modalTitle = modal.find('.js-modal-title');
    let modalContent = modal.find('.js-modal-content');
    let modalCloseIcon = modal.find('.js-modal-close-icon');

    function showModal(title, content) {
        modalTitle.text(title);
        modalContent.html(content);
        modal.css('display', 'flex');
    }

    modalCloseIcon.on('click', function () {
        modal.css('display', 'none');
    });

    //модалка в отзывах

    let reviewsDetailsButton = $('.js-reviews-details-button');

    reviewsDetailsButton.on('click', function () {
        let self = $(this);
        let reviewsContainer = self.closest('.js-reviews-container');
        let reviewsTitle = reviewsContainer.find('.js-reviews-title');
        let reviewsDetails = reviewsContainer.find('.js-reviews-details');

        showModal(reviewsTitle.html(), reviewsDetails.html());
    });
});