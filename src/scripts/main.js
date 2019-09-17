$(document).ready(function () {
    let closeHamburgerMenu = $('#closeHamburgerMenu');
    closeHamburgerMenu.on('click', function () {
        $('#hamburgerMenu').hide();
    });

    let hamburgerMenuLink = $('#hamburgerMenuLink');
    hamburgerMenuLink.on('click', function () {
        $('#hamburgerMenu').show();
    });

    let ingredientsCloseIcon = $('#ingredientsCloseIcon');
    ingredientsCloseIcon.on('click', function () {
        $('#ingredients').hide();
    });

    let compound = $('#compound');
    compound.on('click', function () {
        $('#ingredients').show();
    });

    $('#teamAcco').accordable({
        speed: 300,
        addClasses: true,
        easing: 'swing'
    });

    let menuAccoTrigger = $('.menu-acco__trigger');
    menuAccoTrigger.on('click', function () {
        let self = $(this);
        $('.menu-acco__item').each(function (index, elem) {
            let menuAccoItem = $(elem);
            if (menuAccoItem.hasClass('active')) {
                menuAccoItem.removeClass('active');
            }
        });
        self.parents('.menu-acco__item').toggleClass('active');
        return false;
    });
});