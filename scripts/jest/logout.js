// logout.js
function log_out() {
    localStorage.clear();
    window.location.href = "../pages/login.html";
}

module.exports = log_out;
