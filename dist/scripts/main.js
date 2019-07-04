document.addEventListener('DOMContentLoaded', ready);

function ready() {
    /*==========
    variables
    ==========*/


    var body = document.body;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var inputFile = $('.js_form-file__input');
    var inputFileName = $('.js_form-fille__name');
    var form = $('#form');
    var formMessage = $('.form-message');
    var costText = $('.js_cost__text');
    var packSwiper;
    var servicesSwiper;
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    var active = false;
    var formTextarea = $('.js_form__textarea').eq(0);
    var formTextareaLegend = $('.js_form__textarea-placeholder').eq(0);

    /*==========
    events
    ==========*/

    $(document).on('click', '.js_nav__link', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });

    $(document).scroll(function(event) {
        if (windowWidth > 980) {
            var scrollOffset = $(window).scrollTop() + $(window).height();

            $('.js_pack-item').each(function(idx, el) {
                var elOffset = $(el).offset().top;

                if (scrollOffset > elOffset) {
                    $(el).addClass('pack-item--visible');
                }
            });
        }

        lazyLoad();
    });

    $(window).on('resize', function() {
        initSwiper();
        lazyLoad();
    });

    $(window).on('orientationchange', function() {
        initSwiper();
        lazyLoad();
    });

    inputFile.on('change', function(e) {
        if (this.files.length > 0) {
            var fileName = this.files[0].name;

            inputFileName.html(fileName);
        }
    });

    form.on('submit', function(e) {
        formMessage.removeClass('form-message--hidden');
        form.addClass('form--hidden');
        costText.addClass('cost__text--hidden');
    });

    formTextarea.on('scroll', onFormTextareaScroll);

    lazyYoutube();
    initSwiper();
    lazyLoad();

    /*==========
    functions
    ==========*/

    function lazyYoutube() {
        var youtube = document.querySelectorAll(".youtube");

        for (var i = 0; i < youtube.length; i++) {
            var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/maxresdefault.jpg";
            var image = new Image();

            image.dataset.src = source;
            image.className = 'lazy';
            image.addEventListener("load", function() {
                youtube[i].appendChild(image);
            }(i));

            youtube[i].addEventListener("click", function() {

                var iframe = document.createElement("iframe");

                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allowfullscreen", "");
                iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");

                this.innerHTML = "";
                this.appendChild(iframe);
            });

            lazyImages.push(image);
        };
    }

    function initSwiper() {
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;

        if (windowWidth < 980) {
            var packContainer = $('.js_pack');
            var packList = $('.js_pack-list');
            var packItems = $('.js_pack-item');

            var servicesContainer = $('.js_services');
            var servicesList = $('.js_services-list');
            var servicesItems = $('.js_services-item');

            packContainer.addClass('swiper-container');
            packList.addClass('swiper-wrapper');
            packItems.addClass('swiper-slide');

            servicesContainer.addClass('swiper-container');
            servicesList.addClass('swiper-wrapper');
            servicesItems.addClass('swiper-slide');

            if (typeof packSwiper == 'undefined') {
                packSwiper = new Swiper('.js_pack', {
                    loop: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    navigation: {
                        nextEl: '.js_pack__arrow-next',
                        prevEl: '.js_pack__arrow-prev',
                    },
                });
            }

            if (typeof servicesSwiper == 'undefined') {
                servicesSwiper = new Swiper('.js_services', {
                    loop: true,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    navigation: {
                        nextEl: '.js_services__arrow-next',
                        prevEl: '.js_services__arrow-prev',
                    },
                });
            }
        } else {
            $('.swiper-slide-duplicate').remove();
            $('.swiper-container').removeClass('swiper-container');
            $('.swiper-wrapper').removeClass('swiper-wrapper');
            $('.swiper-slide').removeClass('swiper-slide');

            if (typeof packSwiper != 'undefined') {
                packSwiper.destroy();
                packSwiper = undefined;
            }

            if (typeof servicesSwiper != 'undefined') {
                servicesSwiper.destroy();
                servicesSwiper = undefined;
            }
        }
    }

    function lazyLoad() {
        if (active === false) {
            active = true;

            setTimeout(function() {
                lazyImages.forEach(function(lazyImage) {
                    if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazy");

                        lazyImages = lazyImages.filter(function(image) {
                            return image !== lazyImage;
                        });

                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener("orientationchange", lazyLoad);
                        }
                    }
                });

                active = false;
            }, 200);
        }
    }

    function onFormTextareaScroll() {
        var scrollOffset = formTextarea.scrollTop();
        
        if (scrollOffset > 0) {
            formTextareaLegend.addClass('form__placeholder--hidden');
        }
        else {
            formTextareaLegend.removeClass('form__placeholder--hidden');
        }
    }
}