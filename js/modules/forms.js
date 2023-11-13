import {closeMod, openMod} from './modal';
import {postData} from '../services/services';

function forms(formSelector, timerModalId) {
    
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    //подвязываем функцию ко всем вормам

    forms.forEach(item => {
        BindpostData(item);
    });



    function BindpostData(form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault();//отменяем стандратное поведение браузера

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        // form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);//чтоб не двигать верстку

        // const request = new XMLHttpRequest();
        // request.open('POST', 'server.php');
        


        // если мы используем XMLHttpRequest с formData, заголовок указывать не нужно
        // в противном случае будет ошибка
        // заголовок
        // request.setRequestHeader('Content-type', 'application/json');

        const formData = new FormData(form);

        //преобразум formData в JSON
        // const obj = {};
        // formData.forEach(function(value, key) {
        //   //лучше указывать в скобках
        //   //может не корректно прийти на сервер
        //   obj[key] = value;
        // });

        // const json = JSON.stringify(obj);

        //превращаем forData в json более элегантно

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        //используем fetch вместо XMLHttpRequest

        // fetch('server.php', {
        //   method: 'POST',
        //   headers: {'Content-type': 'application/json'},
        //   body: json
        // })//если данные успешно отправлены

        postData('http://localhost:3000/requests', json) 
        // .then(data => data.text())// превращем ответ в текст
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();//удаляем спиннер
        })//если не отправлены
        .catch(() => {
            showThanksModal(message.failure);
        })//выполняется в любом случае
        .finally(() => {
            form.reset();//очищаем форму
        });

        // request.send(json);

        // request.addEventListener('load', () => {
        //   if (request.status === 200) {
        //     console.log(request.response);
        //     showThanksModal(message.success);
        //     form.reset();//очищаем форму
        //     setTimeout(() => {
        //       statusMessage.remove();
        //     }, 2000);
        //   } else {
        //     showThanksModal(message.failure);
        //   }
        // });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openMod('.modal', timerModalId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div> 
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeMod('.modal');

        }, 4000);
    }

    //для get запроса нужн только один аргумент в fetch - url
    //для post нужно второй агумент - обьект

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: "POST",//указываем метода
    //   body: JSON.stringify({name: 'Alex'}),//тут казываем данные для передачи, переведя в формат json
    //   headers: {
    //     'content-type': 'application/json'//ну и тут заголовки
    //   }
    // })
    //   .then(response => response.json())//.json() преобразует данные в обычный обьект(работает только внутри fetch)
    //   .then(json => console.log(json));


    //   //json-сервер
    //   fetch('http://localhost:3000/menu')
    //       .then(data => data.json())
    //       .then(res => console.log(res));

}

export default forms;