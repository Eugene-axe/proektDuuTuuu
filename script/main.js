'use strict'

const app = {
    header: document.querySelector('header'),
    aside : document.querySelector('aside'),
    main : document.querySelector('main'),
    stickArea : document.querySelector('.stick-area'),
    handler: {
        newtaskOk(){ // кнопка ОК в модалке Новой задачи
            console.log('ok');
            //setTask(komu , izdelie , title , description , dedline)
            const komu = document.getElementById('mod-worker').value;
            const izdelie = document.getElementById('mod-izdelie').value;
            const title = document.getElementById('mod-title').value;
            const description = document.getElementById('mod-description').value;
            const dedline = document.getElementById('mod-dedline').value;
            app.user.setTask(komu , izdelie , title , description , dedline);
            document.querySelector('.modal-newtask .btn-ok').removeEventListener('click' , app.handler.newtaskOk);
            document.querySelector('.modal-newtask .btn-cancel').removeEventListener('click', app.handler.newtaskCancel);
            app.handler.closeModal(app.modal.newtask);
            app.createTaskGrid(app.user)
        },
        newtaskCancel(modal){  //кнопка Cancel в модалке Новой задачи
            console.log('cancel');
            document.querySelector('.modal-newtask .btn-ok').removeEventListener('click' , app.handler.newtaskOk);
            document.querySelector('.modal-newtask .btn-cancel').removeEventListener('click', app.handler.newtaskCancel);
            app.handler.closeModal(app.modal.newtask);
        },
        closeModal(modal){ //делает модалку невидимой, затем удаляет
            modal.classList.remove('non-opacity');
            setTimeout( ()=> modal.remove() , 300);
        },

    },
    modal: {
        newtask: null,
    },
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
        newTaskButton.addEventListener('click' , () => { //событие кнопки добавления новой задачи
            this.getCreateModalAddNewTask();
        });
    }, 
    createTaskGrid(user){ //создаем сетку задач
        document.querySelector('.stick-area').innerHTML = '';
        let arrayTask = user.getOutLocalStroage(); //вынимаем из памяти задачи конкретного Пользователя
        arrayTask.forEach( task => {
            document.querySelector('.stick-area').append( this.createTaskStick(task));
        });
    },
    createTaskStick(task){ //создаем конкретный 1 стикер с задачей
        const stick = document.createElement('div');
        stick.classList.add('task-container');
        stick.insertAdjacentHTML('afterbegin' , `
            <div class="stick">
                <div class="stc-row row1">
                    <div class="stick-date">
                        <span class="stick-date-begin">${task.dateStart}</span>
                        <span class="stick-dedline">${task.dateEnd}</span>
                    </div>
                    <div class="stick-izd">${task.izdelie}</div>
                </div>
                <div class="stc-row row2">${task.description}</div>
                <div class="stc-row row3">
                    <span class='stick-autor'>${task.autor}</span>
                    <span class='stick-worker'>${task.worker}</span>
                </div>
            </div>`);
        this.taskStick = stick;
        return stick;
    },
    getCreateModalAddNewTask(){ //выводит модальное окно создания нового Стикера задачи
        const modal = document.createElement('div');
        modal.classList.add('modal-newtask-container');
        modal.insertAdjacentHTML('afterbegin' , `
        <div class='modal-newtask'>
            <form action="">
                <fieldset class='field-modalinputs'>
                    <div class="newtask-hf">Новая задача</div>
                    <label for="mod-title">Название: </label><input type="text" id="mod-title" placeholder='Важное дело, очень' value="Тема">
                    <label for="mod-worker">Кому: </label><input type="text" id="mod-worker" placeholder='Рабу апз-шному' value="Рабу">
                    <label for="mod-izdelie">Изделие : </label><input type="text" id="mod-izdelie" placeholder='на ЖМП.00.55' value="888">
                    <label for="mod-dedline">До какого числа: </label><input type="date" id="mod-dedline" placeholder='до вчера'>
                    <label for="mod-description">Описание задания: </label><textarea id="mod-description" placeholder='ПИ ЗдАл?' value="">Скажи мне , что бы я сказал ему, чтобы тот пошел не туда и заставил всех там суки работать пожалуйста</textarea>
                </fieldset>
                <fieldset class='field-modalbtn'>
                    <div>
                        <div class="btn-ok divbtn">Запомним</div>
                        <div class="btn-cancel divbtn">Забьем</div>
                    </div>
                </fieldset>
            </form>
        </div>`);
        document.querySelector('body').append(modal);
        document.querySelector('.modal-newtask .btn-ok').addEventListener('click' , this.handler.newtaskOk );
        document.querySelector('.modal-newtask .btn-cancel').addEventListener('click' , this.handler.newtaskCancel);
        setTimeout( () => modal.classList.add('non-opacity') , 100);
        this.modal.newtask = modal;
        return modal;
    },
    run(){ //запуск приложения
        this.currentUser();
        this.headerGreeting();
        this.asideHandler();
    },

}

app.run();
  
