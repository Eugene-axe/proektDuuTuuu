class Stick { //принимает объект с подзадачей и на его основе выдает стикер
    constructor(){
        
    }
    create(subTask){
        const stick = document.createElement('div');
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
    appendInNode(node){
        node.append(this.createStick());
    }
}