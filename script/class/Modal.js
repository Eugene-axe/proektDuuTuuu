class Modal {
    constructor(){
        this.btnOk = null;
        this.btnCancel = null;
        this.newtask = null;

        this.ok = () => {
            console.group('Вы нажали Ок в модалке');
            console.log(event);
            let task = null;
            let subTask =null;
            let dataForTask = {
                worker : document.getElementById('mod-worker').value,
                izdelie : document.getElementById('mod-izdelie').value,
                title : document.getElementById('mod-title').value,
                description : document.getElementById('mod-description').value,
                dedline : document.getElementById('mod-dedline').value,
                fromName : event.target.dataset.from,
                id : event.target.dataset.idparent,
                idCaller : event.target.dataset.idcaller,
            }
            if (dataForTask.fromName == 'asideBtn') {
                task = app.user.setTask(dataForTask);
                subTask = app.user.setSubTask( dataForTask , task);
                app.user.subTaskAddTask(task , subTask);
            } 
            if (dataForTask.fromName == 'subTaskPlusBtn') { 
                subTask = app.user.setSubTask(dataForTask, dataForTask);
                app.user.addSubTaskAfterPlus(subTask , dataForTask.idCaller);
            }
            app.createTaskGrid(app.user);
            this.close(this.newtask);
            console.groupEnd();
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
        const elementDoEvent = event.target.dataset.from;
        const parentID = event.target.dataset.idparent;
        const idCaller = event.target.dataset.id;
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
                        <div class="btn-ok divbtn" data-from=${elementDoEvent} data-idParent=${parentID} data-idCaller=${idCaller}>Запомним</div>
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
