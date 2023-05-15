# memories_app
A - SETUP ENVIRONMENT
1. Vào thư mục client, tạo react app: npx create-react-app ./
2. Vào cd client, chạy các lệnh sau:
    + npm install @material-ui/core
    + npm install @material-ui/icons
    + npm install react-redux
    + npm install moment
3. Vào thư mục server, tạo file index.js, sau đó chạy lệnh: npm init -y (để tạo package.json trống).
4. Vào cd server Chạy các lệnh sau:
    + npm install body-parser
    + npm install cors
    + npm install express
    + npm install mongoose
    + npm install nodemon
5. Vào server/index.js, import các package cần thiết.
6. Vào server/node_modules/package.json, thêm dòng lệnh: "type": "module" vào dưới lệnh "main": "index.js". Và xóa "test": ... thay vào lệnh "start": "nodemon index.js".
7. Vào github của JavaScriptMaster, copy file client/package.json, sau đó chạy lệnh: npm install --legacy-peer-deps

B - MONGODB
1. Vào https://www.mongodb.com/cloud/atlas
2. Tạo tài khoản.
3. Tạo Project mới.
4. Vào mục Database, chọn Build Database, chọn gói MO (free) và ấn Create.
5. Tạo DB user, chọn Add current IP address và tạo.
6. Chọn vào connect --> driver --> copy connection string.
7. Vào server/index.js, tạo biến const CONNECTION_URL và dán connection string vào, thay đổi <username> và <password> thành DB user đã tạo trên mongodb.

NOTES:
1. Khi import bất kì component nào ở phía server, đều phải ghi rõ phần đuôi mở rộng (.js)
2. Một số mã code http, tìm hiểu ở link https://www.restapitutorial.com/httpstatuscodes.html