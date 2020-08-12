'use strict'

class Task{
    constructor(autor, worker, izdelie, status, title, description, dateStart, dateEnd ){
        this.autor = autor;//'Кто выдал';
        this.worker = worker;//'Кому выдал';
        this.status = status;//'выполнено или в работе';
        this.title = title;//'заголовок';
        this.izdelie = izdelie;//'изделие';
        this.description = description;//'описание задачи';
        this.dateStart = dateStart;//'Когда выдана';
        this.dateEnd = dateEnd;//'Когда закончена';
    }
    changeStatus() {
        this.status = true;
        this.dateEnd = `${new Date().getHours()}ч. ${new Date().getMinutes()}м. ${new Date().getDate()}:${new Date().getMonth()+1}:${new Date().getFullYear()}`;
    }
}