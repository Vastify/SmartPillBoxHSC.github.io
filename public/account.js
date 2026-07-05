// go to account page when clicking icon
const accountBtn = document.getElementById("accountBtn");
if(accountBtn){
    accountBtn.onclick = () => window.location.href = "account.html";
}

// check if logged in and show logout
function updateAccountIcon(){
    const user = localStorage.getItem("loggedInUser");
    if(user && accountBtn){
        accountBtn.innerHTML = "Logout";
        accountBtn.onclick = logout;
    }
}
updateAccountIcon();

// signup
function signup(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "" || password === ""){
        document.getElementById("message").innerText = "Fill all fields";
        return;
    }

    localStorage.setItem("user_"+username, password);
    document.getElementById("message").innerText = "Account created. You can login now.";
}

// login
function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedPassword = localStorage.getItem("user_"+username);

    if(storedPassword === password){
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    }else{
        document.getElementById("message").innerText = "Incorrect login";
    }
}

// logout
function logout(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}