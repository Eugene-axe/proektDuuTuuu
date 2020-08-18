class Stick { //принимает объект с подзадачей и на его основе выдает стикер
    constructor(){
        this.plus = () => {
            new Modal().getModalAddTask();
        }
    }

    create(subTask){
        const stickContainer = document.createElement('div');
        stickContainer.classList.add('stick-container');
        stickContainer.append(this.createStickMain(subTask));
        stickContainer.append(this.createStickPlus(subTask._idParent , subTask.id));
        return stickContainer;
    }

    createStickMain(subTask){
        let stick = document.createElement('div');
        stick.classList.add('stick');
        stick.insertAdjacentHTML('afterbegin' , `
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
            <span class='stick-worker right-half'>${subTask.worker}</span>
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
    
}