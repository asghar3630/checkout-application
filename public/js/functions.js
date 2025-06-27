$(function () {
    const rescaleCaptcha = () => {
        var width = $('.g-recaptcha').parent().width();
        var scale;
        if (width < 302) {
            scale = width / 302;
        } else {
            scale = width / 302;
        }

        $('.g-recaptcha').css('transform', 'scaleX(' + scale + ')');
        $('.g-recaptcha').css('-webkit-transform', 'scaleX(' + scale + ')');
        $('.g-recaptcha').css('transform-origin', '0 0');
        $('.g-recaptcha').css('-webkit-transform-origin', '0 0');

        //$("body[dir=rtl] .g-recaptcha").css("transform", "none");
        //$("body[dir=rtl] .g-recaptcha").css("-webkit-transform", "none");

        $('body[dir=rtl] .g-recaptcha').css('transform-origin', '100% 0');
        $('body[dir=rtl] .g-recaptcha').css('-webkit-transform-origin', '100% 0');
    };

    rescaleCaptcha();
    $(window).resize(function () {
        console.log('Resizing');
        rescaleCaptcha();
    });

    window.rescaleCaptcha = rescaleCaptcha;
});
