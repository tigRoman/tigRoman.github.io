//async - ставим перед аргументами если у нас асинхронный код(общение с сервером и тд.)
//await - ставим перед тем чего нужно дождаться

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",//указываем метода
        body: data,//тут казываем данные для передачи, переведя в формат json
        headers: {
        'content-type': 'application/json'//ну и тут заголовки
        }
    });

    return await res.json();

};

const getResourse = async (url) => {
    const res = await fetch(url);

    //выкидываем ошибку если что-то пошло не так
    if(!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status} `);
    }
        
    return await res.json();

};

export {postData};

export {getResourse};
