const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

//config

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/exp_manager_gls").then(() => {
    console.log("Connected to database!");
}).catch(() => {
    console.log("Connection failed!");
})


//require routes
const roleRoutes = require('./routes/RoleRoutes');
const userRoutes = require('./routes/UserRoutes');
const expenseRoutes = require('./routes/ExpenseRoutes');

//use routes
app.use("/api",roleRoutes);
app.use("/api",userRoutes);
app.use("/api",expenseRoutes);


const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})