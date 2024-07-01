Used Technology : React Js, Node Js, Mysql, HTML, CSS, Cookies
Project running video : https://www.loom.com/share/ca9f31db5bea41458b12d2965d4bb36b


Run BE : 
1. Install mysql and run below command
    1. create database permission;
    2. use permission;
    3. CREATE TABLE `users` ( `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `phone_number` bigint NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `permission` varchar(255) NOT NULL, `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`), UNIQUE KEY `email` (`email`) ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    4. INSERT INTO users (name, email, phone_number, password, permission) VALUES ('John Doe', 'john.doe@example.com', '1234567890', 'password1', 'VIEW,CREATE'), ('Jane Smith', 'jane.smith@example.com', '0987654321', 'password2', 'VIEW,EDIT,DELETE'), ('Alice Johnson', 'alice.johnson@example.com', '5555555555', 'password3', 'VIEW,CREATE,EDIT,DELETE');

2. Go to permission_assignment_backend folder
3. npm i
4. node app.js

Run FE:
1. Go to permision_assignment_frontend
2. npm i
3. npm start