class ModalWindowMenu {
    constructor(text , node){
        this.text = text;
        this.nodeCallerModal = node; 
        this.textBlock = text => {
            const textBlock = document.createElement('div');
            textBlock.classList.add('mw-textBlock');
            textBlock.textContent = text;
            return textBlock;
        };
        this.okHandler = event => {
            let stickObj = event.target.parentos;
            const sTContainer = stickObj.subTaskContainerObj;
            sTContainer.querySelector('.stick').classList.add('status-over');
            let data = sTContainer.querySelector('.task-plus').dataset;
            let subTask = app.user.archiveTasks.find( task => task.id == data.idparent).arraySubTask.find( subTask => subTask.id == data.id );
            subTask.changeStatus();
            stickObj.offEventSubtask(sTContainer);
            app.memory.refreshUser(app.user);
            this.clearHandler(event.target);
            this.close(event.target.parentNode);
        };
        this.cancelHandler = event => {
            this.clearHandler(event.target);
            this.close(event.target.parentNode);
        };
        this.removeStickHandler = () => {
            console.group('removeStick');
            let taskId = event.path.find(node => node.classList.contains('task-container')).dataset.taskid;
            let subTaskId = event.path.find(node => node.classList.contains('subTask-container')).dataset.subtaskid;
            console.log(taskId , subTaskId);
            let userOfMemory = app.memory.memoryStorage.find( userOfMem => userOfMem.name == app.user.name);
            console.log(userOfMemory);
            userOfMemory.archiveTasks.find(task => task.id == taskId).deleteSubTask(subTaskId);
            app.memory.refreshUser(app.user);
            event.path.find(node => node.classList.contains('subTask-container')).remove();
            console.groupEnd();
            this.clearHandler(event.target);
            this.close(event.target.parentNode);
        }
        
    }
    btnOk (stickObject) {
        const ok = document.createElement('mw-btnOk');
        ok.parentos = stickObject;
        ok.classList.add('mw-btnOk');
        ok.textContent = 'Ну да';
        console.log(this.nodeCallerModal);
        if (this.nodeCallerModal.classList.contains('btnStatus')) {
            ok.addEventListener('click' , this.okHandler);
        } 
        if (this.nodeCallerModal.classList.contains('btnRemove')) {
            ok.addEventListener('click' , this.removeStickHandler);
        }
        return ok; 
    }
    btnCancel () {
        const cancel = document.createElement('mw-btnCancel');
        cancel.classList.add('mw-btnCancel');
        cancel.textContent = 'Д, неее';
        cancel.addEventListener('click' , this.cancelHandler);
        return cancel; 
    }
    create(stickObject){
        const winMenu = document.createElement('div');
        winMenu.classList.add('modal-window-menu');
        if (this.nodeCallerModal.classList.contains('btnStatus')) {
            winMenu.classList.add('mwm-l');
        } 
        if (this.nodeCallerModal.classList.contains('btnRemove')) {
            winMenu.classList.add('mwm-r');
        }
        setTimeout( () => winMenu.classList.add('non-opacity'), 100);
        winMenu.append(this.textBlock(this.text));
        winMenu.append(this.btnOk(stickObject));
        winMenu.append(this.btnCancel());
        return winMenu;
    }
    clearHandler(eventTarget){
        eventTarget.parentNode.querySelector('mw-btnOk').removeEventListener('click', this.okHandler);
        eventTarget.parentNode.querySelector('mw-btnCancel').removeEventListener('click', this.cancelHandler);
    }
    close(node){
        node.classList.remove('non-opacity');
        setTimeout( () => {
            node.remove();
        } , 300 );
    }
}