document.addEventListener("DOMContentLoaded", function () {

  // Scroll

  const anchors = document.querySelectorAll('.scroll');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  // Categories

  document.querySelectorAll(".categories-item__button").forEach(button => {
    button.addEventListener("click", function () {
      let btn = this;
      let list = this.parentElement.querySelector(".categories-item__list");

      document.querySelectorAll(".categories-item__button").forEach(el => {
        if (el != btn) {
          el.classList.remove("active");
        }
      });

      document.querySelectorAll(".categories-item__list").forEach(el => {
        if (el != list) {
          el.classList.remove("active");
        }
      });

      btn.classList.toggle("active");
      list.classList.toggle("active");
    });
  });

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".header__categories")) {
      document.querySelectorAll(".categories-item__button").forEach(el => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".categories-item__list").forEach(el => {
        el.classList.remove("active");
      });
    }
  });

  // Burger

  document.querySelector(".burger").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.add("active");

    document.querySelectorAll('.main-menu__link').forEach(function (e) {
      e.addEventListener('click', () => {
        document.querySelector(".header__nav").classList.remove("active");
      });
    });
  });

  document.querySelector(".burger-close").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.remove("active");
  });

  // Filter mobile

  document.querySelector(".header__search-button-mobile").addEventListener("click", function () {
    this.classList.add("active");
    document.querySelector(".header__search-form").classList.add("active");
  });

  document.querySelector(".header__search-close").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".header__search-button-mobile").classList.remove("active");
    document.querySelector(".header__search-form").classList.remove("active");
  })

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".header__search")) {
      document.querySelector(".header__search-button-mobile").classList.remove("active");
      document.querySelector(".header__search-form").classList.remove("active");
    }
  });

  // Hero swiper

  const swiper = new Swiper('.hero__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 2000,
    autoplay: {
      delay: 2000
    },
    effect: "fade",
    allowTouchMove: false,

  });

  //  Gallery choices

  const element = document.querySelector('.gallery__filter-choices');
  const choices = new Choices(element, {
    searchEnabled: false,
  });

  //  Gallery swiper

  const swiper1 = new Swiper('.gallery__swiper-container', {
    // Optional parameters
    loop: false,
    autoHeight: false,
    watchOverflow: false,
    slidesPerView: 1,
    slidesPerGroup: 1,
    grid: {
      rows: 1,
      fill: 'row',
    },
    breakpoints: {
      560: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 1,
          fill: 'row',
        },
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
          fill: 'row',
        },
        spaceBetween: 34,
      },
      1201: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 2,
          fill: 'row',
        },
        spaceBetween: 50,
      }
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  });

  //  Gallery filter

  const select = document.querySelector("#galleryChoice");

  select.addEventListener("change", function () {
    document.querySelector(".gallery__slider.active").classList.remove("active");

    const select = document.querySelector("#galleryChoice");
    const targetId = "#" + select.value;
    document.querySelector(`${targetId}`).classList.add("active");

  });

  // Popup


  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.wrapper');

  let unlock = true;

  const timeout = 0;

  if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
      const popupLink = popupLinks[i];
      popupLink.addEventListener('click', function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.popup__close');

  if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
      const el = popupCloseIcon[i];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.lenth; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  })

  // Catalog

  $(function () {
    $(".catalog__main-right").accordion({
      heightStyle: "content"
    });
  });

  document.querySelectorAll(".catalog__top-countries-item").forEach(function (el) {
    el.addEventListener("click", function (event) {
      const path = event.currentTarget.dataset.path;
      const target = document.querySelector(`[data-target="${path}"]`);

      const activeHead = document.querySelector(".catalog__top-countries-item.active");
      const activeTablist = document.querySelector(".catalog__main-right.active");

      if (activeHead) {
        activeHead.classList.remove("active");
        activeTablist.classList.remove("active");
      };

      el.classList.add("active");
      target.classList.add("active");
    });
  });
  document.querySelectorAll(".catalog__main-artists-list-item").forEach(function (e) {
    e.addEventListener("click", function (event) {

      const path = event.currentTarget.getAttribute('href').replace('#', '');
      const target = document.querySelector(`[data-target="${path}"]`);

      const activeTarget = document.querySelector(".catalog__main-artist.active");
      const activeArtist = document.querySelector(".catalog__main-artists-list-item.active");

      if (activeTarget) {
        activeTarget.classList.remove("active");
        activeArtist.classList.remove("active");
      };

      e.classList.add("active");
      target.classList.add("active");

      if (window.innerWidth <= 996) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }


    });
  });

  // Events
  let eventsButton = document.querySelector(".events__button-item");

  eventsButton.addEventListener("click", function () {
    document.querySelectorAll(".events__list-item").forEach(item => {
      item.style.display = "flex";
    });
    this.style.display = "none";
  });

  let slider = document.querySelector(".events__swiper");
  let eventsSlider;

  function mobileSlider() {
    if (window.innerWidth <= 767 && slider.dataset.mobile == "false") {
      eventsSlider = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        autoHeight: false,
        pagination: {
          el: '.events__pagination',
          clickable: true,
        },
        breakpoints: {
          610: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          }
        },
      });

      slider.dataset.mobile = "true";
    }

    if (window.innerWidth > 767 && slider.dataset.mobile == "true") {
      slider.dataset.mobile = "false";
      if (slider.classList.contains("swiper-initialized")) {
        eventsSlider.destroy();
      }
      if (eventsButton.style.display == "none") {
        eventsButton.style.display = "inline-block";
      }
    }
  };

  mobileSlider();

  window.addEventListener("resize", () => {
    mobileSlider();
  });

  // Books

  let newSlider = document.querySelector(".books__slider");
  let booksSlider;

  function booksSliderInit() {
    if (window.innerWidth > 767 && newSlider.dataset.mobile == "false") {
      booksSlider = new Swiper(newSlider, {
        // Optional parameters
        loop: false,
        autoHeight: false,
        watchOverflow: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        breakpoints: {
          997: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 49,
          },
          1631: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          }
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.books__slider-pagination',
          type: 'fraction',
        },
      });
      newSlider.dataset.mobile = "true";
    } else if (window.innerWidth <= 767 && newSlider.dataset.mobile == "true") {
      booksSlider.destroy();
      newSlider.dataset.mobile = "false";
    }
  };

  booksSliderInit();

  window.addEventListener("resize", () => {
    booksSliderInit();
  });

  let booksCategories = document.querySelectorAll(".books__categories-item-input");
  let books = document.querySelectorAll(".books__slider-item");

  function activeBooks() {
    books.forEach(book => {
      book.classList.remove("active");
    });
    booksCategories.forEach(input => {
      if (input.checked) {
        const inputId = input.id;
        books.forEach(book => {
          if (book.dataset.target == inputId) {
            book.classList.add("active");
          }
        });
      }
    });

  };

  activeBooks();

  booksCategories.forEach(input => {
    input.addEventListener("change", () => {
      activeBooks();
      booksSlider.update();
    });
  });

  let categoriesTitle = document.querySelector(".books__categories-title");
  let categoriesLabel = document.querySelectorAll(".books__categories-item");

  function categoriesList() {
    categoriesTitle.classList.toggle("active");
    if (categoriesTitle.classList.contains("active")) {
      categoriesLabel.forEach(label => {
        label.classList.add("active");
      });
    } else {
      categoriesLabel.forEach(label => {
        let inputId = label.getAttribute("for");
        let input = document.getElementById(inputId);
        if (input.checked) {
          label.classList.add("active");
        } {
          label.classList.remove("active");
        }
      });
    }
  };

  categoriesTitle.addEventListener("click", () => {
    categoriesList();
  });

  // Projects

  let projectIcons = document.querySelectorAll(".projects__text-i");

  projectIcons.forEach(icon => {
    tippy(icon, {
      content: icon.querySelector(".text-i-popup"),
      trigger: "mouseenter click focusin",
      /* trigger: "focusin", */
      theme: 'purple',
    })
  });

  const swiper3 = new Swiper('.projects__partners-slider', {
    loop: false,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      560: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      997: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      1201: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      }
    },

  });

  window.addEventListener("resize", () => {
    swiper3.update();
  });

  // Contacts

  let mapLoaded = false;

  window.addEventListener('scroll', lazyLoadMap);

  function lazyLoadMap() {
    let scrollY = window.scrollY;
    let viewHeight = document.documentElement.clientHeight;
    let mapOffset = document.querySelector("#contacts").offsetTop;

    if ((scrollY >= mapOffset - 500 - viewHeight) && (!mapLoaded)) {

      ymaps.ready(init);
      function init() {
        let map = document.querySelector("#map");
        var myMap = new ymaps.Map(map, {
          center: [55.760649, 37.618441],
          zoom: 13
        });

        var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
          iconLayout: 'default#image',
          iconImageHref: '../img/icons/map.svg',
          iconImageSize: [20, 20],
          iconImageOffset: [-15, 0]
        });

        myMap.geoObjects.add(myPlacemark);


        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('fullscreenControl');
        myMap.controls.remove('rulerControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('zoomControl');
      }
      mapLoaded = true;
    }
  };

  // Mask

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(selector);

  // Validation

  new JustValidate('.contacts__info-callback', {
    rules: {
      name: {
        required: true,
        minLength: 2,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      },
    },
    messages: {
      name:
        'Недопустимый формат',
      tel:
        'Недопустимый формат'

    },

  });

});
