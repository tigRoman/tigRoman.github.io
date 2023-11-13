import {getResourse} from '../services/services';

function cards() {
    //menuCard rendering with classes

    class MenuToday {
        constructor(imgSrc, alt, descr, subtitle, price, parentSelector, ...classes){
        this.imgSrc = imgSrc;
        this.alt = alt;
        this.descr = descr;
        this.subtitle = subtitle;
        this.price = price;
        this.classes = classes;
        this.transfer = 27;
        this.changeToUAH();
        this.parent = document.querySelector(parentSelector);
        }

        changeToUAH() {
        this.price = Math.round(this.price * this.transfer);
        }

        render() {
        const div = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = 'menu__item';
            div.classList.add(this.classes);
        } else {
            this.classes.forEach(className => div.classList.add(className));
        }
        
        div.innerHTML = `
        <img src="${this.imgSrc}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;
        this.parent.append(div);

        }

    }

    // const descrVeg = `Меню "Фитнес" - это новый подход к приготовлению блюд: 
    // больше свежих овощей и фруктов. Продукт активных и здоровых людей. 
    // Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`;

    // const descrElite = `В меню “Премиум” мы используем не только красивый дизайн упаковки, 
    // но и качественное исполнение блюд. 
    // Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`;

    // const descrPost = `Меню “Постное” - это тщательный подбор ингредиентов: 
    // полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, 
    // правильное количество белков за счет тофу и импортных вегетарианских стейков.`;

    // const vegM = new MenuToday(
    //   'img/tabs/vegy.jpg', 
    //   'vegy', 
    //   descrVeg, 
    //   'Меню "Фитнес"', 
    //   '8.15',
    //   '.menu .container'
    // );

    // const eliteM = new MenuToday(
    //   'img/tabs/elite.jpg', 
    //   'elite', 
    //   descrElite, 
    //   'Меню "Премиум"', 
    //   '20.37', 
    //   '.menu .container'
    // );

    // const postM = new MenuToday(
    //   'img/tabs/post.jpg', 
    //   'post', 
    //   descrPost, 
    //   'Меню "Постное"', 
    //   '15.93', 
    //   '.menu .container'
    // );

    // vegM.render();
    // eliteM.render();
    // postM.render();




    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, descr, title, price}) => {
              new MenuToday(img, altimg, descr, title, price, '.menu .container').render();
            });
        });

    //второй вариант динамической верстки
    //если нужно создать только один раз и не нужен шаблон

    // getResourse('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    //используем Axios для get запросов

    // axios.get('http://localhost:3000/menu')
    // .then(data => data)
    // .then(data => {
    //             data.data.forEach(({img, altimg, descr, title, price}) => {
    //             new MenuToday(img, altimg, descr, title, price, '.menu .container').render();
    //             });
    //         });

    function createCard(data) {
        data.forEach(({img, altimg, descr, title, price}) => {
        const element = document.createElement('div');

        element.classList.add('menu__item');

        element.innerHTML = `
        <img src="${img}" alt="${altimg}">
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
    </div>
        `;

        document.querySelector('.menu .container').append(element);

        });

    }

}

export default cards;