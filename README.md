# memories_app
A - SETUP ENVIRONMENT
1. Vào thư mục client, tạo react app: npx create-react-app ./
2. Vào cd client, chạy các lệnh sau:
    + npm install @material-ui/core
    + npm install @material-ui/icons
    + npm install @material-ui/lab
    + npm install chip-input
    + npm install react-redux
    + npm install moment
    + npm install react-router-dom
    + npm install @react-oauth/google@latest
    + npm install jwt-decode
3. Vào thư mục server, tạo file index.js, sau đó chạy lệnh: npm init -y (để tạo package.json trống).
4. Vào cd server Chạy các lệnh sau:
    + npm install body-parser
    + npm install cors
    + npm install express
    + npm install mongoose
    + npm install nodemon
    + npm install bcryptjs
    + npm install jsonwebtoken
5. Vào server/index.js, import các package cần thiết.
6. Vào server/node_modules/package.json, thêm dòng lệnh: "type": "module" vào dưới lệnh "main": "index.js". Và xóa "test": ... thay vào lệnh "start": "nodemon index.js".
7. Vào github của JavaScriptMaster, copy file client/package.json, sau đó chạy lệnh: npm install --legacy-peer-deps

B - MONGODB
1. Vào https://www.mongodb.com/cloud/atlas
2. Tạo tài khoản.
3. Tạo Project mới.
4. Vào mục Database, chọn Build Database, chọn gói MO (free) và ấn Create.
5. Tạo DB user, chọn Add current IP address và tạo.
6. Chọn vào connect --> ...MongoDB with VS Code --> copy connection string.
7. Vào server/index.js, tạo biến const CONNECTION_URL và dán connection string vào, thay đổi <username> và <password> thành DB user đã tạo trên mongodb.

NOTES:
1. Khi import bất kì component nào ở phía server, đều phải ghi rõ phần đuôi mở rộng (.js)
2. Một số mã code http, tìm hiểu ở link https://www.restapitutorial.com/httpstatuscodes.html
3. Các biến lưu vào file .env thì cần phải chạy lệnh này để có thể dùng các biến đó: npm install dotenv. Sau đó import dotenv from 'dotenv'; và dùng lệnh dotenv.config(); Tuy nhiên file .env sẽ không được up lên github, do đó tạo ra file .env.example và gõ code như mẫu bên trong.

DEPLOY:
A - BACKEND: Dùng Cyclic
1. Đăng nhập Cyclic.
2. Chọn Link your own.
3. Chỉnh lại script ở file package.json trong folder server thành:
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
4. Thêm code sau vào server/index.js:
    app.use(cors({
        credentials: true,
        origin: "*",
    }));
5. Trở lại dashboard của Cyclic, chọn vào project vừa tạo ---> variables --> tạo ra key = CONNECTION_URL --> nhập value = chuỗi kết nối mongodb trong code.
6. Thay đổi subdomain cho dễ nhớ.
7. Đổi baseURL trong client/api/index.js thành API backend mới tạo.

B - FRONTEND: Dùng Netify