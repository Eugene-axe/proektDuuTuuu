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
        return subTask;
    }
    setTask({izdelie, title}) {
        let task = new Task( izdelie , title);
        task.setId();
        task.setAutor(this);
        return task;
    }
    subTaskAddTask(task , subTask){
        if (task.id === subTask.idParent ) {
            task.arraySubTask.push(subTask);
        }
        this.saveInArchiveNewTask(task);
    }
    verification(login , password){
        this.login = login;
        this.password = password;
    }
    saveInArchiveNewTask(task){ //добавляет задачу к архиву
        this.archiveTasks.push(task);
        app.memory.refreshUser(this);
    }
};

