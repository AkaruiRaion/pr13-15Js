'use strict'

document.querySelector('.faq').addEventListener('click', function (event) {
    let target = event.target.closest('.faq__item');
    if (!target) return;

    target.classList.toggle('active');
    let p = target.querySelector('p');
    if (target.classList.contains('active')) {
        p.style.height = p.scrollHeight + 'px';
    } else {
        p.style.height = '';
    }
})

// Слайдер

let sliderBody = document.querySelector('.slider__body');
let sliderNav = document.querySelector('.slider__nav');
let sliderImages = document.querySelector('.slider__images');
let sliderItems = Array.from(document.querySelectorAll('.slider__item'));
let sliderDots = Array.from(document.querySelectorAll('.slider__dot'));

sliderBody.addEventListener('click', function (event) {
    let targetArrow = event.target.closest('.slider__arrow');
    if (!targetArrow) return;

    let currentActiveImage = document.querySelector('.slider__item.active');
    let currentActiveIndex = sliderItems.indexOf(currentActiveImage);

    currentActiveImage.classList.remove('active');
    document.querySelector('.slider__dot.active').classList.remove('active');

    changeActive(targetArrow, currentActiveIndex);

    let newActiveImage = document.querySelector('.slider__item.active');
    let newActiveIndex = sliderItems.indexOf(newActiveImage);

    scrollSlider(newActiveIndex);
})
function scrollSlider(index) {
    sliderImages.style.transform = `translateX(${-100 * index}%)`
}
function changeActive(arrow, currentIndex) {
    if (arrow.classList.contains('left')) {
        if (currentIndex == 0) {
            sliderItems.at(-1).classList.add('active');
            sliderDots.at(-1).classList.add('active');
        } else {
            sliderItems[currentIndex - 1].classList.add('active');
            sliderDots[currentIndex - 1].classList.add('active');
        }
    } else {
        if (currentIndex == sliderItems.length - 1) {
            sliderItems[0].classList.add('active');
            sliderDots[0].classList.add('active');
        } else {
            sliderItems[currentIndex + 1].classList.add('active');
            sliderDots[currentIndex + 1].classList.add('active');
        }
    }
}

sliderNav.addEventListener('click', function (event) {
    let targetDot = event.target.closest('.slider__dot');
    if (!targetDot) return;

    if (targetDot.classList.contains('active')) return;

    document.querySelector('.slider__dot.active').classList.remove('active');
    targetDot.classList.add('active');
    document.querySelector('.slider__item.active').classList.remove('active');

    sliderItems[targetDot.dataset.index].classList.add('active');
    scrollSlider(targetDot.dataset.index);
})

// Вкладки

let tabBtns = document.querySelectorAll('.tab__btn')
let tabTexts = document.querySelectorAll('.tab__text')

tabBtns.forEach((item, index) => {
    item.addEventListener('click', function () {
        document.querySelector('.tab__btn.active').classList.remove('active');
        item.classList.add('active');

        document.querySelector('.tab__text.active').classList.remove('active');
        tabTexts[index].classList.add('active')
    })
})

// Цветной блок

let colorBox = document.getElementById('colorBox');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');

let colorInterval;

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startColorChange() {
    colorInterval = setInterval(() => {
        colorBox.style.backgroundColor = getRandomColor();
    }, 500);
}

function stopColorChange() {
    clearInterval(colorInterval);
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);