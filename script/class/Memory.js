'use strict'

class Memory {
    //instance : JSON.parse(localStorage.getItem('kanban_from_designer_POPA'))||[],
    constructor(){
        this.memoryStorage = JSON.parse(localStorage.getItem('kanban_from_designer_POPA'))||[];
    }
    saveUser(user){
        console.group('saveUser');
        console.log(this.memoryStorage);
        if (!this.memoryStorage.find(item => item.name == user.name)){
            this.memoryStorage.push(user);
            localStorage.setItem('kanban_from_designer_POPA' , JSON.stringify(this.memoryStorage));
        } else {
            console.log(`Пользователь ${user.name} уже существует`);
        }
        console.groupEnd();
    }
    refreshUser(user){
        let memory = this.getOutAllMemoryOffLS();
        let userFromMemory = memory.find( userFromMemory => userFromMemory.name == user.name);
        if (!userFromMemory) {
            memory.push(user);
        }   
        let indexUserOfMemory = this.memoryStorage.findIndex( item => item.name == user.name);
        if (indexUserOfMemory >= 0) {
            this.memoryStorage[indexUserOfMemory] = user;
        }
        this.saveAllMemory();
    }
    saveAllMemory(){
        localStorage.setItem('kanban_from_designer_POPA' , JSON.stringify(this.memoryStorage));
    }
    getOutAllMemoryOffLS(){
        return JSON.parse(localStorage.getItem('kanban_from_designer_POPA')); 
    }
    addSubTask(task, subTask){//добавить новую под-задачу
        task.arraySubTask.push(subTask);
    }
    instertSubTaskAfterSubTask(arraySubTask, newSubTask, idCaller){ //добавить новую под-задачу после другой подзадачи
        let indexPreInsert = arraySubTask.findIndex(item => item.id == idCaller);
        let arrayBeforeIndex = arraySubTask.slice(0, indexPreInsert+1);
        console.groupEnd()
        return arrayBeforeIndex.concat(newSubTask, arraySubTask.slice(indexPreInsert+1) );
    }
    addSubTaskAfterPlus(subTask , idCaller){ 
        let task = app.user.archiveTasks.find( task => task.id === subTask.idParent);
        if (task) {
            task.arraySubTask = this.instertSubTaskAfterSubTask(task.arraySubTask, subTask, idCaller);
            this.refreshUser(app.user);
        } else {
            console.error('Task в архиве archiveTask пользователя не найден')
        }
    }
    deleteSubTaskOfArchiveTask(user, taskId , subTaskId){
        return user.archiveTasks.find(task => task.id == taskId).arraySubTask.filter( subTask => subTask.id !== subTaskId);
    }
    setInLocalStorage(){ //сохранит в память массив задач
        localStorage.setItem(this.login , JSON.stringify(this.archiveTasks));
        // console.log('Архив задач пользователя сохранился в LS')
        //localStorage.getItem('ключ') - берем значение по ключу
        //localStorage.removeItem('имя ключа') - удаляем ключ
        //localStroage.clear() - очищает все хранилище
            //запись  localStorage.setItem('ключ', JSON.stringify('значение'))
            //читаем JSON.parse(localStorage.getItem('ключ'))        
    }
    getOutLocalStorage(){ // возвратит из памяти массив задач
       return JSON.parse(localStorage.getItem(this.login));
    }
}

