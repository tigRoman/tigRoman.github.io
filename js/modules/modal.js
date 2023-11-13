function openMod(modalSeletor, timerModalID) {
    const modal = document.querySelector(modalSeletor);

    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';//фиксируем основное окно от прокрутки


    console.log(timerModalID);

    if(timerModalID) {
        clearInterval(timerModalID);
    }

}
function closeMod(modalSeletor) {
    const modal = document.querySelector(modalSeletor);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';//фиксируем основное окно от прокрутки
} 



function modal(triggerSelector, modalSeletor, timerModalID) {

    const btnsModal = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSeletor);



    btnsModal.forEach(btn => {
        btn.addEventListener('click', () => {
        openMod(modalSeletor);
        });
    });



    //закрытие при клике вне диалог окна

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeMod(modalSeletor);
        }   
    });

    //закрываем окно по нажатию esc на клавиатуре
    document.addEventListener('keydown', (e) => {
        //у каждой клавиши клавиатуры есть свой код
        if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeMod(modalSeletor);
        }
    
    });

    

    function showModalByScroll() {
        //прибавляем кол-во прокрученныъ пикс(длина) к колву видимых пикс(длина)
        //и сравниваем с кол-вом пикс (длиной) всей страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.
        documentElement.scrollHeight) {
            openMod(modalSeletor);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    //открываем модальное окно когда пользователь долистал сайт до конца

    window.addEventListener('scroll', showModalByScroll);

}

//export по умолчанию

export default modal;

//именованный export

export {closeMod};
export {openMod};