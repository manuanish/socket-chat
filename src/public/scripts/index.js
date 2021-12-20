var socket = io();

// parse emojis
twemoji.parse(
  document.body,
  {
    callback: function(icon, options) {
      return 'https://abs-0.twimg.com/emoji/v2/svg/' + icon + '.svg';
    },
    size: 128
  }
);

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

// check for form submit
document.querySelector("#password_form").addEventListener("submit", function(e){
  e.preventDefault();
  socket.emit("request_password");
});

socket.on("return_password", (password) => {
  localStorage.setItem('room_password', document.getElementById('password_input').value);
  if (document.getElementById('password_input').value !== password){
    document.getElementById('form_group_password').className = "form-group errored";
    document.getElementById('password-input-validation').className = "note error"
    document.getElementById('password-input-validation').textContent = "Incorrect Password!"
    if (isEmptyOrSpaces(document.getElementById('username_input').value)){
      document.getElementById('form_group_password').className = "form-group errored mt-6";
      document.getElementById('form_group_username').className = "form-group warn";
      document.getElementById('username-input-validation').className = "note warning"
      document.getElementById('username-input-validation').textContent = "Invalid Username!"
    } else {
      document.getElementById('form_group_password').className = "form-group errored mt-6";
      document.getElementById('form_group_username').className = "form-group successed";
      document.getElementById('username-input-validation').className = "note success"
      document.getElementById('username-input-validation').textContent = "Valid Username."
    }
  } else {
    document.getElementById('form_group').className = "form-group successed";
    document.getElementById('password-input-validation').className = "note success"
    document.getElementById('password-input-validation').textContent = "Correct Password!"
    if (isEmptyOrSpaces(document.getElementById('username_input').value)){
      document.getElementById('form_group_password').className = "form-group successed mt-6";
      document.getElementById('form_group_username').className = "form-group warn";
      document.getElementById('username-input-validation').className = "note warning"
      document.getElementById('username-input-validation').textContent = "Invalid Username!"
      document.getElementById('password-input-validation').className = "note success"
      document.getElementById('password-input-validation').textContent = "Correct Password!"
    } else {
      document.getElementById('form_group_password').className = "form-group successed mt-6";
      document.getElementById('form_group_username').className = "form-group successed";
      document.getElementById('username-input-validation').className = "note success"
      document.getElementById('username-input-validation').textContent = "Valid Username!"
      if (localStorage.getItem('loggedIn') == "true"){
        console.log("rip")
      } else {
        socket.emit("decrease_client_count");
        socket.emit("user_joined_room", document.getElementById('username_input').value)
        localStorage.setItem("username", document.getElementById('username_input').value);
        localStorage.setItem("loggedIn", "true");
        window.location.replace("../app");
      }
    }
  }
});

socket.emit("request_room_name");
socket.on("return_room_name", (room_name) => {
  document.getElementById('room_name').textContent = room_name
  document.getElementById('room_name_title').textContent = room_name
});
