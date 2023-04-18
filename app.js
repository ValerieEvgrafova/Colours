'use strict';

const cols = document.querySelectorAll('.col');

// Навешиваем обработчики событий 
// 1) при нажатии на клавишу пробел - цвета будут обновляться

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
});

// 2) при нажатии на открытый замок - замок закроется, и наоборот (результат сохраняется после нажатия на пробел)

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyTextColor(event.target.textContent);
    }
});

// создаем метод, позволяющий генерировать рандомный цвет для колонки

function generateRandomColor() {
    // RGB
    // FF0000 - red
    // 00FF00 - green
    // 0000FF - blue

    const hexCodes = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}

// создаем функцию, чтобы копировать номер цвета при нажатии на заголовок

function copyTextColor(text) {
    return navigator.clipboard.writeText(text);
}

// создаем функцию, которая будет менять текст заголовка, его цвет и цвет замка

function setRandomColors() {
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        const color = generateRandomColor();
        
        if (isLocked) {
            return;
        }
        
        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color);
        setTextColor(button, color);
    });
}

// создаем функцию, которая будет менять цвет заголока и цвет замка на контрастный по отношению к бэкграунду

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();