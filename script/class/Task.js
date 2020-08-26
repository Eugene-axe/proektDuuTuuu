'use strict'

class Task{
    constructor(izdelie, title){
        this.status = false;//'выполнено или в работе';
        this.title = title;
        this.izdelie = izdelie;
        this.arraySubTask = []; 
    }
    changeStatus() {
        this.status = true;
        const data = new Date();
        this.dateEnd = `${data.getHours()}:${data.getMinutes()} ${data.getDate()}:${data.getMonth()+1}:${data.getFullYear()}`; 
    }
    setAutor(user){
        this.autor = user.name;
    }
    setId(){
        this.id = Math.floor(Math.random()*9e6).toString(16);
    }
    deleteSubTask(subTaskId){
        this.arraySubTask = this.arraySubTask.filter( item => item.id !== subTaskId);
    }
} 