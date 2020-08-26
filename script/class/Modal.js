class Modal {
    constructor(taskId, subTaskId){
        this.btnOk = null;
        this.btnCancel = null;
        this.newtask = null;
        this.taskId = taskId;
        this.subTaskId = subTaskId;

        this.ok = event => {
            let task = null;
            let subTask =null;
            let dataForTask = {
                worker : document.getElementById('mod-worker').value,
                izdelie : document.getElementById('mod-izdelie').value,
                title : document.getElementById('mod-title').value,
                description : document.getElementById('mod-description').value,
                dedline : document.getElementById('mod-dedline').value,
                fromName : event.path.find( node => node.classList.contains('modal-newtask-container')).dataset.from,
                id : event.path.find( node => node.classList.contains('modal-newtask-container')).dataset.taskid,
                subTaskId : event.path.find( node => node.classList.contains('modal-newtask-container')).dataset.subtaskid,
            }
            if (dataForTask.fromName == 'Задачу') {
                task = app.user.setTask(dataForTask);
                subTask = app.user.setSubTask( dataForTask , task);
                app.user.subTaskAddTask(task , subTask);
            } 
            if (dataForTask.fromName == '+') { 
                subTask = app.user.setSubTask(dataForTask, dataForTask);
                app.memory.addSubTaskAfterPlus(subTask , dataForTask.subTaskId);
            }
            app.createTaskGrid(app.user);
            this.close(this.newtask);
        };
        this.cancel = () => {
            console.log('cancel');
            this.close(this.newtask);
        };
        this.close = modal => {
            this.btnOk.removeEventListener('click' , this.ok);
            this.btnCancel.removeEventListener('click', this.cancel);
            modal.classList.remove('non-opacity');
            setTimeout( ()=> modal.remove() , 300);
        };

    }

    getModalAddTask(){
        const elementDoEvent = event.target.textContent;
        const modal = document.createElement('div');
        modal.classList.add('modal-newtask-container');
        modal.setAttribute('data-from', event.target.textContent);
        modal.setAttribute('data-taskId', this.taskId );
        modal.setAttribute('data-subTaskId', this.subTaskId );
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
                        <div class="btn-ok divbtn" data-from=${elementDoEvent} data-idParent=${this.taskId} data-idCaller=${this.subTaskId}>Запомним</div>
                        <div class="btn-cancel divbtn">Забьем</div>
                    </div>
                </fieldset>
            </form>
        </div>`);
        document.querySelector('body').append(modal);
        this.btnOk = document.querySelector('.modal-newtask .btn-ok');
        this.btnCancel = document.querySelector('.modal-newtask .btn-cancel');
        this.btnCancel.addEventListener('click' , this.cancel);
        this.btnOk.addEventListener('click' , this.ok );
        this.newtask = modal;
        setTimeout( () => modal.classList.add('non-opacity') , 100);
        return modal;
    }
}
