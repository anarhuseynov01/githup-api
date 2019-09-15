// elements


const githubform = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");


const github = new Github();
const ui = new UI();

eventListener();


function eventListener(){

    githubform.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched)


}


function getData(e){

    let username = nameInput.value.trim();

    if(username === ""){
        alert("Please write username!");
    }else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("User didn't find");
            }else {
                ui.addSearchedToUI(username);
                Storage.addSearchUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}


function clearAllSearched(){

    if(confirm("Are you sure?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedUI();
    }

}


function getAllSearched(){
    let users = Storage.getSearchedUserFromStorage();
    let result = "";
    users.forEach((user)=>{
        result += `<li class="list-group-item">${user}</li>`
    })

    lastUsers.innerHTML = result;
}