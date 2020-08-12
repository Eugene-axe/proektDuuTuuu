'use strict'

class User {

    constructor(name){
        this.name = name;
        this.login = '';
        this.password = '';
        this.archiveTasks = [];
    }
    setTask(title) {
        let date = `${new Date().getMinutes()}м. ${new Date().getHours()}ч. ${new Date().getDate()} : ${new Date().getMonth()+1} : ${new Date().getFullYear()} `;
        let task = new Task( this.name, 'Исполнитель', 'изделие' , false , title , 'Описание', date , 'конец работы');
        this.saveInArchive(task);
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
    saveInArchive(task){ //добавляет задачу к архиву
        this.archiveTasks.push(task);
        this.setInLocalStorage();
    }
    setInLocalStorage(){ //сохранит в память массив задач
        localStorage.setItem(this.login , JSON.stringify(this.archiveTasks));
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