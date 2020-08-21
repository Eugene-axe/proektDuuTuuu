'use strict'

class SubTask extends Task{
    constructor(worker, izdelie , description, dedline ){
        super(izdelie);
        this.worker = worker;
        this.description = description;
        this.dedline = dedline;
    }
    setDateStart(){
        const data = new Date();
        this.dateStart = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
    }
    set idParent(parent) {
        this._idParent = parent.id;
    }
    get idParent(){
        return  this._idParent;
    }
}