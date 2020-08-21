'use strict'

class User {

    constructor(name){
        this.name = name;
        this.login = '';
        this.password = '';
        this.archiveTasks = [];
    }
    
    setSubTask({worker , izdelie , description , dedline } , parent){
        let subTask = new SubTask( worker , izdelie , description, dedline);
        subTask.setDateStart();
        subTask.setAutor(this);
        subTask.setId();
        subTask.idParent = parent;
        console.group(`Сформирована подзадача к задаче ${subTask.idParent} работнику ${subTask.worker} по изделию ${subTask.izdelie}`);
        console.log(subTask);
        console.groupEnd();
        return subTask;
    }
    setTask({izdelie, title}) {
        let task = new Task( izdelie , title);
        console.group(`Пользователь ${this.name} сформировал задачу ${task.title}:`);
        task.setId();
        task.setAutor(this);
        console.log(task);
        console.groupEnd();
        return task;
    }
    subTaskAddTask(task , subTask){
        if (task.id === subTask.idParent ) {
            task.arraySubTask.push(subTask);
        }
        this.saveInArchiveNewTask(task);
    }
    logIn(){
        // обращаемся в памаять 
            //проверяем существует такой логин и пароль
        // разрешаем приложению открыться и вынуть из памяти данные конкретного пользователя
    }
    logOut(){
        
    }
    verification(login , password){
        this.login = login;
        this.password = password;
    }
    addSubTaskAfterPlus(subTask , idCaller){    
        let task = this.archiveTasks.find( item => item.id === subTask.idParent);
        if (task) {
            task.arraySubTask = instertSubTaskAfterSubTask(task.arraySubTask, subTask, idCaller);
            this.setInLocalStorage();
        } else {
            console.error('Task в архиве archiveTask пользователя не найден')
        }
    }
    saveInArchiveNewTask(data){ //добавляет задачу к архиву
        this.archiveTasks.push(data);
        console.log(' в Архив задач пользователя добавлены данные ');
        this.setInLocalStorage();
    }
    setInLocalStorage(){ //сохранит в память массив задач
        localStorage.setItem(this.login , JSON.stringify(this.archiveTasks));
        console.log('Архив задач пользователя сохранился в LS')
        //localStorage.getItem('ключ') - берем значение по ключу
        //localStorage.removeItem('имя ключа') - удаляем ключ
        //localStroage.clear() - очищает все хранилище
            //запись  localStorage.setItem('ключ', JSON.stringify('значение'))
            //читаем JSON.parse(localStorage.getItem('ключ'))        
    }
    getOutLocalStroage(){ // возвратит из памяти массив задач
       return JSON.parse(localStorage.getItem(this.login));
    }

}

function instertSubTaskAfterSubTask(arraySubTask, newSubTask, idCaller){
    let indexPreInsert = arraySubTask.findIndex(item => item.id == idCaller);
    let arrayBeforeIndex = arraySubTask.slice(0, indexPreInsert+1);
    return arrayBeforeIndex.concat(newSubTask, arraySubTask.slice(indexPreInsert+1) );
}

