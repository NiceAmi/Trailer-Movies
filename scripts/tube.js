import { Movies } from "./helpers/helpers.js";

if (!(localStorage.getItem("userData"))) {
    let Udetails = document.getElementById("Udetails");
    Udetails.innerHTML = "";
    window.location.href = "../pages/login.html";
} else {
    let userNameSpan = document.getElementById("userName");
    let fnameSpan = document.getElementById("fname");
    let lnameSpan = document.getElementById("lname");
    let BirthSpan = document.getElementById("dateOfBirth");
    let ageSpan = document.getElementById("age");
    let emailSpan = document.getElementById("email");
    let localData = localStorage.getItem("userData");
    localData = JSON.parse(localData);
    console.log(localData);
    document.getElementById("closeButton").addEventListener('click', closeNotification)
    let userBirthdate = localData.dateOfBirth;
    let userBirthday = new Date(userBirthdate);
    let today = new Date();
    let notification = document.getElementById('birthdayNotification');

    if (userBirthday.getMonth() === today.getMonth() && userBirthday.getDate() === today.getDate()) {
        notification.style.display = 'block';
    }

    function closeNotification() {
        notification.style.display = 'none';
    }

    userNameSpan.innerText = 'Hello:' + ' ' + localData.userName + ',';
    fnameSpan.innerText = localData.fname + '';
    lnameSpan.innerText = localData.lname + ', Date of birth:';
    BirthSpan.innerText = localData.dateOfBirth + ', Age:';
    ageSpan.innerText = localData.age + ', Email:';
    emailSpan.innerText = localData.email + '. ' + 'Nice to see you again';

}
let moviesData = [];
let moviesindex
let ajax = new XMLHttpRequest();
ajax.open("get", "../data/videos.json", true);
ajax.onload = function () {
    let response = JSON.parse(this.responseText);
    let data = response.videos;
    moviesData.push(...data);
    console.log(moviesData);
    showMovies()
};
ajax.send();

let loader = document.getElementById('loader');
loader.style.display = "none";

function setMovies(moviesData) {
    let element = document.getElementById("showMovies");
    element.innerHTML = "";
    for (let x in moviesData) {
        let obj = moviesData[x];
        let newElement = document.createElement("div");
        let deleteButtonId = `deleteButton_${x}`
        let editButtonId = `editButton_${x}`
        newElement.innerHTML +=
            `<ul>
            <video src="${obj.url}" id="url" controls></video><br>
            <li>Add by user: ${obj.addByUser}</li>
            <li>Video name: ${obj.Name}</li>
            <li>Video title: ${obj.title}</li>
            <li>Video creator: ${obj.creator}</li>
            <li>Video adde at: ${obj.added}</li>
            <li>Number of viewers: ${obj.viewes}</li>
            <li>Number of subscrbes: ${obj.subscribe}</li>
                        <li>URL: ${obj.url}</li>
            <button id="${deleteButtonId}" class="delete-button">Delete</button>
            <button id="${editButtonId}" class="edit-button">Edit</button>
</ul>`;
        newElement.className = "newDiv";
        element.insertAdjacentElement("beforeend", newElement);
        document.getElementById(deleteButtonId).addEventListener('click', () => {
            deleteMovie(x);
        });
        document.getElementById(editButtonId).addEventListener('click', () => {
            edit_movie(x);
        });
    }
}


const showMovies = () => {
    setMovies(moviesData)
}
let addByUser = document.getElementById("addByUser")
let Name = document.getElementById("mName")
let title = document.getElementById("mTitle")
let creator = document.getElementById("mCreator")
let added = document.getElementById("mAdded")
let url = document.getElementById("mUrl")


function edit_movie(index) {
    loader.style.display = 'block';

    setTimeout(function () {

        let movie = moviesData[index];
        moviesindex = index;

        addByUser.value = movie.addByUser
        Name.value = movie.Name
        title.value = movie.title
        creator.value = movie.creator
        added.value = movie.added
        url.value = movie.url
        loader.style.display = 'none';

    }, 3000)
}

