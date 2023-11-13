function slider({conteiner, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider

    //my solution
    // function sliderInit(selector, total, current) {
    //   const sliderParent = document.querySelector(selector),
    //         slides = sliderParent.querySelectorAll('.offer__slide'),
    //         totalSlide = sliderParent.querySelector('#total'),
    //         currentSlide = sliderParent.querySelector('#current');

    //         console.log(slides);

    //         slides.forEach(slide => {
    //           slide.classList.add("hide");
    //         });

    //         slides[current - 1].classList.remove("hide");

    //         totalSlide.innerHTML = getZero(total);
    //         currentSlide.innerHTML = getZero(current);
    // }

    // sliderInit(".offer__slider", 4, 1);

    // let counter = 1;

    // const prevSlide = document.querySelector(".offer__slider-prev"),
    //       nextSlide = document.querySelector(".offer__slider-next");
            
    // prevSlide.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   if (counter > 1) {
    //     counter--;
    //   } else {counter = 4;}

    //   sliderInit(".offer__slider", 4, counter);
    // });

    // nextSlide.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   if (counter < 4) {
    //     counter++;
    //   } else {counter = 1;}

    //   sliderInit(".offer__slider", 4, counter);
    // });

    //teacher solution 
    

    let slideIndex = 1;
    let offset = 0;
    const slides = document.querySelectorAll(slide),
            slider = document.querySelector(conteiner),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalCounter),
            current = document.querySelector(currentCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width;


    //easy solution    

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
        
    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });

    //advanced solution

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `0${slideIndex}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';// это чтобы картинки выстраивались в ряд
    slidesField.style.transition = '0.5s all';// это для анимации карусели
    
    slidesWrapper.style.overflow = 'hidden';// скрываем все что не влазит в Wrapper


    slides.forEach(slide => {
        slide.style.width = width;
    });

    //теперь все элементы, которые абсолютно спозиционнированы внутри слайда будут нормально отображаться

    slider.style.position = 'relative';

    //создаем большую обертку для всех точек и стилизуем

    const indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
        dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
        } else {
        offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
        slideIndex = 1;
        } else {
        slideIndex++;
        }

        if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
        } else {
        current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
        offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
        slideIndex = slides.length;
        } else {
        slideIndex--;
        }

        if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
        } else {
        current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

        });
    });

}

export default slider;