class Stick { //принимает объект с подзадачей и на его основе выдает стикер
    constructor(subTask){
        this.subTask = subTask;
        this.subTaskContainerObj = null;
        this.plus = () => {
            new Modal(this.subTask.idParent , this.subTask.id).getModalAddTask();
        }
        this.changeStatusSubTask = event => {
            const alertWin = new ModalWindowMenu('Хотите сказать что задача выполнена?', event.target );
            const sTContainer = event.path.find( node => node.classList.contains('subTask-container'));
            sTContainer.append(alertWin.create(this));
        }
        this.removeStick = event => {
            const sTContainer = event.path.find( node => node.classList.contains('subTask-container'));
            const alertWin = new ModalWindowMenu('Этот стикер больше не нужен?' , event.target);
            sTContainer.append(alertWin.create());
        }
    }
    create(){
        const subTaskContainer = document.createElement('div');
        subTaskContainer.classList.add('subTask-container');
        subTaskContainer.setAttribute('data-subTaskId', this.subTask.id)
        subTaskContainer.append(this.createWindowMenu());
        subTaskContainer.append(this.createStickContainer(this.subTask));
        this.subTaskContainerObj = subTaskContainer;
        return subTaskContainer;
    }
    createStickContainer(subTask){ //стикер и все менюшки к нему прилегающие
        const stickContainer = document.createElement('div');
        stickContainer.classList.add('stick-container');
        stickContainer.append(this.createStickMain(subTask));
        stickContainer.append(this.createStickPlus(subTask._idParent , subTask.id));
        return stickContainer;
    }
    createStickMain(subTask){// сам стикер
        let stick = document.createElement('div');
        stick.classList.add('stick');
        if (subTask.status == true) {
            stick.classList.add('status-over')
        }
        stick.insertAdjacentHTML('beforeend' , `
        <div class="stc-row row1">
            <div class="stick-date left-half">
                <span class="stick-date-begin">${subTask.dateStart}</span>
                <span class="stick-dedline">${subTask.dedline}</span>
            </div>
            <div class="stick-izd right-half">${subTask.izdelie}</div>
        </div>
        <div class="stc-row row2">${subTask.description}</div>
        <div class="stc-row row3">
            <span class='stick-autor left-half'>${subTask.autor}</span>
            <span class='stick-worker right-half'> ${subTask.worker}</span>
        </div>`);
        return stick;
    }
    createStickPlus(idParent , id){ //добавление подзадачи из подзадачи
        let plus = document.createElement('div');
        plus.classList.add('task-plus');
        plus.setAttribute('data-from', 'subTaskPlusBtn');
        plus.setAttribute('data-idParent', idParent);
        plus.setAttribute('data-id', id );
        plus.innerHTML = '+';
        plus.addEventListener('click' , this.plus);
        return plus;
    };
    createWindowMenu(){ //вверхнее меню Галочка с Крестиком
        const upMenu = document.createElement('div');
        const btnRemove = document.createElement('div');
        const btnChangeStatus = document.createElement('div');
        upMenu.classList.add('window-menu');
        btnRemove.classList.add('btnRemove');
        btnChangeStatus.classList.add('btnStatus');
        upMenu.append(btnChangeStatus);
        upMenu.append(btnRemove);
        btnRemove.addEventListener('click' , this.removeStick);
        btnChangeStatus.addEventListener('click' , this.changeStatusSubTask);
        btnRemove.innerHTML = '&#x2718;';
        btnChangeStatus.innerHTML = '&#x2714;'; 
        return upMenu;
    }
    offEventSubtask(subTaskContainer){  
        const galka = subTaskContainer.querySelector('.btnStatus');
        const krestik = subTaskContainer.querySelector('.btnRemove');
        const plus = subTaskContainer.querySelector('.task-plus');
        galka.removeEventListener('click' , this.changeStatusSubTask );
        krestik.removeEventListener('click' , this.removeStick );
        plus.removeEventListener('click' , this.plus );
    }
}