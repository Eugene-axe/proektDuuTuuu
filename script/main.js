'use strict'

const app = {
    header: document.querySelector('header'),
    aside : document.querySelector('aside'),
    main : document.querySelector('main'),
    stickArea : document.querySelector('.stick-area'),
    user: null,
    taskStick: 'stick',

    currentUser(name='Господин'){ //обьявляем текущего Пользователя
        return this.user = new User(name);
    },
    verification(){
        app.user.verification('inzhaner' , 'passwordrr')
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
            new Modal().getModalAddTask();
        });
    }, 
    createTaskGrid(user){ //создаем сетку задач
        document.querySelector('.stick-area').innerHTML = '';
        let arrayTask = user.getOutLocalStroage(); //вынимаем из памяти задачи конкретного Пользователя
        arrayTask.forEach( task => {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container'); // пунктир
            task.arraySubTask.forEach( subTask => {
                taskContainer.append( this.createTaskStick(subTask)); 
            });
            document.querySelector('.stick-area').append(taskContainer);
        });
    },
    createTaskStick(subTask){ 
        return new Stick().create(subTask);
    },

    run(){ //запуск приложения
        this.currentUser();
        this.headerGreeting();
        this.verification();
        this.asideHandler();
    },

}

app.run();
  
