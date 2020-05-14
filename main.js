const App = (function () {
    const btn = document.querySelector(".bring-info__learn-more");
    const text = document.querySelector(".bring-info__learn_more-text");
    const sel = document.querySelector(".form__citizenship-input");
    const countryOk = document.querySelector(".form__country");
    const inputs = document.querySelectorAll(".js-ascent-text");
    const shortAppSwitch = document.querySelector(".form__fill-short-app-input");
    const recallForm = document.querySelector(".form__recall");
    const citizenship = document.querySelector(".form__citizenship");
    const tariffBlock = document.querySelector('.block-zero');
    return {
        init: function () {
            this.learnMoreBtn();
            this.citizenship();
            this.ascentText();
            this.ascentText();
            this.toggleModal(".js-open-btn-conditions", ".js-popup--condition", ".js-close-btn-conditions");
            this.toggleModal(".js-open-btn-friend", ".js-popup--friend-condition", ".js-close-btn-friend");
            this.toggleModal('.js-open-all-info', '.js-popup--all-info','.js-close-btn-all-info');
            this.toggleModal(".js-number-transfer", ".js-popup--number-transfer", ".js-close-btn-number-transfer");
            this.addPlaceholder();
            this.recallCheckbox();
        },

        recallCheckbox: function () {
            //При клике на "короткая заявка"
            const linkNextButton = document.querySelector('.form__next-link');
            const nextButton = linkNextButton.querySelector('.form__next-btn');
            shortAppSwitch.addEventListener("click", function () {
                if (shortAppSwitch.checked) {
                    //меняется текст на кнопке переключения стр
                    nextButton.innerHTML = "Короткая заявка";
                    //меняется хеш на кнопке переключения стр
                    linkNextButton.href = "#application-done";

                    recallForm.classList.add('display-block');
                    recallForm.classList.remove('display-none');

                    //тарифному блоку добавляем скрываеющий класс
                    tariffBlock.classList.add('display-none');
                    //у тарифного блока удаляем класс, который его показывает
                    tariffBlock.classList.remove('display-block');

                    citizenship.classList.add('display-none');
                    citizenship.classList.remove('display-block');
                } else {
                    //меняется текст на кнопке переключения стр
                    nextButton.innerHTML = "Далее";
                    //меняется хеш на кнопке переключения стр
                    linkNextButton.href = "#phone-number-wrap";

                    recallForm.classList.add('display-none');
                    recallForm.classList.remove('display-block');

                    //тарифному блока добавляем класс, который его показывает
                    tariffBlock.classList.add('display-block');
                    //удаляем у тарифного блока скрывающий класс
                    tariffBlock.classList.remove('display-none');

                    citizenship.classList.add('display-block');
                    citizenship.classList.remove('display-none');
                }
            });

        },

        learnMoreBtn: function () { // объявляем функцию
            btn.addEventListener("click", function () { // добавляем к константе обработчик событий "клик", который вызывает функцию
                // btn.classList.add("display-none"); // объявляем функцию
                // text.classList.add("display-block"); // объявляем функцию
                btn.style.display = "none"; // на константу накидываем стиль, свойство и значение "none", что выполняется вышеуказанной ф-цией, которая запускается благодаря собитию "клик"
                text.style.display = "block"; // тоже самое, только блок
            });
        },

        addPlaceholder: function () {

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener("focus", function () {
                    inputs[i].classList.add("is-active-placeholder");
                });

                inputs[i].addEventListener("blur", function () {
                    inputs[i].classList.remove("is-active-placeholder");
                });
            }
        },

        citizenship: function () {
            sel.addEventListener("click", function () {
                if (sel.selectedIndex === 0) {
                    countryOk.style.display = "none";
                } else {
                    countryOk.style.display = "block";
                }
            });
        },

        ascentText: function () { // объявляем функцию, в параметры записываем переменную labelClass
            for (let i = 0; i < inputs.length; i++) {  //объявляем цикл, который начинается с переменной i, к которой присваиваем значение 0; переменная i меньше чем массив inputs.length и инкрементацией последовательно перебирает его, выполняя следующие команды.
                inputs[i].addEventListener("input", function () {  // к сметченной с массивом [i] переменной инпут, навешивается событие blur, при этом объявляется функция при которой
                    if (inputs[i].value.length > 0) { // если значение сметченной с массивом [i] переменной инпут больше чем 0
                        inputs[i].classList.add("form__input-up"); // то к сметченной с массивом [i] переменной инпут добавляется класс
                    } else {
                        inputs[i].classList.remove("form__input-up");	// или убирается класс
                    }
                });

            }
        },

        toggleModal: function (button, popup, closeButton) {
            const conditionInfo = document.querySelectorAll(button);
            const modal = document.querySelector(popup);
            const closeBtn = document.querySelector(closeButton);
            conditionInfo.forEach(item => {
                item.addEventListener("click", function () {
                    modal.classList.add("modal");
                    modal.classList.remove("popup");
                });

                closeBtn.addEventListener("click", function () {
                    modal.classList.add("popup");
                    modal.classList.remove("modal");
                })
            })


        }
    }
})();

App.init();

//показывает тарифный блок
function showTariffOptions() {
    const block = document.querySelector('.application-form');
    const fields = block.querySelectorAll('.input-filled');
    const tariffBlock = block.querySelector(".additional-offer");
    const btn = block.querySelector('.form__next-link');
    const phone = block.querySelector('.form__phone-input');
    const textPhone = block.querySelector('.js-phone-error');
    const name = block.querySelector('.form__name-input');
    const textName = block.querySelector('.js-error-name');
    const region = block.querySelector('.form__text-input');
    const textRegion = block.querySelector('.js-error-region');
    const arr = Array.from(fields);

    //в массиве инпутов, вырезаю последний из 4
    arr.splice(3,1);

    //ф-ция для метода every
    function check(item){
        return item.classList.contains('display-block');
    }
    //если все поля заполненны корректно
    if(arr.every(check)){
        //то открываем блок с тарифами
        tariffBlock.classList.remove("hidden");
        //и снимаем с кнопки "Далее" класс блокирующий события
        btn.classList.remove("removal");
    }else{
        //если не все поля заполненны коррекстно
        //то скрываем блок с тарифами
        tariffBlock.classList.add("hidden");
    }
    btn.onmousedown = function(event){
        //если не все поля заполненны корректно
        if(arr.every(check) !== true){
            //то добавляем "Далее" класс блокирующий события
            btn.classList.add("removal");
            //находим все обязательные инпуты
            for(let i = 0; i < arr.length; i++){
                //и проверяем их на НЕкорректное значение
                if(!arr[i].classList.contains('display-block')){
                    //если первый инпут заполнен некорректно
                    if(i === 0){
                        //то добавляем красную обвотку инпуту с номером телефона
                        phone.classList.add("error-border");
                        // снимаем с инпута с номером телефона класс, через метод класс-лист
                        phone.classList.remove("pseudo-hover");
                        //добавляем подсказку к телефону
                        textPhone.innerHTML = "Необходимо указать номер телефона";
                    }else if(i === 1){//если второй
                        //то добавляем красную обвотку инпуту фио
                        name.classList.add("error-border");
                        // снимаем с инпута фио класс, через метод класс-лист
                        name.classList.remove("pseudo-hover");
                        //добавляем текст в инпуту фио
                        textName.innerHTML = "Укажите Ваше ФИО";
                    }else{//если третий
                        //то добавляем красную обвотку инпуту регион
                        region.classList.add("error-border");
                        // снимаем с переменной класс, через метод класс-лист
                        region.classList.remove("pseudo-hover");
                        //добавляем текст импуту регион
                        textRegion.innerHTML = "Укажите Ваш город или регион";
                    }
                }
            }
        }
    }
}

showTariffOptions();

function saveNumberNewNumberToggle() {
    const block = document.querySelectorAll('.phone-number');

    block.forEach(item => {
        const save = item.querySelector(".phone-number__save-number");
        const newNumber = item.querySelector(".phone-number__new-number");
        const newNumberBlock = item.querySelector(".new-number__options");
        const saveBlock = item.querySelector(".save-number__options");
        const correctBtn = document.querySelector('.correct-number__next-bth');

        save.addEventListener("click", function () {
            if (save.checked) {
                saveBlock.classList.add("visible");
                saveBlock.classList.remove("hidden");
                newNumberBlock.classList.add("hidden");
                newNumberBlock.classList.remove("visible");

                const number = document.querySelector('.correct-number__phone-number');
                correctBtn.innerHTML = number.value;
            }
        });

        newNumber.addEventListener("click", function () {
            if (newNumber.checked) {
                saveBlock.classList.remove("visible");
                saveBlock.classList.add("hidden");

                newNumberBlock.classList.remove("hidden");
                newNumberBlock.classList.add("visible");

                const activeNumberOne = item.querySelector('.phone-number__numbers input:checked');

                if(activeNumberOne){
                    correctBtn.innerHTML = activeNumberOne.value;
                }
            }
        })
    })
}

saveNumberNewNumberToggle();

document.querySelectorAll('.application-internet__options').forEach(item => {
    item.ApplicationInternet = new ApplicationInternet(item);
});

function ApplicationInternet(item) {
    this.item = item;
    this.button = this.item.querySelector('.application-internet__button');

    this.onClickButton = () => {
        if (this.item.classList.contains('application-internet__options_open')) {
            this.close();
        } else {
            this.open();
        }
    };

    //навешиваем функцию при событии click
    this.button.addEventListener('click', this.onClickButton);

    this.open = () => {
        this.item.classList.add('application-internet__options_open');
    };

    this.close = () => {
        this.item.classList.remove('application-internet__options_open');
    };
}

const pageBlockZero = document.querySelector('.block-zero');
const pageBlockOne = document.querySelector('.block-one');
const pageBlockTwo = document.querySelector('.block-two');
const pageBlockThree = document.querySelector('.block-three');
const pageBlockFour = document.querySelector('.block-four');

function calc(){
    //находим форму
    const form = document.querySelector('.form');
    const page = form.querySelectorAll('.additional-offer');
    const bucketZero = document.querySelector('.bucket__price-zero');
    const bucketOne = document.querySelector('.bucket__price-one');
    const bucketTwo = document.querySelector('.bucket__price-two');
    const bucketThree = document.querySelector('.bucket__price-three');
    const bucketFour = document.querySelector('.bucket__price-four');

    const bucket = document.querySelectorAll('.bucket-wrapper');
    const totalPrice = document.querySelector('[data-name="price"]');

    const infoAllPrice = document.querySelector('.price__data');
    page.forEach(item => {
        //находим все элементы калькулятора
        const block = item.querySelectorAll('.additional-offer__form-item');
        const priceValue =  item.querySelector('.price');
        //в каждом элементе калькулятора ищем функциональный элемент формы
        block.forEach(item => {
            const el = item.querySelectorAll('.additional-offer__form-el');
            //на каждый функциональный элемент формы навешиваем событие
            el.forEach(item => {
                item.addEventListener('input', () => calculator());

            });
        });

        function calculator(){
            let price = 0;

            //в каждом блоке ищем функциональный элемент формы
            block.forEach(item => {
                const el = item.querySelectorAll('.additional-offer__form-el');
                //проверяем каждый функц. эл. формы
                el.forEach(item => {
                    if (item.type !== 'checkbox' || item.type === 'checkbox' && item.checked) {
                        price += Number(item.value);
                    }
                });
            });
            //записываем цену в локальный калькулятор
            priceValue.innerHTML = price;
            if(item === pageBlockZero){
                //записываем цену в корзину
                bucketZero.innerHTML = price;
            }else if(item === pageBlockOne){
                bucketOne.innerHTML = price;
            }else if(item === pageBlockTwo){
                bucketTwo.innerHTML = price;
            }else if(item === pageBlockThree){
                bucketThree.innerHTML = price;
            }else if(item === pageBlockFour){
                bucketFour.innerHTML = price;
            }
        }
        calculator();
    });
    let sum = 0;
    //для каждого блока корзины
    bucket.forEach(item => {
        //если он не скрыт
        if(!item.classList.contains('hidden')){
            const price = item.querySelectorAll('.bucket__price');
            //добавляем цену, записанную в нем в переменную sum
            for(let i = 0; i < price.length; i++){
                sum += Number(price[i].innerHTML);
            }
        }
    });
    //записываем получившеееся значение в общую цену на стр с корзинами
    totalPrice.innerHTML = String(`${sum}`);

    //добавляем общую цену на стр со всеми данными
    infoAllPrice.innerHTML = String(`${sum}`);
}

