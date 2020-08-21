class Stick { //принимает объект с подзадачей и на его основе выдает стикер
    constructor(){
        this.plus = () => {
            new Modal().getModalAddTask();
        }
        this.changeStatusSubTask = event => { // серый стрикер 
            console.log('Событие смены статуса подзадачи');
            const alert = new ModalWindowMenu('Хотите сказать что задача выполнена?');
            const sTContainer = event.path.find( node => {
                return node.classList.contains('subTask-container');
            });
            console.dir(sTContainer);
            sTContainer.append(alert.create());
            this.offEventSubtask(sTContainer);
        }
        this.removeStick = event => {
            console.log('Событие удаленния стика задачи');
            event.target.parentNode.parentNode.remove();
        }
    }
    create(subTask){
        const subTaskContainer = document.createElement('div');
        subTaskContainer.classList.add('subTask-container');
        subTaskContainer.append(this.createWindowMenu());
        subTaskContainer.append(this.createStickContainer(subTask));
        return subTaskContainer;
    }
    createStickContainer(subTask){
        const stickContainer = document.createElement('div');
        stickContainer.classList.add('stick-container');
        stickContainer.append(this.createStickMain(subTask));
        stickContainer.append(this.createStickPlus(subTask._idParent , subTask.id));
        return stickContainer;
    }
    createStickMain(subTask){
        let stick = document.createElement('div');
        stick.classList.add('stick');
        console.log(subTask);
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
    createStickPlus(idParent , id){
        let plus = document.createElement('div');
        plus.classList.add('task-plus');
        plus.setAttribute('data-from', 'subTaskPlusBtn');
        plus.setAttribute('data-idParent', idParent);
        plus.setAttribute('data-id', id );
        plus.innerHTML = '+';
        plus.addEventListener('click' , this.plus);
        return plus;
    };
    appendInNode(node){
        node.append(this.createStickMain());
    }
    createWindowMenu(){
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