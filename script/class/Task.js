'use strict'

class Task{
    constructor(izdelie, title){
        this.status = false;//'выполнено или в работе';
        this.title = title;//'заголовок';
        this.izdelie = izdelie;//'изделие';
        this.arraySubTask = []; //массив подзадач
    }
    changeStatus() {
        this.status = true;
        this.dateEnd = `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}:${new Date().getMonth()+1}:${new Date().getFullYear()}`; 
    }
    setAutor(user){
        this.autor = user.name;
    }
    setId(){
        this.id = Math.floor(Math.random()*9e6).toString(16);
    }

} 