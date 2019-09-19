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
        loop: true
    });

    let onePageScroller = new Swiper('.one-page-scroller', {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    // кнопка заказать

    let orderButton = $('.js-order-button');
    orderButton.on('click', function (elem) {
        elem.preventDefault();

        onePageScroller.slideTo(7, 0);
    });

    // навигация меню

    let jsNavItem=$('.js-nav-item');

    jsNavItem.on('click', function (elem) {
        elem.preventDefault();

        let self = $(this);
        onePageScroller.slideTo(self.data('page'), 0);
        $('#hamburgerMenu').hide();
    });

    let scrollDownButton = $('.js-scroll-down-button');

    scrollDownButton.on('click', function () {
        onePageScroller.slideTo(1, 0);
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
            let data = new FormData(myform);

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.send(data);
            xhr.addEventListener('load', () => {
                if (xhr.response.status) {
                    showPopup(xhr.response.message);
                    myform.reset();
                } else {
                    showPopup('Произошла ошибка');
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

    //показ и закрытие попапа

    let popup = $('#popup');
    let popupContent = popup.find('.js-popup-content');
    let popupCloseButton = popup.find('.js-popup-button');

    function showPopup(content) {
        popupContent.html(content);
        popup.css('display', 'flex');
    }

    popupCloseButton.on('click', function () {
        popup.css('display', 'none');
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

    //плеер

    let video = document.querySelector('.video__player');
    let bigPlayBtn = document.querySelector('.video__overlay');
    let smallPlayBtn = document.querySelector('.video__panel-play-play');
    let smallPauseBtn = document.querySelector('.video__panel-play-pause');
    let volumeBtn = document.querySelector('.video__panel-volume');
    let circleProgress = document.querySelector('.video__panel-circle--progress');
    let progressBar = document.querySelector('.video__panel-bar--progress');
    let circleVolume = document.querySelector('.video__panel-circle--volume');
    let volumeBar = document.querySelector('.video__panel-bar--volume');

    circleVolume.style.left = '50%';
    let currentVolume = 0.5;
    video.volume = currentVolume;

    bigPlayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        video.play();
        bigPlayBtn.style.display = 'none';
        smallPauseBtn.style.display = 'block';
        smallPlayBtn.style.display = 'none';
    });

    video.addEventListener('click', function () {
        if (video.paused) {
            video.play();
            bigPlayBtn.style.display = 'none';
            smallPlayBtn.style.display = 'none';
            smallPauseBtn.style.display = 'block';
        } else {
            video.pause();
            bigPlayBtn.style.display = 'block';
            smallPlayBtn.style.display = 'block';
            smallPauseBtn.style.display = 'none';
        }
    });

    video.addEventListener('timeupdate', function () {
        let position = video.currentTime / video.duration;
        circleProgress.style.left = position * 100 + '%';
    });

    smallPlayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (video.paused) {
            video.play();
            bigPlayBtn.style.display = 'none';
            this.style.display = 'none';
            smallPauseBtn.style.display = 'block';

        } else {
            video.pause();

        }
    });

    smallPauseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!video.paused) {
            video.pause();
            this.style.display = 'none';
            smallPlayBtn.style.display = 'block';
            bigPlayBtn.style.display = 'block';

        } else {
            video.play();
        }
    });

    progressBar.addEventListener('click', function (e) {
        if (video.paused) {
            bigPlayBtn.style.display = 'none';
            smallPauseBtn.style.display = 'block';
            smallPlayBtn.style.display = 'none';
        }
        let barWidth = this.offsetWidth;
        let clickPosition = e.offsetX;
        circleProgress.style.left = (100 * clickPosition / barWidth) + '%';
        video.currentTime = video.duration * clickPosition / barWidth;

        video.play();
    });

    volumeBar.addEventListener('click', function (e) {
        let barWidth = this.offsetWidth;
        let clickPosition = e.offsetX;
        circleVolume.style.left = (100 * clickPosition / barWidth) + '%';
        currentVolume = clickPosition / barWidth;
        video.volume = currentVolume;
        volumeBtn.classList.remove('active');
    });

    volumeBtn.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            video.volume = 0;
        } else {
            video.volume = currentVolume;
        }
    });
});