calc();


//если на localhost
if (location.hostname === 'localhost') {
    //если есть хеш
    if (location.hash) {
        updatePage();
    }
} else {
    //если не localhost, то старт всегда с этого хеша
    location.hash = '#application-form';
}

//навешиваем функцию при изменении хеша(событие hashchange)
window.addEventListener("hashchange", () => {
    updatePage()
});

function updatePage() {
    //находим все страницы в документе
    const pages = document.querySelectorAll('.page');

    //используем метод substring чтобы избавиться от #
    const active = location.hash.substring(1);

    //проверяем каждую страницу
    pages.forEach(item => {

        // dataset === data-page в разметке
        if (item.dataset.page === active) {
            item.classList.add('page_active');
        } else {
            item.classList.remove('page_active');
        }
    })
}


//ф-ция проверки согласия на условия передачи ин-ции
function check() {
    //находим все страницы в документе
    const pages = document.querySelectorAll('.page');
    //для каждой стр
    pages.forEach(item => {
        const checkbox = item.querySelector('.condition__checkbox');
        const nextButton = item.querySelector('.form__next-btn');

        //проверяем чтобы кнопка согласия была активна
        if (nextButton !== null && checkbox) {

            // навешиваем на кнопку переключения стр событие клик
            nextButton.addEventListener('click', () => {
                //если галочка не стоит
                if (!checkbox.checked) {
                    //используем метод preventDefault() для отмены переключения стр
                    event.preventDefault();
                }
            })
        }


    })
}

check();


function testPhone() {
    //находим все импуты, где должны записываться только цифры
    const el = document.querySelectorAll(".form__phone-input");

    el.forEach(item => {
        item.addEventListener('click', () => {
            IMask(
                item, {
                    mask: '+{7}(000)000-00-00',
                    lazy: false
                });
        });

    });
}

testPhone();


function errorPhone(){
    const block = document.querySelectorAll('.form__phone');
    block.forEach(item => {
        const el = item.querySelector(".form__phone-input");
        const clear = item.querySelector('.js-clear-field');
        const filled = item.querySelector('.input-filled');
        const phoneError = item.querySelector(".js-phone-error");
        const incorrectPhoneMessage = "Некорректный номер телефона";
        const emptyPhoneMessage = "Необходимо указать номер телефона";

        phoneError.innerHTML = "";
        el.addEventListener("blur", e => {
            //разбиваем номер телефона на символы
            const str = el.value.split("");
            // если длина value === 11 с учетом только цифр(replace) и если 3-ий символ в номере равен 9
            if(el.value.replace(/[^0-9]/g, '').length === 11 && str[3] == 9){
                //то никакая надпись не выводится
                phoneError.innerHTML = "";
                //то добавляем класс скрывающий крестик
                clear.classList.add('display-none');
                //удаляем класс скрывающий галочку
                filled.classList.remove('display-none');
                //удаляем показывающий крестик
                clear.classList.remove('display-block');
                //добавляем класс показывающий галочку
                filled.classList.add('display-block');

                // снимаем с переменной класс, через метод класс-лист
                el.classList.remove("error-border");
                // добавляем класс к переменной через метод класс-лист
                el.classList.add("pseudo-hover");

            }else if(el.value === "+7("){
                phoneError.innerHTML = emptyPhoneMessage;
                // добавляем класс, через метод класс-лист
                el.classList.add("error-border");
                // снимаем с переменной класс через метод класс-лист
                el.classList.remove("pseudo-hover");
            }else if(str[3] == 9){
                phoneError.innerHTML = incorrectPhoneMessage;
                // добавляем класс, через метод класс-лист
                el.classList.add("error-border");
                // снимаем с переменной класс через метод класс-лист
                el.classList.remove("pseudo-hover");
            }else if(str[3] !== 9){
                phoneError.innerHTML = 'Некорректный код оператора';
                // добавляем класс, через метод класс-лист
                el.classList.add("error-border");
                // снимаем с переменной класс через метод класс-лист
                el.classList.remove("pseudo-hover");
            }
            clearCross();
        });
    })
}
errorPhone();



new Pikaday({
    field: document.getElementById('datepicker'),
    format: 'D/M/YYYY',
    disableDayFn: function(theDate) {
        return theDate < new Date();
    },
    toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const value = `${day}.${month}.${year}`;
        date.value = value;
        const block = document.getElementById('datepicker');
        block.value = value;
        if (block.value.length > 0) {
            block.classList.add("form__input-up");
        } else {
            block.classList.remove("form__input-up");
        }
        return value;

    },

});

