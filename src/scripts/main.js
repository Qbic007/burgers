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

    accordeon('team');
    accordeon('menu');

    function accordeon(blockName) {
        let blockAccoTrigger = $('.' + blockName +'-acco__trigger');
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
});