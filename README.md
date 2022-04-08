## Web API

# **A NodeJS, AtlasDB, AWS Fargate**

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

Clone the project into your local folder from https://github.com/cssam/Lab-Node-Atlas-API  
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

![irdetoi-database](https://user-images.githubusercontent.com/6191308/141512590-e73233a5-7dd4-4fe6-b622-60af4926b8ab.png)

![note-document-items](https://user-images.githubusercontent.com/6191308/141512651-7efcbb18-0266-4411-bf8b-66f8dfe64c0e.png)

![user-document-item](https://user-images.githubusercontent.com/6191308/141512686-8d33a6d1-3ee5-46c4-93a1-85219e41597d.png)

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

### **Testing**

Here are screenshots of `Postman` testing for the project.

![user_register](https://user-images.githubusercontent.com/6191308/141512900-d3aba10c-1949-41f8-ab9a-135a7e6e51e4.png)

![user_login](https://user-images.githubusercontent.com/6191308/141512910-09bf6b36-6a04-49db-a956-709dd2e0f11c.png)

![create_note](https://user-images.githubusercontent.com/6191308/141512937-697ddf74-ebdb-4baa-944f-e30ebc668434.png)

![list_notes](https://user-images.githubusercontent.com/6191308/141512947-d550e2a8-99cb-4c51-905b-85a1efdfe0ea.png)

## **Deployment - Staging**

App is deployed and configured in `Heroku` cloud server. You can access through `Postman`.
![Heroku - regiter](https://user-images.githubusercontent.com/6191308/141882861-3ff695c5-9b85-4d66-9b68-b1f4952b869a.png)

![Heroku- add token](https://user-images.githubusercontent.com/6191308/141882921-1d94b66a-bf85-4af9-bcb7-8553f29d7dde.png)

![Heroku - login](https://user-images.githubusercontent.com/6191308/141882868-26307fe1-bc12-4a25-9d05-7653ccc0df01.png)

![Heroku - create note](https://user-images.githubusercontent.com/6191308/141882897-b63c683b-a59a-4278-b606-63ae2e637022.png)

![Heroku - get notes](https://user-images.githubusercontent.com/6191308/141882941-11d271e9-639a-4877-92a4-aa4900950ec6.png)


## **Deployment - Staging**
App is deployed and configured in `AWS Elasticbeanstalk` cloud server. You can access through `Postman`.

![EBS - register](https://user-images.githubusercontent.com/6191308/143487559-33a0b190-a1d5-48b3-923e-6556837c7313.png)

![EBS - login](https://user-images.githubusercontent.com/6191308/143487576-3529e373-6f3c-4915-a26c-40f2ca6a12b8.png)

![EBS - create note](https://user-images.githubusercontent.com/6191308/143487588-1923a78d-bee7-4f95-87b2-eba5424a434e.png)

![EBS - create note](https://user-images.githubusercontent.com/6191308/143487611-fa709c31-74d4-451e-8c78-b90835a5c8f4.png)

![EBS - Env](https://user-images.githubusercontent.com/6191308/143487733-c759ee09-eb56-4abb-8f63-7f00ee825c00.png)

![AWS CodePipeline](https://user-images.githubusercontent.com/6191308/143487840-37a2e668-2783-449f-8b70-039c43f6c209.png)