function testData() {
    //находим все импуты, где должны записываться только цифры и .
    const el = document.querySelectorAll(".form__date-input");

    el.forEach(item => {
        // на каджый инпут навешиваем событие onkeyup
        // (возникает в момент отпускания нажатой клавиши)
        item.onkeyup = function test(){
            const value = item.value;

            const pattern = /[()&^$?/%#\!@;+_*=":'a-zA-Zа-яА-Я]/;

            //делаем проверку с помощью метода test
            //(выполняет поиск сопоставления)
            if(pattern.test(value)){
                //Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
                item.value = value.replace(pattern, '');
            }

        }
    })
}

testData();


function testText() {
    //находим все импуты, где должны записываться только буквы
    const el = document.querySelectorAll(".form__text-input");

    el.forEach(item => {
        //на каджый инпут навешиваем событие onkeyup
        //(возникает в момент отпускания нажатой клавиши)
        item.onkeyup = function Auto() {
            let value = item.value;

            //создаем объект для корректировки строки
            const replacer = {
                "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
                "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
                "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
                ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
                "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
            };

            let replace;

            //создаем цикл,чтобы не потерять длину
            for (let i = 0; i < value.length; i++) {

                //проверяем, что значемние value приобразованное в нижний регистр определено
                if (replacer[value[i].toLowerCase()] !== undefined) {

                    //если значение value в нижнем регистре
                    if (value[i] === value[i].toLowerCase()) {
                        //то в replace записывается значение value в низнем регистре
                        replace = replacer[value[i].toLowerCase()];
                    } else
                    // если значение value в верхнем регистре
                    if (value[i] === value[i].toUpperCase()) {
                        //то в replace записывается значение value в верхнем регистре
                        replace = replacer[value[i].toLowerCase()].toUpperCase();
                    }
                    // Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
                    item.value = value.replace(value[i], replace);
                }
            }
        }
    })
}

testText();

function testName() {
    const block = document.querySelector('.form__name');
    const allInfoName = document.querySelector('.name__data');
    const pageInviteFriend = document.querySelector('.bring-info__client-name');
    const name = block.querySelector('.form__name-input');
    const clear = block.querySelector('.js-clear-field');
    const filled = block.querySelector('.input-filled');
    name.onkeyup = function test(){
        const value = name.value;
        const pattern = /[()&^$?/%#\!@;+_*=":'0-9]/;
        //делаем проверку с помощью метода test
        //(выполняет поиск сопоставления)
        if(pattern.test(value)){
            //Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
            name.value = value.replace(pattern, '');
        }
        //создаем объект для корректировки строки
        const replacer = {
            "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
            "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
            "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
            ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
            "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
        };

        let replace;

        //создаем цикл,чтобы не потерять длину
        for (let i = 0; i < value.length; i++) {

            //проверяем, что значемние value приобразованное в нижний регистр определено
            if (replacer[value[i].toLowerCase()] !== undefined) {

                //если значение value в нижнем регистре
                if (value[i] === value[i].toLowerCase()) {
                    //то в replace записывается значение value в низнем регистре
                    replace = replacer[value[i].toLowerCase()];
                } else
                // если значение value в верхнем регистре
                if (value[i] === value[i].toUpperCase()) {
                    //то в replace записывается значение value в верхнем регистре
                    replace = replacer[value[i].toLowerCase()].toUpperCase();
                }
                // Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
                name.value = value.replace(value[i], replace);
            }
        }
    };
    name.addEventListener('blur', e => {
        const formatName =/[а-яА-ЯёЁ]+(-[а-яА-ЯёЁ]+)? [а-яА-ЯёЁ][а-яА-ЯёЁ]+( )?$/.test(name.value);
        const errorPlace = block.querySelector(".js-error-name");
        errorPlace.innerHTML = "";
        if(name.value.length > 0){
            if (formatName !== true) {
                if(!name.classList.contains('form__friends-name-input')){
                    // В переменную вставляем  строку
                    errorPlace.innerHTML = "Укажите Ваше ФИО";
                }else{
                    // В переменную вставляем  строку
                    errorPlace.innerHTML = "Укажите ФИО Вашего друга";
                }
                // добавляем класс к переменной через метод класс-лист
                name.classList.add("error-border");
                // снимаем с переменной класс, через метод класс-лист
                name.classList.remove("pseudo-hover");

            } else{
                // в переменную также вставляется строка, с пустым значениями
                errorPlace.innerHTML = "";
                // снимаем с переменной класс, через метод класс-лист
                name.classList.remove("error-border");
                // добавляем класс к переменной через метод класс-лист
                name.classList.add("pseudo-hover");

                //то добавляем класс скрывающий крестик
                clear.classList.add('display-none');
                //удаляем класс скрывающий галочку
                filled.classList.remove('display-none');
                //удаляем показывающий крестик
                clear.classList.remove('display-block');
                //добавляем класс показывающий галочку
                filled.classList.add('display-block');

                //добавляем значение на стр со всеми данными
                allInfoName.innerHTML = name.value;
                //добавляем значение в обращение на стр Пригласить друга
                pageInviteFriend.innerHTML = name.value;
            }
        }else{
            // В переменную вставляем  строку
            errorPlace.innerHTML = "Укажите Ваше ФИО";
            // добавляем класс к переменной через метод класс-лист
            name.classList.add("error-border");
            // снимаем с переменной класс, через метод класс-лист
            name.classList.remove("pseudo-hover");
            //то добавляем класс скрывающий крестик
            clear.classList.add('display-none');
            //удаляем показывающий крестик
            clear.classList.remove('display-block');
        }
        clearCross();
    })
}
testName();

function testFriendName() {
    const block = document.querySelector('.form__friend-name');
    const name = block.querySelector('.form__name-input');
    const clear = block.querySelector('.js-clear-field');
    const filled = block.querySelector('.input-filled');
    const allInfoFriendName = document.querySelector('.name-friends__data');
    name.onkeyup = function test(){
        const value = name.value;
        const pattern = /[()&^$?/%#\!@;+_*=":'0-9]/;
        //делаем проверку с помощью метода test
        //(выполняет поиск сопоставления)
        if(pattern.test(value)){
            //Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
            name.value = value.replace(pattern, '');
        }
        //создаем объект для корректировки строки
        const replacer = {
            "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
            "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
            "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
            ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
            "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
        };

        let replace;

        //создаем цикл,чтобы не потерять длину
        for (let i = 0; i < value.length; i++) {

            //проверяем, что значемние value приобразованное в нижний регистр определено
            if (replacer[value[i].toLowerCase()] !== undefined) {

                //если значение value в нижнем регистре
                if (value[i] === value[i].toLowerCase()) {
                    //то в replace записывается значение value в низнем регистре
                    replace = replacer[value[i].toLowerCase()];
                } else
                // если значение value в верхнем регистре
                if (value[i] === value[i].toUpperCase()) {
                    //то в replace записывается значение value в верхнем регистре
                    replace = replacer[value[i].toLowerCase()].toUpperCase();
                }
                // Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
                name.value = value.replace(value[i], replace);
            }
        }
    };
    name.addEventListener('blur', e => {
        const formatName = /[а-яА-ЯёЁ]/.test(name.value);
        const errorPlace = block.querySelector(".js-error-name");
        errorPlace.innerHTML = "";
        if(name.value.length > 0){
            if (formatName !== true || name.value.length < 3) {
                if(!name.classList.contains('form__friends-name-input')){
                    // В переменную вставляем  строку
                    errorPlace.innerHTML = "Укажите Ваше ФИО";
                }else{
                    // В переменную вставляем  строку
                    errorPlace.innerHTML = "Укажите ФИО Вашего друга";
                }
                // добавляем класс к переменной через метод класс-лист
                name.classList.add("error-border");
                // снимаем с переменной класс, через метод класс-лист
                name.classList.remove("pseudo-hover");

            } else{
                // в переменную также вставляется строка, с пустым значениями
                errorPlace.innerHTML = "";
                // снимаем с переменной класс, через метод класс-лист
                name.classList.remove("error-border");
                // добавляем класс к переменной через метод класс-лист
                name.classList.add("pseudo-hover");

                //то добавляем класс скрывающий крестик
                clear.classList.add('display-none');
                //удаляем класс скрывающий галочку
                filled.classList.remove('display-none');
                //удаляем показывающий крестик
                clear.classList.remove('display-block');
                //добавляем класс показывающий галочку
                filled.classList.add('display-block');

                //добавляем значение на стр со всеми данными
                allInfoFriendName.innerHTML = name.value;

            }
        }else{
            // В переменную вставляем  строку
            errorPlace.innerHTML = "Укажите ФИО Вашего друга";
            // добавляем класс к переменной через метод класс-лист
            name.classList.add("error-border");
            // снимаем с переменной класс, через метод класс-лист
            name.classList.remove("pseudo-hover");
            //то добавляем класс скрывающий крестик
            clear.classList.add('display-none');
            //удаляем показывающий крестик
            clear.classList.remove('display-block');
        }
        clearCross();
    })
}

testFriendName();


function errorRegion(){
    const block = document.querySelectorAll('.form__region');
    const allInfoRegionCity = document.querySelector('.region-city__data');
    const allInfoCountry = document.querySelector('.country__data');
    const allInfoRegion = document.querySelector('.region__data');
    const allInfoCity = document.querySelector('.city__data');
    const allInfoLocality = document.querySelector('.locality__data');
    const allInfoStreet = document.querySelector('.street__data');
    block.forEach(item => {
        const inputRegion = item.querySelectorAll('.form__text-input');
        const regionError = item.querySelector('.js-error-region');
        const clear = item.querySelector('.js-clear-field');
        const filled = item.querySelector('.input-filled');
        const arr = Array.from(inputRegion);
        arr.forEach(item => {
            item.onkeyup = function test(){
                const value = item.value;
                //создаем объект для корректировки строки
                const replacer = {
                    "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
                    "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
                    "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
                    ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
                    "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
                };

                let replace;

                //создаем цикл,чтобы не потерять длину
                for (let i = 0; i < value.length; i++) {

                    //проверяем, что значемние value приобразованное в нижний регистр определено
                    if (replacer[value[i].toLowerCase()] !== undefined) {

                        //если значение value в нижнем регистре
                        if (value[i] === value[i].toLowerCase()) {
                            //то в replace записывается значение value в низнем регистре
                            replace = replacer[value[i].toLowerCase()];
                        } else
                        // если значение value в верхнем регистре
                        if (value[i] === value[i].toUpperCase()) {
                            //то в replace записывается значение value в верхнем регистре
                            replace = replacer[value[i].toLowerCase()].toUpperCase();
                        }
                        // Метод replace() возвращает новую строку с сопоставлениями, заменёнными на заменитель
                        item.value = value.replace(value[i], replace);
                    }
                }
            };
            item.addEventListener('blur', e => {
                const formatRegion = /[а-яА-ЯёЁ]/.test(item.value);
                if(item.value.length > 0){
                    //если значение не соответствует заданному формату
                    if (formatRegion !== true || item.value.length < 2){
                        if(item.classList.contains('form__region-input')){
                            // В переменную вставляем  строку
                            regionError.innerHTML = "Укажите Ваш город или регион";
                        }else if(item.classList.contains('form__country-input')){
                            // В переменную вставляем  строку
                            regionError.innerHTML = "Укажите Вашу страну";
                        }else if(item.classList.contains('form__region-two-input')){
                            // В переменную вставляем  строку
                            regionError.innerHTML = "Укажите Ваш регион";
                        }else if(item.classList.contains('form__city-input')){
                            // В переменную вставляем  строку
                            regionError.innerHTML = "Укажите Ваш город";
                        }else if(item.classList.contains('form__locality-input')){
                            // В переменную вставляем  строку
                            regionError.innerHTML = "Укажите Ваш населенный пункт";
                        }else if(item.classList.contains('form__street-input')){
                            // В переменную вставляем  строку
                            regionError.innerHTML = "Укажите Вашу улицу";
                        }
                        // добавляем класс к переменной через метод класс-лист
                        item.classList.add("error-border");
                        // снимаем с переменной класс, через метод класс-лист
                        item.classList.remove("pseudo-hover");

                    } else {
                        // если значение вышеуказанного условия не истинно

                        if(item.classList.contains('form__region-input')){
                            //записываем значение на стр со всеми данными
                            allInfoRegionCity.innerHTML = item.value;
                        }else if(item.classList.contains('form__country-input')){
                            //записываем значение на стр со всеми данными
                            allInfoCountry.innerHTML = item.value;
                        }else if(item.classList.contains('form__region-two-input')){
                            //записываем значение на стр со всеми данными
                            allInfoRegion.innerHTML = item.value;
                        }else if(item.classList.contains('form__city-input')){
                            //записываем значение на стр со всеми данными
                            allInfoCity.innerHTML = item.value;
                        }else if(item.classList.contains('form__locality-input')){
                            //записываем значение на стр со всеми данными
                            allInfoLocality.innerHTML = item.value;
                        }else if(item.classList.contains('form__street-input')){
                            //записываем значение на стр со всеми данными
                            allInfoStreet.innerHTML = item.value;
                        }

                        // в переменную также вставляется строка, с другими значениями
                        regionError.innerHTML = "";
                        // снимаем с переменной класс, через метод класс-лист
                        item.classList.remove("error-border");
                        // добавляем класс к переменной через метод класс-лист
                        item.classList.add("pseudo-hover");

                        //то добавляем класс скрывающий крестик
                        clear.classList.add('display-none');
                        //удаляем класс скрывающий галочку
                        filled.classList.remove('display-none');
                        //удаляем показывающий крестик
                        clear.classList.remove('display-block');
                        //добавляем класс показывающий галочку
                        filled.classList.add('display-block');
                    }
                }else{
                    if(item.classList.contains('form__region-input')){
                        // В переменную вставляем  строку
                        regionError.innerHTML = "Укажите Ваш город или регион";
                    }else if(item.classList.contains('form__country-input')){
                        // В переменную вставляем  строку
                        regionError.innerHTML = "Укажите Вашу страну";
                    }else if(item.classList.contains('form__region-two-input')){
                        // В переменную вставляем  строку
                        regionError.innerHTML = "Укажите Ваш регион";

                    }else if(item.classList.contains('form__city-input')){
                        // В переменную вставляем  строку
                        regionError.innerHTML = "Укажите Ваш город";
                    }else if(item.classList.contains('form__locality-input')){
                        // В переменную вставляем  строку
                        regionError.innerHTML = "Укажите Ваш населенный пункт";
                    }else if(item.classList.contains('form__street-input')){
                        // В переменную вставляем  строку
                        regionError.innerHTML = "Укажите Вашу улицу";
                    }
                    // добавляем класс к переменной через метод класс-лист
                    item.classList.add("error-border");
                    // снимаем с переменной класс, через метод класс-лист
                    item.classList.remove("pseudo-hover");

                    //то добавляем класс скрывающий крестик
                    clear.classList.add('display-none');
                    //удаляем показывающий крестик
                    clear.classList.remove('display-block');
                }
                clearCross();
            })
        });

    })
}
errorRegion();

function  errorHouse() {
    const block = document.querySelector('.form__house');
    const house = block.querySelector('input');
    const textHouse = block.querySelector('.js-error-house');
    house.addEventListener('blur', e => {
        if(house.value.length > 0){
            // снимаем с переменной класс, через метод класс-лист
            house.classList.remove("error-border");
            // добавляем класс к переменной через метод класс-лист
            house.classList.add("pseudo-hover");
            textHouse.innerHTML = "";
        }else{
            //добавляем красную обвотку
            house.classList.add("error-border");
            //и снимаем класс, через метод класс-лист
            house.classList.remove("pseudo-hover");
            //добавляем текстовую подсказку
            textHouse.innerHTML = "Укажите № дома";
        }
        clearCross();
    })
}

errorHouse();


function hidingCross(){
    const block = document.querySelector('.form__wrapper__address');
    const el = block.querySelectorAll('.input-parent');
    //для каждого элемента (дом, квартира, строение, корпус)
    el.forEach(item => {
        const clear = item.querySelector('.js-clear-field');
        const field = item.querySelector('input');
        field.addEventListener('blur', e => {
            //удаляем показывающий крестик
            clear.classList.remove('display-block');
            //добавляем класс скрывающий крестик
            clear.classList.add('display-none');
        })
    })
}

hidingCross();

function testPostcode(){
    IMask(
        document.getElementById('regexp-mask'),
        {
            mask: /^[1-6]\d{0,5}$/
        });
}
testPostcode();

function errorPostcode(){
    const block = document.querySelector('.form__postcode');
    const inputPostcode = block.querySelector('.form__postcode-input');
    const postcodeError = block.querySelector('.js-error-postcode');
    const clear = block.querySelector('.js-clear-field');
    const filled = block.querySelector('.input-filled');

    const allInfoPostcode = document.querySelector('.postcode__data');
    inputPostcode.addEventListener('blur', event => {
        //если длина значения не равна 6
        if(inputPostcode.value.replace(/[^0-9]/g, '').length !== 6){
            // В переменную вставляем  строку
            postcodeError.innerHTML = "Неверный формат индекса";
            // добавляем класс к переменной через метод класс-лист
            inputPostcode.classList.add("error-border");
            // снимаем с переменной класс, через метод класс-лист
            inputPostcode.classList.remove("pseudo-hover");
        }else {
            // в переменную также вставляется строка, с другими значениями
            postcodeError.innerHTML = "";
            // снимаем с переменной класс, через метод класс-лист
            inputPostcode.classList.remove("error-border");
            // добавляем класс к переменной через метод класс-лист
            inputPostcode.classList.add("pseudo-hover");

            //то добавляем класс скрывающий крестик
            clear.classList.add('display-none');
            //удаляем класс скрывающий галочку
            filled.classList.remove('display-none');
            //удаляем показывающий крестик
            clear.classList.remove('display-block');
            //добавляем класс показывающий галочку
            filled.classList.add('display-block');

            //добавляем индекс на стр со всеми данными
            allInfoPostcode.innerHTML = inputPostcode.value;
        }
        clearCross();
    })

}
errorPostcode();

//селекты выбора ГБ
const internet = document.querySelectorAll('[data-name="internet"]');
const addMoreInternet = document.querySelectorAll('[data-name="add-more-internet"]');
const addMoreTwoInternet = document.querySelectorAll('[data-name="add-more-two-internet"]');
const addMoreThreeInternet = document.querySelectorAll('[data-name="add-more-three-internet"]');
const addMoreFourInternet = document.querySelectorAll('[data-name="add-more-four-internet"]');

//селекты выбора еоличества минут
const calls = document.querySelectorAll('[data-name="calls"]');
const addMoreCalls = document.querySelectorAll('[data-name="add-more-calls"]');
const addMoreTwoCalls = document.querySelectorAll('[data-name="add-more-two-calls"]');
const addMoreThreeCalls = document.querySelectorAll('[data-name="add-more-three-calls"]');
const addMoreFourCalls = document.querySelectorAll('[data-name="add-more-four-calls"]');

//чекбоксы Мессенджеры
const messengers = document.querySelectorAll('[data-name="messengers"]');
const addMoreMessengers = document.querySelectorAll('[data-name="add-more-messengers"]');
const addMoreTwoMessengers = document.querySelectorAll('[data-name="add-more-two-messengers"]');
const addMoreThreeMessengers = document.querySelectorAll('[data-name="add-more-three-messengers"]');
const addMoreFourMessengers = document.querySelectorAll('[data-name="add-more-four-messengers"]');

//чекбоксы Социальные сети
const social = document.querySelectorAll('[data-name="social"]');
const addMoreSocial = document.querySelectorAll('[data-name="add-more-social"]');
const addMoreTwoSocial = document.querySelectorAll('[data-name="add-more-two-social"]');
const addMoreThreeSocial = document.querySelectorAll('[data-name="add-more-three-social"]');
const addMoreFourSocial = document.querySelectorAll('[data-name="add-more-four-social"]');

//чекбоксы Музыка
const music = document.querySelectorAll('[data-name="music"]');
const addMoreMusic = document.querySelectorAll('[data-name="add-more-music"]');
const addMoreTwoMusic = document.querySelectorAll('[data-name="add-more-two-music"]');
const addMoreThreeMusic = document.querySelectorAll('[data-name="add-more-three-music"]');
const addMoreFourMusic = document.querySelectorAll('[data-name="add-more-four-music"]');

//чекбоксы Видео
const video = document.querySelectorAll('[data-name="video"]');
const addMoreVideo = document.querySelectorAll('[data-name="add-more-video"]');
const addMoreTwoVideo = document.querySelectorAll('[data-name="add-more-two-video"]');
const addMoreThreeVideo = document.querySelectorAll('[data-name="add-more-three-video"]');
const addMoreFourVideo = document.querySelectorAll('[data-name="add-more-four-video"]');

//чекбоксы Безлимитные СМС
const sms = document.querySelectorAll('[data-name="sms"]');
const addMoreSms = document.querySelectorAll('[data-name="add-more-sms"]');
const addMoreTwoSms = document.querySelectorAll('[data-name="add-more-two-sms"]');
const addMoreThreeSms = document.querySelectorAll('[data-name="add-more-three-sms"]');
const addMoreFourSms = document.querySelectorAll('[data-name="add-more-four-sms"]');

//номера телефонов, которые вводит пользователь в блоке "Сохранить номер"
const enterPhone = document.querySelectorAll('.enter-number');

//блоки выбора номера из списка
const blockNumber = document.querySelectorAll('.js-block1');
const addMoreBlockNumber = document.querySelectorAll('.add-more-js-block1');
const addMoreTwoBlockNumber = document.querySelectorAll('.add-more-two-js-block1');
const addMoreThreeBlockNumber = document.querySelectorAll('.add-more-three-js-block1');
const addMoreFourBlockNumber = document.querySelectorAll('.add-more-four-js-block1');

//место в корзине, куда записывать выбранные ГБ
const bucketInternet = document.querySelector('.bucket__internet');
const addMoreBucketInternet = document.querySelector('.bucket-new-number__internet');
const addMoreTwoBucketInternet = document.querySelector('.bucket-new-two-number__internet');
const addMoreThreeBucketInternet = document.querySelector('.bucket-new-three-number__internet');
const addMoreFourBucketInternet = document.querySelector('.bucket-new-four-number__internet');

//место в блоке со всеми данными, куда записывать выбранные ГБ
const allInfoInternet = document.querySelector('.transfer-number__internet-value');
const allInfoInternetOne = document.querySelector('.new-number__internet-value');
const allInfoInternetTwo = document.querySelector('.new-number-two__internet-value');
const allInfoInternetThree = document.querySelector('.new-number-three__internet-value');
const allInfoInternetFour = document.querySelector('.new-number-four__internet-value');

//место в корзине, куда записывать выбранные минуты
const bucketCalls = document.querySelector('.bucket__calls');
const addMoreBucketCalls = document.querySelector('.bucket-new-number__calls');
const addMoreTwoBucketCalls = document.querySelector('.bucket-new-two-number__calls');
const addMoreThreeBucketCalls = document.querySelector('.bucket-new-three-number__calls');
const addMoreFourBucketCalls = document.querySelector('.bucket-new-four-number__calls');

//место в блоке со всеми данными, куда записывать выбранные минуты
const allInfoCalls = document.querySelector('.transfer-number__calls-value');
const allInfoCallsOne = document.querySelector('.new-number__calls-value');
const allInfoCallsTwo = document.querySelector('.new-number-two__calls-value');
const allInfoCallsThree = document.querySelector('.new-number-three__calls-value');
const allInfoCallsFour = document.querySelector('.new-number-four__calls-value');

//место в корзине, куда записывать выбранные номера телефонов
const bucketPhone = document.querySelector('.options-menu__number-value');
const addMoreBucketPhone = document.querySelector('.options-menu__new-number-value');
const addMoreTwoBucketPhone = document.querySelector('.options-menu__new-number-two-value');
const addMoreThreeBucketPhone = document.querySelector('.options-menu__new-number-three-value');
const addMoreFourBucketPhone = document.querySelector('.options-menu__new-number-four-value');

//место в блоке со всеми данными, куда записывать выбранные номера телефонов
const allInfoPhone = document.querySelector('.transfer-number__number');
const allInfoNewPhone = document.querySelector('.new-number__number');
const allInfoNewPhoneTwo = document.querySelector('.new-number-two__number');
const allInfoNewPhoneThree = document.querySelector('.new-number-three__number');
const allInfoNewPhoneFour = document.querySelector('.new-number-four__number');

//место в корзине, куда записывать выбранные дополнительные услуги(смс, музыка и тд)
const bucketMoreValue = document.querySelector('.options-menu__more-value');
const bucketMoreOneValue = document.querySelector('.options-menu__more-one-value');
const bucketMoreTwoValue = document.querySelector('.options-menu__more-two-value');
const bucketMoreThreeValue = document.querySelector('.options-menu__more-three-value');
const bucketMoreFourValue = document.querySelector('.options-menu__more-four-value');

//место в блоке со всеми данными, куда записывать выбранные дополнительные услуги(смс, музыка и тд)
const allInfoValue = document.querySelector('.transfer-number__more-value');
const allInfoOneValue = document.querySelector('.new-number__more-value');
const allInfoTwoValue = document.querySelector('.new-number-two__more-value');
const allInfoThreeValue = document.querySelector('.new-number-three__more-value');
const allInfoFourValue = document.querySelector('.new-number-four__more-value');

//место в корзине, куда записывать цену выбранного номера
const bucketNumberZero = document.querySelector('.bucket__number-price-zero');
const bucketNumberOne = document.querySelector('.bucket__number-price-one');
const bucketNumberTwo = document.querySelector('.bucket__number-price-two');
const bucketNumberThree = document.querySelector('.bucket__number-price-three');
const bucketNumberFour = document.querySelector('.bucket__number-price-four');


NodeList.prototype.indexOf = Array.prototype.indexOf;

function valueTransfer(internet, addMoreInternet, addMoreTwoInternet, addMoreThreeInternet, addMoreFourInternet,
                       calls, addMoreCalls, addMoreTwoCalls, addMoreThreeCalls, addMoreFourCalls,
                       sms, addMoreSms, addMoreTwoSms, addMoreThreeSms, addMoreFourSms,
                       messengers, addMoreMessengers, addMoreTwoMessengers, addMoreThreeMessengers, addMoreFourMessengers,
                       social, addMoreSocial, addMoreTwoSocial, addMoreThreeSocial, addMoreFourSocial,
                       music, addMoreMusic, addMoreTwoMusic, addMoreThreeMusic, addMoreFourMusic,
                       video, addMoreVideo, addMoreTwoVideo, addMoreThreeVideo, addMoreFourVideo,
                       blockNumber, addMoreBlockNumber, addMoreTwoBlockNumber, addMoreThreeBlockNumber, addMoreFourBlockNumber,
                       enterPhone) {
    const items = [internet, addMoreInternet, addMoreTwoInternet, addMoreThreeInternet, addMoreFourInternet,
        calls, addMoreCalls, addMoreTwoCalls, addMoreThreeCalls, addMoreFourCalls,
        sms, addMoreSms, addMoreTwoSms, addMoreThreeSms, addMoreFourSms,
        messengers, addMoreMessengers, addMoreTwoMessengers, addMoreThreeMessengers, addMoreFourMessengers,
        social, addMoreSocial, addMoreTwoSocial, addMoreThreeSocial, addMoreFourSocial,
        music, addMoreMusic, addMoreTwoMusic, addMoreThreeMusic, addMoreFourMusic,
        video, addMoreVideo, addMoreTwoVideo, addMoreThreeVideo, addMoreFourVideo,
        blockNumber, addMoreBlockNumber, addMoreTwoBlockNumber, addMoreThreeBlockNumber, addMoreFourBlockNumber,
        enterPhone];
    items.forEach(select => {
        //для каждого элемента селеста(их всегда 2)
        select.forEach(item => {
            //для элемента сеелеста, навешиваем событие
            item.addEventListener('change', event => {
                //для каждого элемента селеста
                select.forEach(item => {
                    if (item.type === 'checkbox') {
                        //присваиваем элементу,тот checked, который имеется у элемента,
                        //который мы изменили в рамках события
                        item.checked = event.target.checked;
                        calc();
                    } else {
                        //присваиваем элементу,тот value, который имеется у элемента,
                        //который мы изменили в рамках события
                        item.value = event.target.value;
                    }
                });
                //блок со списком телефонных номеров
                if (select === blockNumber) {
                    const number = function () {
                        //в переменную записывается name измененного эл
                        const nameChange = event.target.name;
                        //в переменную записывается name другого эл
                        //находим этот name.
                        // если name измененного эл = numbers, то name другого эл = numbers-block1,
                        // если name измененного эл != numbers, то name другого эл = numbers
                        const nameOther = event.target.name === 'numbers' ? 'numbers-block1' : 'numbers';
                        //находим все эл блока, в котором было изменение
                        const numbersOne = document.querySelectorAll('input[name="' + nameChange + '"]');
                        //находим все эл другого блока
                        const numbersTwo = document.querySelectorAll('input[name="' + nameOther + '"]');
                        //находим эл :checked в блоке, в котором проихзошло изменение
                        const activeNumberOne = document.querySelector('input[name="' + nameChange + '"]:checked');
                        //находим индекс :checked элемента
                        const index = numbersOne.indexOf(activeNumberOne);
                        //делаем эл с таким же индексом в другом блоке :checked
                        numbersTwo[index].checked = true;

                        //находим все выбранные номера
                        const container = document.querySelectorAll(`[data-value="${activeNumberOne.value}"]`);
                        const arr = Array.from(container);
                        //удаляем первые 2 номера - в том блоке, в котором мы его выбрали и в корректирующем
                        arr.splice(0,2);
                        //для каждого такого номера в остальных блоках

                        arr.forEach(item => {
                            item.classList.add('display-none');
                        });

                        //кнопка с номером телефона
                        const correctBtn = document.querySelector('.correct-number__next-bth');

                        //в корзине номеров в инпут записываем значение :checked эл
                        bucketPhone.innerHTML = activeNumberOne.value;
                        //в кнопку с номером телефона записываем значение :checked эл
                        correctBtn.innerHTML = activeNumberOne.value;
                        //в корзине номеров в инпут записываем стоимость номера
                        bucketNumberZero.innerHTML = item.querySelector(`[value="${activeNumberOne.value}"]`).dataset.price;
                        //записываем значение на стр со всеми данными
                        allInfoPhone.innerHTML = activeNumberOne.value;
                        filter();
                        calc();
                    };
                    //значение меняется только после выполнения функции(event),
                    //поэтому, когда  number запускается, изменения еще не произошли
                    setTimeout(number, 100);
                }else if(select === addMoreBlockNumber){
                    const number = function () {
                        //в переменную записывается name измененного эл
                        const nameChange = event.target.name;
                        //в переменную записывается name другого эл
                        //находим этот name.
                        // если name измененного эл = numbers, то name другого эл = numbers-block1,
                        // если name измененного эл != numbers, то name другого эл = numbers
                        const nameOther = event.target.name === 'add-more-numbers' ? 'add-more-numbers-block1' : 'add-more-numbers';
                        //находим все эл блока, в котором было изменение
                        const numbersOne = document.querySelectorAll('input[name="' + nameChange + '"]');
                        //находим все эл другого блока
                        const numbersTwo = document.querySelectorAll('input[name="' + nameOther + '"]');
                        //находим эл :checked в блоке, в котором проихзошло изменение
                        const activeNumberOne = document.querySelector('input[name="' + nameChange + '"]:checked');
                        //находим индекс :checked элемента
                        const index = numbersOne.indexOf(activeNumberOne);
                        //делаем эл с таким же индексом в другом блоке :checked
                        numbersTwo[index].checked = true;

                        //находим все выбранные номера
                        const container = document.querySelectorAll(`[data-value="${activeNumberOne.value}"]`);
                        const arr = Array.from(container);
                        //удаляем первые 2 номера - в том блоке, в котором мы его выбрали и в корректирующем
                        //т.к addMoreBlockNumber второй блок, то его номера в общем списке будут 3,4 - их мы и удаляем
                        arr.splice(2,2);
                        arr.forEach(item => {
                            item.classList.add('display-none');
                        });

                        //кнопка с номером телефона
                        const correctBtn = document.querySelector('.correct-number__add-more-next-bth');
                        //в корзине номеров в инпут записываем значение :checked эл
                        addMoreBucketPhone.innerHTML = activeNumberOne.value;
                        //в кнопку с номером телефона записываем значение :checked эл
                        correctBtn.innerHTML = activeNumberOne.value;
                        //в корзине номеров в инпут записываем стоимость номера
                        bucketNumberOne.innerHTML = item.querySelector(`[value="${activeNumberOne.value}"]`).dataset.price;
                        //записываем значение на стр со всеми данными
                        allInfoNewPhone.innerHTML = activeNumberOne.value;
                        filter();
                        calc();
                    };
                    //значение меняется только после выполнения функции(event),
                    //поэтому, когда  number запускается, изменения еще не произошли
                    setTimeout(number, 100);
                }else if(select === addMoreTwoBlockNumber){
                    const number = function () {
                        //в переменную записывается name измененного эл
                        const nameChange = event.target.name;
                        //в переменную записывается name другого эл
                        //находим этот name.
                        // если name измененного эл = numbers, то name другого эл = numbers-block1,
                        // если name измененного эл != numbers, то name другого эл = numbers
                        const nameOther = event.target.name === 'add-more-numbers' ? 'add-more-numbers-block1' : 'add-more-numbers';
                        //находим все эл блока, в котором было изменение
                        const numbersOne = document.querySelectorAll('input[name="' + nameChange + '"]');
                        //находим все эл другого блока
                        const numbersTwo = document.querySelectorAll('input[name="' + nameOther + '"]');
                        //находим эл :checked в блоке, в котором проихзошло изменение
                        const activeNumberOne = document.querySelector('input[name="' + nameChange + '"]:checked');
                        //находим индекс :checked элемента
                        const index = numbersOne.indexOf(activeNumberOne);
                        //делаем эл с таким же индексом в другом блоке :checked
                        numbersTwo[index].checked = true;

                        const container = document.querySelectorAll(`[data-value="${activeNumberOne.value}"]`);
                        const arr = Array.from(container);
                        arr.splice(4,2);
                        arr.forEach(item => {
                            item.classList.add('display-none');
                        });
                        //кнопка с номером телефона
                        const correctBtn = document.querySelector('.correct-number__add-more-two-next-bth');
                        //в корзине номеров в инпут записываем значение :checked эл
                        addMoreTwoBucketPhone.innerHTML = activeNumberOne.value;
                        //в кнопку с номером телефона записываем значение :checked эл
                        correctBtn.innerHTML = activeNumberOne.value;
                        //в корзине номеров в инпут записываем стоимость номера
                        bucketNumberTwo.innerHTML = item.querySelector(`[value="${activeNumberOne.value}"]`).dataset.price;
                        //записываем значение на стр со всеми данными
                        allInfoNewPhoneTwo.innerHTML = activeNumberOne.value;
                        filter();
                        calc();
                    };
                    //значение меняется только после выполнения функции(event),
                    //поэтому, когда  number запускается, изменения еще не произошли
                    setTimeout(number, 100);
                }else if(select === addMoreThreeBlockNumber){
                    const number = function () {
                        //в переменную записывается name измененного эл
                        const nameChange = event.target.name;
                        //в переменную записывается name другого эл
                        //находим этот name.
                        // если name измененного эл = numbers, то name другого эл = numbers-block1,
                        // если name измененного эл != numbers, то name другого эл = numbers
                        const nameOther = event.target.name === 'add-more-numbers' ? 'add-more-numbers-block1' : 'add-more-numbers';
                        //находим все эл блока, в котором было изменение
                        const numbersOne = document.querySelectorAll('input[name="' + nameChange + '"]');
                        //находим все эл другого блока
                        const numbersTwo = document.querySelectorAll('input[name="' + nameOther + '"]');
                        //находим эл :checked в блоке, в котором проихзошло изменение
                        const activeNumberOne = document.querySelector('input[name="' + nameChange + '"]:checked');
                        //находим индекс :checked элемента
                        const index = numbersOne.indexOf(activeNumberOne);
                        //делаем эл с таким же индексом в другом блоке :checked
                        numbersTwo[index].checked = true;

                        const container = document.querySelectorAll(`[data-value="${activeNumberOne.value}"]`);
                        const arr = Array.from(container);
                        arr.splice(6,2);
                        arr.forEach(item => {
                            item.classList.add('display-none');
                        });

                        //кнопка с номером телефона
                        const correctBtn = document.querySelector('.correct-number__add-more-three-next-bth');
                        //в корзине номеров в инпут записываем значение :checked эл
                        addMoreThreeBucketPhone.innerHTML = activeNumberOne.value;
                        //в кнопку с номером телефона записываем значение :checked эл
                        correctBtn.innerHTML = activeNumberOne.value;
                        //в корзине номеров в инпут записываем стоимость номера
                        bucketNumberThree.innerHTML = item.querySelector(`[value="${activeNumberOne.value}"]`).dataset.price;
                        //записываем значение на стр со всеми данными
                        allInfoNewPhoneThree.innerHTML = activeNumberOne.value;
                        filter();
                        calc();
                    };
                    //значение меняется только после выполнения функции(event),
                    //поэтому, когда  number запускается, изменения еще не произошли
                    setTimeout(number, 100);
                }else if(select === addMoreFourBlockNumber){
                    const number = function () {
                        //в переменную записывается name измененного эл
                        const nameChange = event.target.name;
                        //в переменную записывается name другого эл
                        //находим этот name.
                        // если name измененного эл = numbers, то name другого эл = numbers-block1,
                        // если name измененного эл != numbers, то name другого эл = numbers
                        const nameOther = event.target.name === 'add-more-numbers' ? 'add-more-numbers-block1' : 'add-more-numbers';
                        //находим все эл блока, в котором было изменение
                        const numbersOne = document.querySelectorAll('input[name="' + nameChange + '"]');
                        //находим все эл другого блока
                        const numbersTwo = document.querySelectorAll('input[name="' + nameOther + '"]');
                        //находим эл :checked в блоке, в котором проихзошло изменение
                        const activeNumberOne = document.querySelector('input[name="' + nameChange + '"]:checked');
                        //находим индекс :checked элемента
                        const index = numbersOne.indexOf(activeNumberOne);
                        //делаем эл с таким же индексом в другом блоке :checked
                        numbersTwo[index].checked = true;

                        const container = document.querySelectorAll(`[data-value="${activeNumberOne.value}"]`);
                        const arr = Array.from(container);
                        arr.splice(8,2);
                        arr.forEach(item => {
                            item.classList.add('display-none');
                        });
                        //кнопка с номером телефона
                        const correctBtn = document.querySelector('.correct-number__add-more-four-next-bth');
                        //в корзине номеров в инпут записываем значение :checked эл
                        addMoreFourBucketPhone.innerHTML = activeNumberOne.value;
                        //в кнопку с номером телефона записываем значение :checked эл
                        correctBtn.innerHTML = activeNumberOne.value;
                        //в корзине номеров в инпут записываем стоимость номера
                        bucketNumberFour.innerHTML = item.querySelector(`[value="${activeNumberOne.value}"]`).dataset.price;
                        //записываем значение на стр со всеми данными
                        allInfoNewPhoneFour.innerHTML = activeNumberOne.value;
                        filter();
                        calc();
                    };
                    //значение меняется только после выполнения функции(event),
                    //поэтому, когда  number запускается, изменения еще не произошли
                    setTimeout(number, 100);
                }

                if(item.type !== 'checkbox'){
                    //номер телефона
                    const value = item.querySelector(`[value="${item.value}"]`).dataset.number;

                    if(select === internet){
                        //добавляем интернет первого номера в корзину
                        bucketInternet.innerHTML = value;
                        //добавляем интернет первого номера на стр со всеми данными
                        allInfoInternet.innerHTML = value;
                    }else if(select === calls){
                        //добавляем звонки первого номера в корзину
                        bucketCalls.innerHTML = value;
                        //добавляем звонки первого номера на стр со всеми данными
                        allInfoCalls.innerHTML = value;
                    }else if(select === addMoreInternet){
                        //добавляем интернет второго номера в корзину
                        addMoreBucketInternet.innerHTML = value;
                        //добавляем интернет второго номера на стр со всеми данными
                        allInfoInternetOne.innerHTML = value;
                    }else if(select === addMoreCalls){
                        //добавляем звонки второго номера в корзину
                        addMoreBucketCalls.innerHTML = value;
                        //добавляем звонки второго номера на стр со всеми данными
                        allInfoCallsOne.innerHTML = value;
                    }else if(select === addMoreTwoInternet){
                        //добавляем интернет третьего номера в корзину
                        addMoreTwoBucketInternet.innerHTML = value;
                        //добавляем интернет третьего номера на стр со всеми данными
                        allInfoInternetTwo.innerHTML = value;
                    }else if(select === addMoreTwoCalls){
                        //добавляем звонки третьего номера в корзину
                        addMoreTwoBucketCalls.innerHTML = value;
                        //добавляем звонки третьего номера на стр со всеми данными
                        allInfoCallsTwo.innerHTML = value;
                    }else if(select === addMoreThreeInternet){
                        //добавляем интернет четвертого номера в корзину
                        addMoreThreeBucketInternet.innerHTML = value;
                        //добавляем интернет четвертого номера на стр со всеми данными
                        allInfoInternetThree.innerHTML = value;
                    }else if(select === addMoreThreeCalls){
                        //добавляем звонки четвертого номера в корзину
                        addMoreThreeBucketCalls.innerHTML = value;
                        //добавляем звонки четвертого номера на стр со всеми данными
                        allInfoCallsThree.innerHTML = value;
                    }else if(select === addMoreFourInternet){
                        //добавляем интернет пятого номера в корзину
                        addMoreFourBucketInternet.innerHTML = value;
                        //добавляем интернет пятого номера на стр со всеми данными
                        allInfoInternetFour.innerHTML = value;
                    }else if(select === addMoreFourCalls){
                        //добавляем звонки пятого номера в корзину
                        addMoreFourBucketCalls.innerHTML = value;
                        //добавляем звонки пятого номера на стр со всеми данными
                        allInfoCallsFour.innerHTML = value;
                    }
                    setTimeout(() => calc(), 100);
                }else{
                    //если это чекбокс
                    //если эти чекбоксы относятся к первому номеру
                    if(item.classList.contains('block-zero__checkbox')){
                        //находим все отмеченные доп услуги(видео,музыку)
                        const moreZero = pageBlockZero.querySelectorAll('input:checked');
                        bucketMoreValue.innerHTML = '';
                        allInfoValue.innerHTML = '';

                        for(let i = 0; i < moreZero.length; i++){
                            //если выбранный чекбокс 1
                            if(i === 0){
                                bucketMoreValue.innerHTML += moreZero[i].dataset.number;
                                allInfoValue.innerHTML += moreZero[i].dataset.number;

                            }else{
                                //если выбранный чекбокс не 1, то добавляем запятную
                                bucketMoreValue.innerHTML += ', ' + moreZero[i].dataset.number;
                                allInfoValue.innerHTML += ', ' + moreZero[i].dataset.number;

                            }
                        }
                    }else if(item.classList.contains('block-one__checkbox')){
                        //если эти чекбоксы относятся ко первому номеру
                        //находим все отмеченные доп услуги(видео,музыку)
                        const moreOne = pageBlockOne.querySelectorAll('input:checked');
                        bucketMoreOneValue.innerHTML = '';
                        allInfoOneValue.innerHTML = '';
                        for(let i = 0; i < moreOne.length; i++){
                            if(i === 0){
                                bucketMoreOneValue.innerHTML += moreOne[i].dataset.number;
                                allInfoOneValue.innerHTML += moreOne[i].dataset.number;

                            }else{
                                bucketMoreOneValue.innerHTML += ', ' + moreOne[i].dataset.number;
                                allInfoOneValue.innerHTML += ', ' + moreOne[i].dataset.number;

                            }
                        }
                    }else if(item.classList.contains('block-two__checkbox')){
                        //если эти чекбоксы относятся к третьему  номеру
                        //находим все отмеченные доп услуги(видео,музыку)
                        const moreTwo = pageBlockTwo.querySelectorAll('input:checked');
                        bucketMoreTwoValue.innerHTML = '';
                        allInfoTwoValue.innerHTML = '';
                        for(let i = 0; i < moreTwo.length; i++){
                            if(i === 0){
                                bucketMoreTwoValue.innerHTML += moreTwo[i].dataset.number;
                                allInfoTwoValue.innerHTML += moreTwo[i].dataset.number;

                            }else{
                                bucketMoreTwoValue.innerHTML += ', ' + moreTwo[i].dataset.number;
                                allInfoTwoValue.innerHTML += ', ' + moreTwo[i].dataset.number;

                            }
                        }
                    }else if(item.classList.contains('block-three__checkbox')){
                        //если эти чекбоксы относятся к четвертому номеру
                        //находим все отмеченные доп услуги(видео,музыку)
                        const moreThree = pageBlockThree.querySelectorAll('input:checked');
                        bucketMoreThreeValue.innerHTML = '';
                        allInfoThreeValue.innerHTML = '';
                        for(let i = 0; i < moreThree.length; i++){
                            if(i === 0){
                                bucketMoreThreeValue.innerHTML += moreThree[i].dataset.number;
                                allInfoThreeValue.innerHTML += moreThree[i].dataset.number;

                            }else{
                                bucketMoreThreeValue.innerHTML += ', ' + moreThree[i].dataset.number;
                                allInfoThreeValue.innerHTML += ', ' + moreThree[i].dataset.number;

                            }
                        }
                    }else if(item.classList.contains('block-four__checkbox')){
                        //если эти чекбоксы относятся к пятому номеру
                        //находим все отмеченные доп услуги(видео,музыку)
                        const moreFour = pageBlockFour.querySelectorAll('input:checked');
                        bucketMoreFourValue.innerHTML = '';
                        allInfoFourValue.innerHTML = '';
                        for(let i = 0; i < moreFour.length; i++){
                            if(i === 0){
                                bucketMoreFourValue.innerHTML += moreFour[i].dataset.number;
                                allInfoFourValue.innerHTML += moreFour[i].dataset.number;

                            }else{
                                bucketMoreFourValue.innerHTML += ', ' + moreFour[i].dataset.number;
                                allInfoFourValue.innerHTML += ', ' + moreFour[i].dataset.number;

                            }
                        }
                    }
                }
            });
        })
    })
}

valueTransfer(internet, addMoreInternet, addMoreTwoInternet, addMoreThreeInternet, addMoreFourInternet,
    calls, addMoreCalls, addMoreTwoCalls, addMoreThreeCalls, addMoreFourCalls,
    sms, addMoreSms, addMoreTwoSms, addMoreThreeSms, addMoreFourSms,
    messengers, addMoreMessengers, addMoreTwoMessengers, addMoreThreeMessengers, addMoreFourMessengers,
    social, addMoreSocial, addMoreTwoSocial, addMoreThreeSocial, addMoreFourSocial,
    music, addMoreMusic, addMoreTwoMusic, addMoreThreeMusic, addMoreFourMusic,
    video, addMoreVideo, addMoreTwoVideo, addMoreThreeVideo, addMoreFourVideo,
    blockNumber, addMoreBlockNumber, addMoreTwoBlockNumber, addMoreThreeBlockNumber, addMoreFourBlockNumber,
    enterPhone);



//выделяет избранное
function paintingStars() {
    //блок с номерами
    const block = document.querySelectorAll('.new-number__options');

    // для каждого блока
    block.forEach(item => {
        //находим все контейнеры номеров
        const container = item.querySelectorAll('.phone-number__numbers-container');
        //находим кнопку "Показать избранное"
        const favoritesNumbers = item.querySelector('.favorites-btn');

        //для каждого контейнера
        container.forEach(item => {
            //находим звезду
            const star = item.querySelector('.phone-number__price');
            //находим чекбокс относящийся к звезде
            const checkbox = item.querySelector('input[type="checkbox"]');

            //при клике на этот чекбокс
            checkbox.addEventListener('click', () => {
                //добавляем метод toggle. Если класс color есть, он удаляется, если нет, то добавляется;
                star.classList.toggle('color');

                //вызываес функцию,находящуюся ниже
                favorites();
                //если у звезды есть класс color
                const starActive = star.classList.contains('color');
                //если кнопка "Показать избранное" активна
                const active = favoritesNumbers.classList.contains('active');

                //если при клике на чекбок звезды, цвет убирается снимается и мы находимся в блоке "только фавориты"
                if (active && !starActive) {
                    //то скрываем номер, у которого сняли звезду
                    item.classList.add('hidden');
                }
            })
        })
    })
}

paintingStars();


//активирует кнопку "показать избранное"
function favorites() {
    //блок "новый номер"
    const block = document.querySelectorAll('.new-number__options');

    //для каждого блока
    block.forEach(item => {
        //блок со списком номеров
        const blockNumbers = item.querySelector('.phone-number__numbers');
        //контейнер номера
        const container = blockNumbers.querySelectorAll('.phone-number__numbers-container');
        //кнопка "Показать избранное"
        const favoritesNumbers = item.querySelector('.favorites-btn');
        //части кнопки (текст + звездочка)
        const favoritesName = favoritesNumbers.querySelectorAll('.favorites-items');
        //кнопка "Следующие"
        const nextNumbers = item.querySelector('.numbers-scroller__show-next');
        const nextNumbersItems = nextNumbers.querySelectorAll('.favorites-items');
        // кнопка "Предыдущие"
        const prevNumbers = item.querySelector('.numbers-scroller__show-prev');
        const prevNumbersItem = prevNumbers.querySelectorAll('.favorites-items');

        const arr = Array.from(container);
        //отфильтровываем номера, которые еще не были выбранны
        const availableNumbers = arr.filter(function(item){
            //если нет класса display-none
            if(item.classList.contains('display-none') !== true){
                return item;
            }
        });

        //ф-ция для метода some
        function stars(el) {
            //возвращает элементы у которых есть активные чекбоксы
            return el.querySelector('input[type="checkbox"]:checked');
        }

        //проверяем,что в отфильтрованных номерах есть хотя бы один активный чекбокс звездочки
        if (availableNumbers.some(stars) === true) {
            //для каждого элемента кнопки "Показать избранное"
            favoritesName.forEach(item => {
                //удаляем обесцвечивающий класс
                item.classList.remove('favorites');
                //снимаем блокировку события
                favoritesNumbers.classList.remove('removal');
            })
        } else {//если ни одного избранного номера нет, то
            //для отфильтрованных номеров
            for (let i = 0; i < availableNumbers.length; i++) {
                //для первых 7
                if (i < 7) {
                    //удаляем, скрывающий класс с первых 7 номеров
                    availableNumbers[i].classList.remove('hidden');
                } else {
                    //добавляем всем остальным
                    availableNumbers[i].classList.add('hidden');
                }
            }
            //снимаем блокировку события с кнопки "предыдущие"
            prevNumbers.classList.remove('removal');
            //снимаем блокировку события с кнопки "следующие"
            nextNumbers.classList.remove('removal');

            //у каждого элемента кнопки "следующие"
            nextNumbersItems.forEach(item => {
                //удаляем обесцвечивающий класс
                item.classList.remove('favorites');
            });

            //для каждого элемента кнопки "показать избранное"
            favoritesName.forEach(item => {
                //класс добавляющийся,когда показываются только избранные номера и мы его удаляем
                //это для развития событий, когда мы находимся в блоке только избранных номеров и нажимая на звездочки удаляем все номера
                favoritesNumbers.classList.remove('active');
                //добавляем обесцвечивающий класс
                item.classList.add('favorites');
                //добавляем блокировку события
                favoritesNumbers.classList.add('removal');

            });

            //находим элементы кнопки "показать избранное"
            //это для развития событий, когда мы находимся в блоке только избранных номеров и нажимая на звездочки удаляем все номера
            for (let i = 0; i < favoritesName.length; i++) {
                //для первого элемента
                if (i === 0) {
                    //меняем текст
                    favoritesName[i].innerHTML = "Показать избранное";
                } else if (i === 1) {
                    //у второго удаляем скрывающий класс
                    favoritesName[i].classList.remove('hidden');
                }
            }
        }
    });
    filter();
}

// //активация/блокировка кнопок переключения номеров
// //что происходит при нажатии "показать избранное"
function onlyFavorites() {
    //блок "Получить новый номер"
    const block = document.querySelectorAll('.new-number__options');

    block.forEach(item => {
        //поле поиска по цифрам
        const search = item.querySelector('.form__search-by-numbers-input');
        //поле поиска по цене
        const price = item.querySelector('.form__price-input');
        //блок с номерами
        const numbers = item.querySelector('.phone-number__numbers-block1');
        //контейнер номера
        const elem = numbers.querySelectorAll('.phone-number__numbers-container');
        //кнопка "Следующие"
        const nextNumbersBtn = item.querySelector('.numbers-scroller__show-next');
        //части кнопки"Следующие"
        const nextNumbersBtnItems = nextNumbersBtn.querySelectorAll('.favorites-items');
        // кнопка "Предыдущие"
        const prevNumbersBtn = item.querySelector('.numbers-scroller__show-prev');
        const prevNumbersBtnItems = prevNumbersBtn.querySelectorAll('.favorites-items');
        //кнопка "Показать избранное"
        const showFavorites = item.querySelector('.favorites-btn');
        const showFavoritesItems = showFavorites.querySelectorAll('.favorites-items');

        const arr = Array.from(elem);

        //отфильтровываем номера, которые еще не были выбранны
        const availableNumbers = arr.filter(function(item){
            if(item.classList.contains('display-none') !== true){
                return true;
            }
        });

        //показываем первые 7, остальные скрываем
        for(let i = 0; i < availableNumbers.length; i++){
            if(i < 7){
                availableNumbers[i].classList.remove('hidden');
            }else if(i >= 7){
                availableNumbers[i].classList.add('hidden');
            }
        }

        //для каждого элемента кнопки "следующие"
        nextNumbersBtnItems.forEach(item => {
            //добавляем выделяющий класс
            item.classList.remove('favorites');
        });

        //у кнопки "следующие" удаляем класс, блокирующий события
        nextNumbersBtn.classList.remove('removal');

        //для каждого элемента кнопки "предыдущие"
        prevNumbersBtnItems.forEach(item => {
            //добавляем обесцвечивающий класс
            item.classList.add('favorites');
        });

        //для кнопки  "предыдущие" добавляем класс, блокирующий события
        prevNumbersBtn.classList.add('removal');


        //при нажатии на "следующие"
        nextNumbersBtn.addEventListener('click', () => {

            numbersPage = 1;

            //скрываем первые 7 и показываем след 7
            for(let i = 0; i < availableNumbers.length; i++){
                if(i < 7){
                    availableNumbers[i].classList.add('hidden');
                }else if(i >= 7 && i < 14){
                    availableNumbers[i].classList.remove('hidden');
                }
            }
            //для каждого элемента кнопки "следующие"
            nextNumbersBtnItems.forEach(item => {
                //добавляем обесцвечивающий класс
                item.classList.add('favorites');
            });

            //для кнопки "следующие" добавляем класс, блокирующий события
            nextNumbersBtn.classList.add('removal');

            //для каждого элемента кнопки "предыдущие"
            prevNumbersBtnItems.forEach(item => {
                //добавляем выделяющий класс
                item.classList.remove('favorites');
            });
            //у кнопки "предыдущие" удаляем класс, блокирующий события
            prevNumbersBtn.classList.remove('removal');

        });

        //при нажатии на "предыдущие"
        prevNumbersBtn.addEventListener('click', () => {
            numbersPage = 0;
            //показываем первые 7, остальные скрываем
            for(let i = 0; i < availableNumbers.length; i++){
                if(i < 7){
                    availableNumbers[i].classList.remove('hidden');
                }else if(i >= 7){
                    availableNumbers[i].classList.add('hidden');
                }
            }
            //для каждого элемента кнопки "предыдущие"
            prevNumbersBtnItems.forEach(item => {
                //добавляем обесцвечивающий класс
                item.classList.add('favorites');
            });
            //для кнопки  "предыдущие" добавляем класс, блокирующий события
            prevNumbersBtn.classList.add('removal');

            //для каждого элемента кнопки "следующие"
            nextNumbersBtnItems.forEach(item => {
                //добавляем выделяющий класс
                item.classList.remove('favorites');
            });
            //у кнопки "следующие" удаляем класс, блокирующий события
            nextNumbersBtn.classList.remove('removal');

        });

        search.addEventListener('input', () => filter());
        price.addEventListener('input', () => filter());

        //при нажатии "показать избранное"
        showFavorites.addEventListener('click', e => {

            //если имеется класс active
            if (showFavorites.classList.contains('active')) {

                //снимаем блокировку события с кнопки "предыдущие"
                prevNumbersBtn.classList.remove('removal');
                //снимаем блокировку события с кнопки "следующие"
                nextNumbersBtn.classList.remove('removal');

                //у каждого элемента кнопки "следующие"
                nextNumbersBtnItems.forEach(item => {
                    //удаляем обесцвечивающий класс
                    item.classList.remove('favorites');
                });

                //находим элементы кнопки "показать избранное"
                for (let i = 0; i < showFavoritesItems.length; i++) {
                    //для первого элемента
                    if (i === 0) {
                        //меняем текст
                        showFavoritesItems[i].innerHTML = "Показать избранное";
                    } else if (i === 1) {
                        //у второго удаляем скрывающий класс
                        showFavoritesItems[i].classList.remove('hidden');
                    }
                }

                //у кнопки "показать избранное" удаляем класс active
                showFavorites.classList.remove('active');
                filter();

            } else {//если класса active нет

                //для каждого номера
                availableNumbers.forEach(item => {
                    //находим чекбокс звездочки
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    //номер скрыт
                    const result = item.classList.contains('hidden');

                    //если чекбокс активен и номер скрыт
                    if (checkbox.checked && result === true) {
                        //то удаляем класс, скрывающий блок
                        item.classList.remove('hidden');
                    } else if(!checkbox.checked && result === false) {
                        //если чекбокс не активен и блок не скрыт
                        //то добавляем класс, скрывающий блок
                        item.classList.add('hidden');
                    }
                });
                //для кнопки  "предыдущие" добавляем класс, блокирующий события
                prevNumbersBtn.classList.add('removal');
                //для кнопки  "следующие" добавляем класс, блокирующий события
                nextNumbersBtn.classList.add('removal');

                //для каждого элемента кнопки "следующие"
                nextNumbersBtnItems.forEach(item => {
                    //добавляем обесцвечивающий класс
                    item.classList.add('favorites');
                });

                //для каждого элемента кнопки "предыдущие"
                prevNumbersBtnItems.forEach(item => {
                    //добавляем обесцвечивающий класс
                    item.classList.add('favorites');
                });

                //находим элементы кнопки "показать избранное"
                for (let i = 0; i < showFavoritesItems.length; i++) {
                    //для первого элемента
                    if (i === 0) {
                        //меняем текст
                        showFavoritesItems[i].innerHTML = "Показать все номера";
                    } else if (i === 1) {
                        //у второго добавляем скрывающий класс
                        showFavoritesItems[i].classList.add('hidden');
                    }
                }

                //кнопке "показать избранное" добавляем класс active
                showFavorites.classList.add('active');
            }
        });
    });
}

onlyFavorites();


//нужна для своевременного обновления списка номеров, если в первом блоке будет выбран номер из списка,то он скроется
function numbersUpdate(){
    //кнопка "Оформить" в самом первом блоке номеров
    const btn = document.getElementById('first-number-next-btn');

    btn.addEventListener('click', e => {
        numbersPage = 0;
        onlyFavorites();
    })

}
numbersUpdate();

//показывает корзины номеров
function newNumber() {
    //кнопка ДОБАВИТЬ ЕЩЕ ОДИН НОМЕР ТЕЛЕФОНА
    const addBtn = document.querySelector('.numbers-bucket__btn-wrapper');
    const block1 = document.querySelector('.bucket-new-number');
    const block2 = document.querySelector('.bucket-new-two-number');
    const block3 = document.querySelector('.bucket-new-three-number');
    const block4 = document.querySelector('.bucket-new-four-number');

    addBtn.addEventListener('click', event =>{
        numbersPage = 0;
        //стр с корзинами
        const wrap = document.querySelector('.numbers-bucket__content');
        //скрытая корзина
        const bucket = wrap.querySelector('.hidden');
        if(bucket === block1){
            addBtn.href = "#add-more-service";
            const pageNumber = document.querySelector('[data-page="add-more-number"]');
            const btn = pageNumber.querySelector('.phone-number__next-btn');
            //при клике на  "Оформить"
            btn.addEventListener('click', event =>{
                //корзина перестает быть скрытой
                block1.classList.remove('hidden');
                //происходит обновление списка номеров
                onlyFavorites();
            })
        }else if(bucket === block2){
            addBtn.href = "#add-more-two-service";
            const pageNumber = document.querySelector('[data-page="add-more-two-number"]');
            const btn = pageNumber.querySelector('.phone-number__next-btn');
            btn.addEventListener('click', event =>{
                block2.classList.remove('hidden');
                onlyFavorites();
            })
        }else if(bucket === block3){
            addBtn.href = "#add-more-three-service";
            const pageNumber = document.querySelector('[data-page="add-more-three-number"]');
            const btn = pageNumber.querySelector('.phone-number__next-btn');
            btn.addEventListener('click', event =>{
                block3.classList.remove('hidden');
                onlyFavorites();
            })
        }else if(bucket === block4){
            addBtn.href = "#add-more-four-service";
            const pageNumber = document.querySelector('[data-page="add-more-four-number"]');
            const btn = pageNumber.querySelector('.phone-number__next-btn');
            btn.addEventListener('click', event =>{
                block4.classList.remove('hidden');
                onlyFavorites();
            })
        }
    });
}

newNumber();

//при нажатии на крестик на корзине номера
function newNumberCross() {
    //все корзины номеров
    const bucket = document.querySelectorAll('.bucket-wrapper');
    bucket.forEach(item => {
        //крестик
        const cross = item.querySelector('.close-block');
        //если крестик есть
        if(cross !== null){
            //то при нажатии на него
            cross.addEventListener('click', e => {
                let blockServices = '';
                let blockNumbers = '';
                if(item.classList.contains('bucket-new-number')){
                    blockServices = document.querySelector('.add-more-service');
                    blockNumbers = document.querySelector('.add-more-number');
                }else if(item.classList.contains('bucket-new-two-number')){
                    blockServices = document.querySelector('.add-more-two-service');
                    blockNumbers = document.querySelector('.add-more-two-number');
                }if(item.classList.contains('bucket-new-three-number')){
                    blockServices = document.querySelector('.add-more-three-service');
                    blockNumbers = document.querySelector('.add-more-three-number');
                }if(item.classList.contains('bucket-new-four-number')){
                    blockServices = document.querySelector('.add-more-four-service');
                    blockNumbers = document.querySelector('.add-more-four-number');
                }
                const internet = blockServices.querySelector('.form__internet-input');
                const calls = blockServices.querySelector('.form__calls-input');
                const messenger = blockServices.querySelector('.application-internet__options-messenger');
                const social = blockServices.querySelector('.application-internet__options-social');
                const music = blockServices.querySelector('.application-internet__options-music');
                const video = blockServices.querySelector('.application-internet__options-video');
                const sms = blockServices.querySelector('.application-internet__options-sms');
                const arr = [messenger, social, music, video, sms];
                const numbersWrap = blockNumbers.querySelectorAll('input[type="radio"]');

                //в инпуте интернет выбираем 2 опцию
                internet.options[1].selected = true;
                //в инпуте звонки выбираем 1 опцию
                calls.options[0].selected = true;

                //делаем невыбранными все чекеты
                arr.forEach(item => {
                    item.checked = false;
                });
                //делаем невыбранными все номреа
                numbersWrap.forEach(item => {
                    item.checked = false;
                });
                //скрываем корзину
                item.classList.add('hidden');
            })
        }
    })
}

newNumberCross();

//принятие условий
function conditionError() {
    const block = document.querySelectorAll('.condition');
    block.forEach(item => {
        const text = item.querySelector('.js-error__checkbox');
        const checkbox = item.querySelector('.condition__checkbox');
        //при клике на чекбокс с условиями
        checkbox.addEventListener('click', event => {
            if (checkbox.checked !== true) {
                //меняется цвет
                checkbox.classList.add('condition__error');
                //появляется текст
                text.classList.remove('hidden');
            } else {
                checkbox.classList.remove('condition__error');
                text.classList.add('hidden');
            }
        });
    })
}

conditionError();


function number() {
    //блок выбора номера
    const block = document.querySelectorAll('.container-phone-number');

    const allInfoContactNumber = document.querySelector('.contact-number__data');
    const allInfoNumberFriend = document.querySelector('.contact-number-friends__data');

    const contactPhone = document.getElementById('phone');
    const contactPhoneFriend = document.getElementById('friend-phone');

    block.forEach(item => {
        //блок "Сохранить номер" в выборе номера
        const saveNumber = item.querySelector('.phone-number__save-number');
        //enterPhone - номера телефонов, которые вводит пользователь в блоке "Сохранить номер"
        enterPhone.forEach(item => {
            //при клике на кнопку далее в блоке с выбором телефона
            item.addEventListener('change', event => {
                const correctBtn = document.querySelector('.correct-number__next-bth');
                //если выбран "Сохранить номер"
                if(saveNumber.checked === true){
                    //то в корзине номеров в инпут записываем значение введенное пользователем
                    bucketPhone.innerHTML = item.value;
                    //в кнопку с номером телефона записываем значение введенное пользователем
                    correctBtn.innerHTML = item.value;
                    //добавляем номер на стр со всеми данными
                    allInfoPhone.innerHTML = item.value;
                }
            })
        })
    });

    //контактный телефон
    contactPhone.addEventListener('change', e => {
        //добавляем номер на стр со всеми данными
        allInfoContactNumber.innerHTML = contactPhone.value;
        //подтягиваем контактный номер пользователя в выбор номера
        enterPhone.forEach(item => {
            item.value = contactPhone.value;
        })
    });
    //контактный телефон друга
    contactPhoneFriend.addEventListener('change', e => {
        //добавляем номер на стр со всеми данными
        allInfoNumberFriend.innerHTML = contactPhoneFriend.value;
    })

}

number();


//очищение поля при нажатии на крестик
function clearInput(){
    //контейнеры инпутов
    const blocks = document.querySelectorAll('.input-parent');
    blocks.forEach(item => {
        //крустик
        const clear = item.querySelector('.js-clear-field');
        //если у поля есть крестик
        if(clear !== null){
            //при нажатии на крестик
            clear.onmousedown = function(event){
                //само поле
                const field = item.querySelector('.js-ascent-text');
                //если поле номера
                if(field.classList.contains('form__phone-input')){
                    //то оставляем семерку
                    field.value="+7(";
                    //удаляем показывающий крестик
                    clear.classList.remove('display-block');
                    //то добавляем класс скрывающий крестик
                    clear.classList.add('display-none');
                }else if(field.classList.contains('form__search-by-numbers-input') || field.classList.contains('form__price-input')){
                    //если это поля фильтрации номеров(Поиск по цифрам и Стоимость)
                    field.value="";
                    //удаляем показывающий крестик
                    clear.classList.remove('display-block');
                    //то добавляем класс скрывающий крестик
                    clear.classList.add('display-none');
                    filter();
                }else{
                    //если другое поле, то стираем все
                    field.value="";
                    //удаляем показывающий крестик
                    clear.classList.remove('display-block');
                    //то добавляем класс скрывающий крестик
                    clear.classList.add('display-none');
                }

                //если в поле, что-то написано
                if (field.value.length > 0) {
                    //то текст наверх
                    field.classList.add("form__input-up");
                } else {
                    //если нет, то вниз
                    field.classList.remove("form__input-up");
                }
            }
        }

    });
}
clearInput();


function clearCross(){
    const blocks = document.querySelectorAll('.input-parent');
    //для каждого инпута
    blocks.forEach(item => {
        //крестик
        const clear = item.querySelector('.js-clear-field');
        //галочка
        const filled = item.querySelector('.input-filled');

        //если у инпута предусмотрен очищающий крестик и галочка
        if(clear !== null && filled !== null){
            //то находим инпут
            const field = item.querySelector('.js-ascent-text');
            //если инпут в фокусе
            field.addEventListener('focus', e => {
                // то добавляем класс показывающий крестик
                clear.classList.add('display-block');
                //удаляем класс скрывающий крестик
                clear.classList.remove('display-none');

                //удаляем класс показывающий галочку
                filled.classList.remove('display-block');
                //добавляем класс скрывающий галочку
                filled.classList.add('display-none');
            });
        }else if(clear !== null && filled === null){
            const field = item.querySelector('.js-ascent-text');
            //если инпут в фокусе
            field.addEventListener('focus', e => {
                // то добавляем класс показывающий крестик
                clear.classList.add('display-block');
                //удаляем класс скрывающий крестик
                clear.classList.remove('display-none');
            });
        }

    });
    orderDelivery();
    showTariffOptions();
}

clearCross();

//изменение карандаша на руку
function correct(){
    const block = document.querySelectorAll('.options-menu__correction');
    block.forEach(item => {
        //onmouseover - событие, когда курсор мыши наводится на элемент
        item.onmouseover = function(){
            item.innerHTML = '&#9997;️';
        };
        //onmouseout - событие, когда курсор мыши выходит за пределы элемента
        item.onmouseout = function(){
            item.innerHTML = '✏️';
        }
    })
}

correct();

//заполненны ли все обязательные поля на стр заказа доставки
function orderDelivery(){
    const btn = document.querySelector('.appointment__next-link');
    const block = document.querySelector('.appointment');
    const checkMark = block.querySelectorAll('.input-filled');
    const fields = block.querySelectorAll('.input-parent');
    const house = block.querySelector('.form__house-input');
    const textHouse = document.querySelector('.js-error-house');
    const allInfoHouse = document.querySelector('.house__data');
    const arr = Array.from(checkMark);
    const array = Array.from(fields);
    //удаляем первый инпут
    array.splice(0,1);
    //и последнии 4
    array.splice(4,7);

    //в массиве галочек, вырезаю первую
    arr.splice(0,1);

    //ф-ция для метода every
    function check(item){
        return item.classList.contains('display-block') === true;
    }
    //если все поля заполненны корректно
    if(arr.every(check) && house.value.length > 0){
        //то снимаем с кнопки "Заказать доставку" класс блокирующий события
        btn.classList.remove("removal");
    }
    btn.onmousedown = function(event){
        //если не все поля, кроме дома, заполненны НЕкорректно
        if(arr.every(check) !== true && house.value.length == 0){
            //то добавляем  "Заказать доставку" класс блокирующий события
            btn.classList.add("removal");

            //находим все обязательные инпуты кроме дома
            for(let i = 0; i < arr.length; i++){
                //и проверяем их на НЕкорректное значение
                if(!arr[i].classList.contains('display-block')){
                    //находим сам инпут
                    const el = array[i].querySelector('input');
                    //добавляем обвотку
                    el.classList.add("error-border");
                    //и снимаем класс, через метод класс-лист
                    el.classList.remove("pseudo-hover");

                    //если первый инпут заполнен некорректно
                    if(i === 0){
                        array[0].querySelector('.js-error-region').innerHTML = "Укажите Ваш регион";
                    }else if(i === 1){
                        array[1].querySelector('.js-error-region').innerHTML = "Укажите Ваш город";
                    }else if(i === 2){
                        array[2].querySelector('.js-error-region').innerHTML = "Укажите Ваш населенный пункт";
                    }else{
                        array[3].querySelector('.js-error-region').innerHTML = "Укажите Вашу улицу";
                    }
                }
            }
            //добавляем красную обвотку для инпута дома
            house.classList.add("error-border");
            //и снимаем класс, через метод класс-лист
            house.classList.remove("pseudo-hover");
            //добавляем текстовую подсказку к инпуту дома
            textHouse.innerHTML = "Укажите № дома";
        }else if(arr.every(check) === true && house.value.length == 0){//если поле дом заполненно НЕкорректно
            //то добавляем  "Заказать доставку" класс блокирующий события
            btn.classList.add("removal");

            //добавляем красную обвотку для инпута дома
            house.classList.add("error-border");
            //и снимаем класс, через метод класс-лист
            house.classList.remove("pseudo-hover");
            //добавляем текстовую подсказку к инпуту дома
            textHouse.innerHTML = "Укажите № дома";
        }
        //добавляем номер дома на стр со всеми данными
        allInfoHouse.innerHTML = house.value;
    }
}

orderDelivery();


function allInfo(){
    const housing = document.getElementById('building');
    const allInfoHousing = document.querySelector('.housing__data');

    const building = document.getElementById('edifice');
    const allInfoBuilding = document.querySelector('.building__data');

    const flat = document.getElementById('flat');
    const allInfoFlat = document.querySelector('.flat__data');

    const comment = document.getElementById('comment');
    const allInfoComment= document.querySelector('.comment__data');

    const data = document.getElementById('date');
    const allInfoDate = document.querySelector('.date__data');

    const time = document.getElementById('time');
    const allInfoTime = document.querySelector('.time__data');

    housing.addEventListener('change', e => {
        //добавляем номер корпуса на стр со всеми данными
        allInfoHousing.innerHTML = housing.value;
    });
    building.addEventListener('change', e => {
        //добавляем номер корпуса на стр со всеми данными
        allInfoBuilding.innerHTML = building.value;
    });
    flat.addEventListener('change', e => {
        //добавляем номер корпуса на стр со всеми данными
        allInfoFlat.innerHTML = flat.value;
    });
    comment.addEventListener('change', e => {
        //добавляем номер корпуса на стр со всеми данными
        allInfoComment.innerHTML = comment.value;
    });
    data.addEventListener('change', e => {
        //добавляем номер корпуса на стр со всеми данными
        allInfoDate.innerHTML = data.value;
    });
    time.addEventListener('change', e => {
        //добавляем номер корпуса на стр со всеми данными
        allInfoTime.innerHTML = time.value;
    })
}

allInfo();

//маска для инпута "Поиск по цифрам"
function testSearchNumbers(){
    //блок с инпутом "поиск по цифрам"
    const block = document.querySelectorAll('.form__search-by-numbers');
    block.forEach(item => {
        //находим сам инпут "Поиск по цифрам"
        const search = item.querySelector('.form__search-by-numbers-input');
        //находим кнопку чистки поля
        const clear = item.querySelector('.js-clear-field');

        IMask(
            search,
            {
                mask: /^\d{0,7}$/

            });

        //чтобы в инпуте "Поиск по цифрам" можно было использовать крестик
        search.addEventListener('blur', e => {
            if(search.value == 0){
                //удаляем показывающий крестик
                clear.classList.remove('display-block');
                //то добавляем класс скрывающий крестик
                clear.classList.add('display-none');
            }
        })
    })
}

testSearchNumbers();

//чтобы в инпуте "Стоимость" можно было использовать крестик
function testNumbersPrice(){
    //блок с инпутом "Стоимость"
    const block = document.querySelectorAll('.form__price');
    block.forEach(item => {
        //находим сам инпут "Стоимость"
        const price = item.querySelector('.form__price-input');
        //находим кнопку чистки поля
        const clear = item.querySelector('.js-clear-field');

        price.addEventListener('blur', e => {
            if(price.value == 0){
                //удаляем показывающий крестик
                clear.classList.remove('display-block');
                //то добавляем класс скрывающий крестик
                clear.classList.add('display-none');
            }
        })
    })
}
testNumbersPrice();

function filter(){
    //блок "Получить новый номер"
    const block = document.querySelectorAll('.new-number__options');
    block.forEach(item => {
        //поле поиска по цифрам
        const search = item.querySelector('.form__search-by-numbers-input');
        //поле поиска по цене
        const price = item.querySelector('.form__price-input');
        //блок с номерами
        const numbers = item.querySelector('.phone-number__numbers-block1');
        //контейнер номера
        const elem = numbers.querySelectorAll('.phone-number__numbers-container');
        //кнопка "Следующие"
        const nextNumbersBtn = item.querySelector('.numbers-scroller__show-next');
        //части кнопки"Следующие"
        const nextNumbersBtnItems = nextNumbersBtn.querySelectorAll('.favorites-items');
        // кнопка "Предыдущие"
        const prevNumbersBtn = item.querySelector('.numbers-scroller__show-prev');
        const prevNumbersBtnItems = prevNumbersBtn.querySelectorAll('.favorites-items');
        //кнопка "Показать избранное"
        const showFavorites = item.querySelector('.favorites-btn');

        //для каждого контейнера с номером телефона
        elem.forEach( item => {
            //находим сам номер телефона и оставляем только цифры
            const value = item.dataset.value.replace(/[^0-9]/g, '');
            //преобразуем номер в массив, чтобы подкорректировать его
            const array = Array.from(value);
            //удаляем первые 4 символа (7995)
            array.splice(0,4);
            //возвращаем обратно в строку
            const str = array.join('');
            //с помощью метода match находим массив совпадений.
            //RegExp создаёт объект регулярного выражения для сопоставления текста с шаблоном
            const result = str.match(new RegExp(search.value));

            //цена номер, написанная в контейнере номера
            const numberPrice = item.querySelector('.phone-number__price').innerHTML;
            //цена, находящаяся в инпуте "Стоимость"
            const resultPrice = numberPrice === price.value;

            //чекбокс звездочки
            const checkbox = item.querySelector('input[type="checkbox"]');
            //если мы находимся в блоке только избранных номеров и номер выбран звездочкой или мы не находимся в блоке только изббранных номеров
            const favorite = showFavorites.classList.contains('active') && checkbox.checked || !showFavorites.classList.contains('active');

            //если есть номера совпадающие с тем, что ввел пользователь в инпут "Поиск по цифрам " и favorite(выше) и в инпуте "Стоимость" ничего не выбранно
            //или если есть номера совпадающие с той ценой, которую выбрал пользователь в инпуте "Стоимость" и favorite(выше) и в инпуте "Поиск по цифрам" ничего не введено
            //или есть в оба инпута что-то введено и совпадает с имеющимися номерами/стоимостями и favorite(выше)
            if(result && favorite && !price.value || resultPrice && favorite && !search.value|| result && resultPrice && favorite){
                //то мы показываем номер
                item.classList.remove('hidden');
                item.classList.add('is-filter');
            }else{
                //иначе скрываем
                item.classList.add('hidden');
                item.classList.remove('is-filter');
            }

        });



        //НЕ скрытые номера
        const rightNumber = numbers.querySelectorAll('.phone-number__numbers-container.is-filter:not(.display-none)');
        //делаем из них массив
        const numbersArr = Array.from(rightNumber);
        for(let i = 0; i < numbersArr.length; i++){
            if(numbersArr.length !== 0){
                if(numbersArr.length <= 7){//если количество совпадающих номеров меньше или равно 7
                    //то мы их все показываем
                    numbersArr[i].classList.remove('hidden');

                    //для каждого элемента кнопки "следующие"
                    nextNumbersBtnItems.forEach(item => {
                        //добавляем обесцвечивающий класс
                        item.classList.add('favorites');
                    });
                    //для кнопки "следующие" добавляем класс, блокирующий события
                    nextNumbersBtn.classList.add('removal');

                    //для каждого элемента кнопки "предыдущие"
                    prevNumbersBtnItems.forEach(item => {
                        //добавляем обесцвечивающий класс
                        item.classList.add('favorites');
                    });
                    //для кнопки  "предыдущие" добавляем класс, блокирующий события
                    prevNumbersBtn.classList.add('removal');
                }else if(numbersArr.length > 7){

                    if(numbersPage === 0){
                        if(i < 7){
                            numbersArr[i].classList.remove('hidden');
                        }else if(i >= 7){
                            numbersArr[i].classList.add('hidden');
                        }
                        //для каждого элемента кнопки "следующие"
                        nextNumbersBtnItems.forEach(item => {
                            //добавляем выделяющий класс
                            item.classList.remove('favorites');
                        });
                        //у кнопки "следующие" удаляем класс, блокирующий события
                        nextNumbersBtn.classList.remove('removal');

                        //для каждого элемента кнопки "предыдущие"
                        prevNumbersBtnItems.forEach(item => {
                            //добавляем обесцвечивающий класс
                            item.classList.add('favorites');
                        });
                        //для кнопки  "предыдущие" добавляем класс, блокирующий события
                        prevNumbersBtn.classList.add('removal');

                    }else if(numbersPage === 1){
                        if(i < 7 || i >= 14){
                            numbersArr[i].classList.add('hidden');
                        }else if(i >= 7 && i < 14){
                            numbersArr[i].classList.remove('hidden');
                        }
                        //для каждого элемента кнопки "следующие"
                        nextNumbersBtnItems.forEach(item => {
                            //добавляем выделяющий класс
                            item.classList.add('favorites');
                        });
                        //у кнопки "следующие" добавляем класс, блокирующий события
                        nextNumbersBtn.classList.add('removal');

                        //для каждого элемента кнопки "предыдущие"
                        prevNumbersBtnItems.forEach(item => {
                            //добавляем обесцвечивающий класс
                            item.classList.remove('favorites');
                        });
                        //для кнопки  "предыдущие" добавляем класс, блокирующий события
                        prevNumbersBtn.classList.remove('removal');

                    }
                }
            }
        }
    })
}


let numbersPage = 0;


const element = document.getElementById('id');
const options = {
    limit: document.querySelector('.area'),
};
const drag = new Draggable (element, options);

drag.set(window.innerWidth - 140,window.innerHeight - 162);
























