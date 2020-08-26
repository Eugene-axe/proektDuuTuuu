'use strict'

const app = {
    header: document.querySelector('header'),
    aside : document.querySelector('aside'),
    main : document.querySelector('main'),
    stickArea : document.querySelector('.stick-area'),
    user: null,
    memory : new Memory(),
    

    currentUser(nameUser){ //обьявляем текущего Пользователя
        return this.user = this.memory.memoryStorage.find( user => user.name == nameUser );
    },
    verification(){ //переделать
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
        this.stickArea.innerHTML = '';
        let arrayTask = app.memory.memoryStorage.find(userLS => userLS.name == user.name).archiveTasks;
        arrayTask.forEach( task => {
            const taskContainer = document.createElement('div');
            taskContainer.setAttribute('data-taskId' , task.id);
            taskContainer.classList.add('task-container'); // пунктир
            task.arraySubTask.forEach( subTask => {
                taskContainer.append( this.createTaskStick(subTask)); 
            });
            document.querySelector('.stick-area').append(taskContainer);
        });
    },
    createTaskStick(subTask){ 
        return new Stick(subTask).create();
    },

    run(){ //запуск приложения
        this.memory.saveUser(new User('Царь'));
        this.currentUser('Царь');
        this.headerGreeting();
        //this.verification();
        this.asideHandler();
        this.createTaskGrid(app.user);
    },

}

app.run();
  
