## Dstopia Blog👋
  

### Setup local development

1. clone repository

    ```
    git clone https://github.com/dstopia/dstopia.git
    cd dstopia
    ```

2. install packages

    ```
    npm install
    ```

3. run server
    ```
    npm run dev
    ```

### Membuat page baru

1. edit file ./src/routes/index.js lalu tambahkan kode
    ```
    /* GET <nama page> page. */
    router.get('/<nama page>', function (req, res) {
        res.render('<nama page>')
    })
    ```
2. buat file baru di folder views 
    ```
    <nama page>.ejs
    ```
3. untuk membuka page di browser
    ```
    http://localhost:3000/<nama page>
    ```
> **_Note:_** file ejs sama seperti file html hanya beda ekstensi, file ejs di gunakan karena app ini menggunakan view template ejs

### Router yg tersedia


http://localhost:3000/\
http://localhost:3000/:username\
http://localhost:3000/login\
http://localhost:3000/signup