let setEdit = document.getElementById("sedit");
setEdit.addEventListener("click", setEdit_movie)
function setEdit_movie() {
    loader.style.display = 'block';

    setTimeout(function () {

        if (!(Name.value == "" || title.value == "" || creator.value == "" ||
            added.value == "" || url.value == "")) {

            moviesData[moviesindex].addByUser = addByUser.value
            moviesData[moviesindex].Name = Name.value
            moviesData[moviesindex].title = title.value
            moviesData[moviesindex].creator = creator.value
            moviesData[moviesindex].added = added.value
            moviesData[moviesindex].url = url.value

            addByUser.value = "";
            Name.value = "";
            title.value = "";
            creator.value = "";
            added.value = "";
            url.value = "";
            setMovies(moviesData);

        } else {
            alert("Missing data!")
        }
        loader.style.display = 'none';

    }, 3000)
}



const uploadBtn = document.getElementById("uploadBtn");
const uploadPopup = document.getElementById("uploadPopup");
const closePopupBtn = document.getElementById("closePopupBtn");

uploadBtn.addEventListener("click", () => {
    let localData = localStorage.getItem("userData");
    localData = JSON.parse(localData);

    popupAddByUser.value = localData.userName;

    uploadPopup.style.display = "block";
});

closePopupBtn.addEventListener("click", () => {
    uploadPopup.style.display = "none";
});

const uploadVideoBtn = document.getElementById("uploadVideoBtn");
const popupAddByUser = document.getElementById("popupAddByUser");
const popupVideoName = document.getElementById("popupVideoName");
const popupVideoTitle = document.getElementById("popupVideoTitle");
const popupVideoCreator = document.getElementById("popupVideoCreator");
const popupFileInput = document.getElementById("popupFileInput");

uploadVideoBtn.addEventListener("click", () => {
    loader.style.display = 'block';

    setTimeout(function () {

        const file = popupFileInput.files[0];
        const addByUser = popupAddByUser.value;
        const videoName = popupVideoName.value;
        const videoTitle = popupVideoTitle.value;
        const videoCreator = popupVideoCreator.value;
        const today = new Date().toLocaleDateString();

        const newMovie = new Movies(addByUser, videoName, videoTitle, today, videoCreator, 0, 0, URL.createObjectURL(file));
        moviesData.unshift(newMovie);
        setMovies(moviesData);
        uploadPopup.style.display = "none";
        popupAddByUser.value = "";
        popupVideoName.value = "";
        popupVideoTitle.value = "";
        popupVideoCreator.value = "";
        popupFileInput.value = "";
        loader.style.display = 'none';

    }, 3000)

});


const videos = document.querySelectorAll('video');

for (let i = 0; i < videos.length; i++) {
    const video = videos[i];

    video.addEventListener('mouseover', function () {
        video.play();
    });

    video.addEventListener('mouseout', function () {
        video.pause();
    });
}



for (let i = 0; i < moviesData.length; i++) {
    setTimeout(function () {

        const videoData = moviesData[i];

        const video = document.createElement('video');
        video.src = videoData.url;
        video.controls = true;

        video.addEventListener('mouseover', function () {
            video.play();
        });

        video.addEventListener('mouseout', function () {
            video.pause();
        });

        const containerDiv = document.getElementById('showMovies');
        containerDiv.appendChild(video);
    }, 3000)

}



let out = document.getElementById("out");
out.addEventListener("click", log_out)

function log_out() {
    localStorage.clear();
    window.location.href = "../pages/login.html";
}


const deleteMovie = (index) => {
    moviesData.splice(index, 1);
    setMovies(moviesData);
}

function setWatch() {
    let date = new Date()
    let hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    let watch = document.getElementById("watch");
    watch.innerHTML = hours + ":" + minutes + ":" + seconds;
}
setInterval(function () {
    setWatch()
}, 1000);




