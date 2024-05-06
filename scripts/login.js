let usersArr = [];
let ajax = new XMLHttpRequest();
ajax.open("get", "../data/users.json", true);
ajax.onload = function () {
    let response = JSON.parse(this.responseText);
    let data = response.users;
    usersArr.push(...data);
    console.log(usersArr);
};
ajax.send();
const login_user = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email == "" || password == "") {
        alert("No data!");
    } else {
       

        let regexEmail = new RegExp(email.value, 'i');
        let regexPass = new RegExp(password.value, 'i');

        console.log(regexEmail);
        console.log(regexPass);
        for (let x in usersArr) {
            let obj = usersArr[x];
            if (obj.email.search(regexEmail)>-1 && obj.password.search(regexPass) >-1) {
                localStorage.clear();
                localStorage.setItem("userData", JSON.stringify(obj));
                window.location.href = "../pages/tube.html";

                break;
            } else {

                alert("Worng Data!");
            }
        }
    }
};
document.getElementById("lgbtn").addEventListener("click", login_user);
