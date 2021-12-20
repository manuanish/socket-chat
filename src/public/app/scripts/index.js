var socket = io();


window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    sessionStorage.removeItem('__lock');
});

window.addEventListener('unload', function (event) {
    localStorage.setItem('loggedIn', 'false')
});

if (sessionStorage.getItem('__lock')) {
    sessionStorage.clear();
    console.warn('Found a lock in session storage. The storage was cleared.');
    window.location.replace("../../");
}

sessionStorage.setItem('__lock', '1');

mainForm = document.getElementById('mainForm');
messageInput = document.getElementById('messageInput');
nickName = document.getElementById('nickName');
messages = document.getElementById('messages');

socket.emit("request_room_name");
socket.on("return_room_name", (room_name) => {
  // document.getElementById('room_name').textContent = room_name
  document.getElementById('room_name_title').textContent = room_name
  document.getElementById('nickName').textContent = localStorage.getItem('username');
  socket.emit('updateClientCount')
});

socket.on("client_count_update", (client_count) => {
  document.getElementById('client_count').textContent = client_count;
});

socket.on("add_user_to_list", (usr_name, sock_id) => {
  var li_eli = document.createElement('li');
  var al_content = document.createElement('span');
  var al_label = document.createElement('span');

  li_eli.id = sock_id;
  li_eli.className = "ActionList-item";
  al_content.className = "ActionList-content";
  al_label.className = "ActionList-item-label";
  al_label.textContent = usr_name;

  document.getElementById('user_list').appendChild(li_eli);
  li_eli.appendChild(al_content);
  al_content.appendChild(al_label);



});

mainForm.addEventListener('submit', function(f) {
  f.preventDefault();
  if (messageInput.value) {
    socket.emit('chat_message', localStorage.getItem('username'), messageInput.value, new Date().toLocaleTimeString())

    var msg_client = document.createElement('div');
    var msg_bubble = document.createElement('div');
    var cli_username = document.createElement('div');
    var msg_content = document.createElement('div');
    var cli_username_span = document.createElement('span');
    var cli_time_span = document.createElement('span');

    msg_client.className = 'clientMessage';
    msg_bubble.className = 'messageBubble color-bg-accent p-2 mt-1 rounded-2 border color-border-accent';
    cli_username.className = 'clientUsername';
    cli_username_span.className = 'text-bold';
    cli_time_span.className = 'messageTime text-light color-fg-accent';
    msg_content.textContent =  messageInput.value;
    cli_username_span.textContent = localStorage.getItem('username');
    cli_time_span.textContent = new Date().toLocaleTimeString();

    messages.appendChild(msg_client);
    msg_client.appendChild(msg_bubble);
    msg_bubble.appendChild(cli_username);
    cli_username.appendChild(cli_username_span);
    cli_username.appendChild(cli_time_span);
    msg_bubble.appendChild(msg_content);
    msg_client.scrollIntoView();
    messageInput.value = '';

    twemoji.parse(
      document,
      {
        callback: function(icon, options) {
          return 'https://abs-0.twimg.com/emoji/v2/svg/' + icon + '.svg';
        },
        size: 128
      }
    );
  }
});

socket.on('chat_message', function(usr_name, msg, msg_time) {
  var msg_client = document.createElement('div');
  var msg_bubble = document.createElement('div');
  var cli_username = document.createElement('div');
  var msg_content = document.createElement('div');
  var cli_username_span = document.createElement('span');
  var cli_time_span = document.createElement('span');

  msg_client.className = 'serverMessage';
  msg_bubble.className = 'messageBubble color-bg-subtle p-2 mt-1 rounded-2 border color-border-subtle';
  cli_username.className = 'clientUsername';
  cli_username_span.className = 'text-bold';
  cli_time_span.className = 'messageTime text-light color-fg-subtle';
  msg_content.textContent =  msg;
  cli_username_span.textContent = usr_name;
  cli_time_span.textContent = msg_time;

  messages.appendChild(msg_client);
  msg_client.appendChild(msg_bubble);
  msg_bubble.appendChild(cli_username);
  cli_username.appendChild(cli_username_span);
  cli_username.appendChild(cli_time_span);
  msg_bubble.appendChild(msg_content);
  msg_client.scrollIntoView();

  twemoji.parse(
    document,
    {
      callback: function(icon, options) {
        return 'https://abs-0.twimg.com/emoji/v2/svg/' + icon + '.svg';
      },
      size: 128
    }
  );
});
