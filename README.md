## Dstopia Blog👋

### Run local development

1. Clone repository
    ```
    git clone https://github.com/dstopia/dstopia.git
    
    cd dstopia
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Run server using nodemon
    ```
    npm run dev
    ```

### Router list

1.  /user

    -   GET : get all users
    -   POST : add new user
        > body :
        >
        > -   username : min 4, max 20, lowercase, required
        > -   email : required
        > -   password : min 6, required
