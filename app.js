const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.json({ message: "Welcome to contact book application" });
});

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
    });

    app.use((err, req, res, next) => {
        // Middleware xử lý lỗi tập trung.
        // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
        return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
        });
        });

module.exports = app;