'use strict'

class SubTask extends Task{
    constructor(worker, izdelie , description, dedline ){
        super(izdelie);
        this.worker = worker;//'Кому выдал';
        this.description = description;//'описание задачи';
        this.dedline = dedline//
    }
    setDateStart(){
        this.dateStart = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    }
    set idParent(parent) {
        this._idParent = parent.id;
    }
    get idParent(){
        return  this._idParent;
    }
}