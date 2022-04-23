# **socket-chat**
---

A server hosted locally allowing users on the same local area network to chat with each other. This project features.

- A cross-platform desktop application created with `electron` to run the chatroom on any operating system (Window, Mac, Linux).
- Responsive design allowing for mobile and tablet users to connect.
- Local rooms can run without internet acess.
- Private rooms with a password.

## **Prerequisites** 💾
This project requires `NodeJS` installed on your system to run. NodeJS is available for download at https://nodejs.org/en/

## **Usage**
### **Setting up the server** ⚙️
To setup the server navigate to the file located in `src/server-data.json` and change the information e.g Room Name, Password in the file.

### **Running the server** 💡
To start the chat room, begin by cloning this repository using:

```
git clone https://github.com/manuanish/bon5r
cd chat-room
```

Once this is finished, we need to install the dependencies that are required for the server to run.

```
npm install
```

Finally, we can start the server using the command:
```
npm start
```
Now, the server is hosted on you network at `localhost:3000`.
### **Connecting Clients** 🔌
On the machine which the server is running, clients can join using the URL: `http://localhost:3000` . Other users on the local network can connect to the room using your IP adress followed by the port: `http://<local ip>:3000` .

#### **Desktop Application** 💻
The chatroom can also be accessed using an `electron` application. To run this first we go into the folder `electron-app` and execute the following command to install required dependencies.
```
cd electron-app
npm install
```
To launch the application, run the command:
```
npm start
```
Now the application should be running. This can be distributed and packaged using ham `electron-forge` to other clients on different platforms.

> Warning! As of now, the application only works for the user running the server.

---

## **Hosting Globally** 🌍
The server can be hosted on platforms such as `Heroku`, `Google Cloud`, etc. allowing users from around the world to connect to the room. 

### **Planned Features** 💭
Here are some of the things planned to be added soon to the project.
- [ ] Allow all local users to run the Desktop Application.
- [ ] Message history for the running session.
- [ ] Show all online users in the sidebar.

#### **Minor Updates** 🔨
- [ ] Broadcast a message when a user joins the room.
