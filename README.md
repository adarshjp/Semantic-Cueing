# Semantic-Cueing
<p align="center"
<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="41px" height="41px"></a>
<a href="https://www.mongodb.org/" title="MongoDB"><img src="https://github.com/get-icon/geticon/raw/master/icons/mongodb-icon.svg" alt="MongoDB" width="41px" height="41px"></a>
</p>

### Semantic Cueing is a system which helps to provide a speech therapy to patients with cognitive disabilities.

<br>

### Installation Instructions
- Clone this repository to your local machine.
- Run the following command in your terminal:

    ```npm install```
- Create a file named .env in the root directory of this repository.
- Fill in the following variables in the .env file:
    - ```DB_URL_DEV``` - The URL of your local MongoDB database.
    - ```DB_URL_PROD``` - The URL of your production MongoDB database.
    - ```DB_URL_QA``` - The URL of your QA MongoDB database.        
    - ```secret``` - The secret key, can be any string.
    - ```algorithm``` - The algorithm used to hash the secret key. Examples are aes256, sha256, md5, etc.
    - ```EMAIL_ID``` - The email address of the email account used to send emails.
    - ```PASS``` - The password of the email account used to send emails.
    - ```key``` - The key used to encrypt and decrypt the email account password, which is of length 32 and alphanumeric.
    - ```ivstring``` - The initialization vector used to encrypt and decrypt the email account password, which is of length 16 and alphanumeric.
    - ```ADMIN_USERNAME``` - The username of the admin account.
    - ```ADMIN_PASSWORD``` - The password of the admin account.
- To run the server, run the following command in your terminal:

    - ```npm run dev``` - Start server in development mode.
    - ```npm start``` - Start server in production mode.
    - ```npm test``` - Start server in QA mode. 

### Instructions to create a ADMIN account
- Open ```controllers/admin.js``` in your text editor.
- Change the following line of code 
    ```js 
    router.post("/register", upload.array("displaypic", 1), isLoggedIn, isAdmin, registerValidator, register_post);
    ```
- Change the line to:
    ```js
    router.post("/register",upload.array("displaypic", 1), register_post);
    ```
- Make a `POST` request to `/register` using POSTMAN
- The request body should be:
    ```json
    {
        "username": "SOME_VALUE",
        "password": "SOME_VALUE",
        "email": "SOME_VALUE",
        "name": "SOME_VALUE",
        "displaypic": "SOME PICTURE",
        "age": "SOME_VALUE",
        "role": "admin"
    }
    ```
- After creating the ADMIN account, revert the changes made in `controlllers/admin.js`.


