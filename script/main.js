'use strict'

const app = {
    header: document.querySelector('header'),
    aside : document.querySelector('aside'),
    main : document.querySelector('main'),
    stickArea : document.querySelector('.stick-area'),
    modal: null,
    user: null,
    taskStick: 'stick',

    currentUser(name='Господин'){ //обьявляем текущего Пользователя
        return this.user = new User(name);
    },
    headerGreeting(){ //измяем хэдер приветствия в соответсвии с текущим юзером
        this.header.querySelector('h1').innerHTML = `Здрасьте, ${this.user.name}. Список Ваших дел ....`;
    },
    asideHandler(){ //события сайдбара
        const arrow = this.aside.querySelector('.aside-arrow');
        const newTaskButton = this.aside.querySelector('.add-button');
        arrow.addEventListener('click', ()=>{ //событие стрелки скрывающей сайдбар
            arrow.textContent = arrow.textContent == '>' ? '<' : '>';
            this.aside.classList.toggle('aside-hide');
        });
        newTaskButton.addEventListener('click' , () => {
            this.getCreateModalAddNewTask();
        }); //пока создаем простенькую задачу и кладем ее в архив задач к Пользователю
    },
    createTaskGrid(user){ //создаем сетку задач
        let arrayTask = user.getOutLocalStroage(); //вынимаем из памяти задачи конкретного Пользователя
        this.createTaskStick();
    },
    createTaskStick(){ //создаем конкретный стикер с задачей
        const stick = document.querySelector('div');
        stick.classList.add('stick');
        return stick;
    },
    getCreateModalAddNewTask(){
        const modal = document.createElement('div');
        modal.classList.add('modal-newtask-container');
        modal.insertAdjacentHTML('afterbegin' , `
            <div class='modal-newtask'>
                <h3>Новая задача</h3>
                <form action="">
                    <fieldset>
                        <label for="mod-worker">Кому: </label><input type="text" id="mod-worker" placeholder='Рабу апз-шному'>
                        <label for="mod-izdelie">Изделие : </label><input type="text" id="mod-izdelie" placeholder='на ЖМП.00.55'>
                        <label for="mod-dedline">До какого числа: </label><input type="date" id="mod-dedline" placeholder='до вчера'>
                        <label for="mod-description">Описание задания: </label><textarea id="mod-description" placeholder='ПИ ЗдАл?'></textarea>
                    </fieldset>
                </form>
            </div>`);
        document.querySelector('body').append(modal);
        setTimeout( () => modal.classList.add('non-opacity') , 100);
        return modal;
    },
    run(){ //запуск приложения
        this.currentUser();
        this.headerGreeting();
        this.asideHandler();
    },

}

app.run();
    /*
    createHeader(){
        const header = document.createElement('header');
            header.classList.add('header');
            header.insertAdjacentHTML('afterbegin' , `
            <header class='header'>
                <h1>Здрасьте, User. Список Ваших дел ....</h1>
            </header>`);
        return header;
    },//end createHeader
    createSideBar(){ //может и не пригодится но на всякий
        const sideBar = document.createElement('aside');
            sideBar.classList.add('aside');
            sideBar.insertAdjacentHTML('afterbegin', `<div class='aside-arrow divbtn'>></div>
            <fieldset class='fiel-add'>
                <div class="addtask">
                    <div class='add-button divbtn'>Задачу</div>
                </div>
            </fieldset>
            <fieldset class='fiel-search'>
                <div class="search">
                    <label for="i-autor">Кто выдал: </label><input type="text"  id='i-autor'>
                    <label for="i-worker">Кому выдал: </label><input type="text"    id='i-worker'>
                    <!-- <label for="i-izdelie">Изделие: </label><input type="text"  id='i-izdelie'> -->
                    <div class="search-izdelie">
                        <label for="i-izdelie">Изделие: </label>
                        <div>
                            <select id='i-izdelie'>
                                <option value="1">Изделие 1</option>
                                <option value="2">Изделие 2</option>
                                <option value="3">Изделие 3</option>
                            </select>
                            <div class="izd-add divbtn">+</div>
                        </div>
                    </div>
                    <label for="i-data">Когда выдал:</label><input type="date" id='i-data'>
                    <label for="i-dedline">Дедлайн: </label><input type="date"  id='i-dedline'>
                    <label for="i-description">Часть описания: </label><textarea    id='i-description' placeholder="Слова из описания"></textarea>
                </div>
            </fieldset>`);
        return sideBar;
    },//end createSideBar*/

