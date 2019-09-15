class Storage{
    static getSearchedUserFromStorage(){

        let users;

        if (localStorage.getItem("searched") === null){
            users = [];
        }else {
            users = JSON.parse(localStorage.getItem("searched"))
        }

        return users;

    }

    static addSearchUserToStorage(username){
        let users = this.getSearchedUserFromStorage();

        if(users.indexOf(username) === -1 ){
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));
    }

    static clearAllSearchedUsersFromStorage(){
        localStorage.removeItem("searched");
    }
}