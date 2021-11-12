## Web API

# **A NodeJS project of WebAPI**

## **Project Requirement**

Write a server (or Serverless) that implenents a simple RESTful Web API. You can use the language and framework of your choice (Node/Express, Java/Springboot, Python/Flask, or other similar). It is a API that allows to keep track of notes. Each note has the following JSON format,

```json
{
  "id": 0,
  "title": "Note to self",
  "description": "Take out the garbage",
  "when": 1624631009
}
```

where `when` is a Unix Epoch time.

The API must implement the following routes,

```text
GET /notes

to return a list of all the notes.
```

```text
GET /notes/{id}

to only return the note with `id`={id}
```

```text
POST /notes

to create a new note.
```

<br>

## **Project Setup Guide**

---

<br>

### **NodeJS Installation**

Download and install Node.js from https://nodejs.org
<br>
<br>

### **Clone the Project**

Clone the project into your local folder from https://github.com/cssam/irdetoi-webapi  
<br>

## **Code Description**

---

<br>

### **Development IDE**

This project uses VSCODE with follwoing libraries.
This project uses EditorConfig to standardize test editor configuration. Visit https://editorconfig.org for details.

This project uses ESLint to detect suspicious code in Javascript files. Visit https://eslint.org for details.

<br>

### **Project Configuration**

Configurations of the project implemented in `config` folder.

App configurations defined in `config.js`. It reads values from `.env` files.

`development.env` defines development phase configurations and uses as

```
const dotenv = require("dotenv");
```

There are two types of database configurations defined here. `mongodb.connection.js` and `mongoos.connection.js`.  
This app uses `mongoos` Object Data Modeling library to define Documents of the app. Visit https://mongoosejs.com/ for details.

#### **Database**

Project database created in Atlas cloud. Connection is provided with
`mongodb+srv://<username>:<password>@lab-cluster.5hnte.mongodb.net/irdetoi`

### **Project Setup**

Run `npm install` in the project folder.  
<br>
<br>

### **App Security**

<br>

#### **Incoming call security**

<br>

This project uses JWT to detect incoming api calls authority. Visit https://jwt.io/ for details.
`jsonwebtoken` library uses in app security controller `auth.controller.js`.

```
const jwt = require("jsonwebtoken");
```

When user get registered to the app, it will return JWT token back.

This token need to send in all other api calls to the app. There are two ways app can verify incoming token.  
The simple way is passing as a header parameter; `const token = req.headers["x-access-token"];` and it will be verified in

```
jwt.verify(token, config.jwt_secret, (err, decoded) => {
```

In this app we are using different approach.**`Passport`**! It descibes in below.

#### **User verification**

This project uses `Passport` library for user verification and session management. Visit http://www.passportjs.org/ for details. In app routes such as `auth.route.js` and `note.route.js` uses the library.

```
const passport = require("passport");

```

There are hundereds of stratergys implemented with `Passport`.  
Using `passport`, `passport-jwt`, `passport-local` libraries app implemented with `local` and `jwt` stratergies in ` lib\passport\index.js`.

```
passport.use(new LocalStrategy(
```

and

```
passport.use(new JWTStrategy(
```

In addition to above, following libraries are uses to help app security as well.  
`bcryptjs`, `cookie-parser`, `crypto`  
<br>

### **CORS**

This app confiured for CORS using `cors` library.
Later we can allocate trusted urls in `ALLOW_LIST`.

### **Routes**

Routes of the app are implemented in `auth,route.js` and `note.route.js`

```
router.post("/register", auth_controller.register);

router.post("/login", auth_controller.login);
```

```
router.get("/notes/:userid", passport.authenticate("jwt", { session: false }), note_controller.getNoteList);

router.get("/note/:id", passport.authenticate("jwt", { session: false }), note_controller.getNote);

router.post("/note", passport.authenticate("jwt", { session: false }), note_controller.createNote);
```

<br>
<br>

#### **Controllers**

There are controllers implemented in `controller` folder of the project; `auth.controller.js` and `note.controller.js`.

In `auth.controller` many functions implemented related to app security and user session management. Such as `register`, `login`, `verifyToken`, `getToken`, `currentUser`, and `logout`.

In `note.controller`; functions implemented to facilitated list, create, and get notes respectively `getNoteList`, `createNote`,and `getNote`.  
In both controller `express-validator` has used to verify `request` data and handles error returns.

#### **Models and Schemas**

In the `models` folder, `user` and `note` models have implemented.  
This app uses `mongoos` Object Data Modeling library to implement schemas of the app documents. Visit https://mongoosejs.com/ for details.
There are many functions implemented for user management in the `services` folder `user.service.js`.
