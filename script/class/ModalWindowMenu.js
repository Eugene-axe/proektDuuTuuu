class ModalWindowMenu {
    constructor(text){
        this.text = text;
        this.textBlock = text => {
            const textBlock = document.createElement('div');
            textBlock.classList.add('mw-textBlock');
            textBlock.textContent = text;
            return textBlock;
        };
        this.btnOk = () => {
            const ok = document.createElement('mw-btnOk');
            ok.classList.add('mw-btnOk');
            ok.textContent = 'Ну да';
            ok.addEventListener('click' , this.okHandler);
            return ok; 
        };
        this.btnCancel = () => {
            const cancel = document.createElement('mw-btnCancel');
            cancel.classList.add('mw-btnCancel');
            cancel.textContent = 'Д, неее';
            cancel.addEventListener('click' , this.cancelHandler);
            return cancel; 
        };
        this.okHandler = event => {
            console.group('mw-ok-event');
            console.log(event);
            const sTContainer = event.path.find( node => node.classList.contains('subTask-container'));
            sTContainer.querySelector('.stick').classList.add('status-over');
            let data = sTContainer.querySelector('.task-plus').dataset;
            let subTask = app.user.archiveTasks.find( task => task.id == data.idparent).arraySubTask.find( subTask => subTask.id == data.id );
            subTask.changeStatus();
            app.user.setInLocalStorage();
            console.groupEnd();
            this.clearHandler(event.target);
            this.close();
        };
        this.cancelHandler = event => {
            console.group('mw-cancel-event');
            console.log(event);
            console.groupEnd();
            this.clearHandler(event.target);
            this.close();
        };
        
    }
    create(){
        const winMenu = document.createElement('div');
        winMenu.classList.add('modal-window-menu');
        winMenu.append(this.textBlock(this.text));
        winMenu.append(this.btnOk());
        winMenu.append(this.btnCancel());
        return winMenu;
    }
    clearHandler(eventTarget){
        eventTarget.parentNode.querySelector('mw-btnOk').removeEventListener('click', this.okHandler);
        eventTarget.parentNode.querySelector('mw-btnCancel').removeEventListener('click', this.cancelHandler);
    }
    close(){
        console.log('окно закрылось');
    }
}