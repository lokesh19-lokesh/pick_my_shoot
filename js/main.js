(function () {
    'use strict';

    var wind = $(window);

    // Preloader
    var CustomApp = {
        init: function () {
            this.handlePreloader();
        },
        handlePreloader: function () {
            $(window).on('load', function () {
                $("#preloader").fadeOut(500);
                $(".preloader-bg").delay(300).fadeOut(500);
            });
            setTimeout(function () {
                if ($("#preloader").is(':visible')) {
                    $("#preloader").fadeOut(500);
                    $(".preloader-bg").fadeOut(500);
                }
            }, 3000);
        }
    };

    $(document).ready(function () {
        CustomApp.init();
    });

    var isMobile = {
        Android: function () { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // Full Height
    var fullHeight = function () {
        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };

    // Animations (Waypoints)
    var contentWayPoint = function () {
        if ($('.animate-box').length > 0) {
            $('.animate-box').waypoint(function (direction) {
                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    $(this.element).addClass('item-animate');
                    setTimeout(function () {
                        $('body .animate-box.item-animate').each(function (k) {
                            var el = $(this);
                            setTimeout(function () {
                                var effect = el.data('animate-effect');
                                if (effect === 'fadeIn') { el.addClass('fadeIn animated'); }
                                else if (effect === 'fadeInLeft') { el.addClass('fadeInLeft animated'); }
                                else if (effect === 'fadeInRight') { el.addClass('fadeInRight animated'); }
                                else { el.addClass('fadeInUp animated'); }
                                el.removeClass('item-animate');
                            }, k * 200);
                        });
                    }, 100);
                }
            }, { offset: '85%' });
        }
    };

    // Burger Menu 
    var burgerMenu = function () {
        $('.js-duru-nav-toggle').on('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $('body').toggleClass('offcanvas');
        });
    };

    // Mobile Menu outside click
    var mobileMenuOutsideClick = function () {
        $(document).on('click', function (e) { // 'click' eklendi
            var container = $("#duru-aside, .js-duru-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas')) {
                    $('body').removeClass('offcanvas');
                    $('.js-duru-nav-toggle').removeClass('active');
                }
            }
        });
        $(window).scroll(function () {
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-duru-nav-toggle').removeClass('active');
            }
        });
    };

    // Progress Scroll-to-top
    var progressScroll = function() {
        var progressPath = document.querySelector('.progress-wrap path');
        if (progressPath) {
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            
            $(window).scroll(updateProgress);
            
            var offset = 150;
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > offset) {
                    $('.progress-wrap').addClass('active-progress');
                } else {
                    $('.progress-wrap').removeClass('active-progress');
                }
            });
            
            $('.progress-wrap').on('click', function (event) {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 550);
                return false;
            });
        }
    };

    // Init All Functions
    $(function () {
        fullHeight();
        contentWayPoint();
        burgerMenu();
        mobileMenuOutsideClick();
        progressScroll();
    });
}());