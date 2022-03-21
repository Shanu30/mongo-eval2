const express = require("express");
const app = express();
const Task = require("./task.model.js");
const cors = require("cors");
const port = 8000;
const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://Shanu30:1234@cluster0.bilae.mongodb.net/mongo";


app.use(express.json());
app.use(cors());

 function connect() {
   mongoose.connect(dbUrl);
}
app.get("/tasks", async (req, res) => {
    try {
    } catch (e) {
      console.log(e.message);
    }
    const tasks = await Task.find();
    res.status(200).json(tasks);
  });
  



app.listen(port, async(req,res)=>{
    try{
        connect()
        console.log(`Listening to ${port}`);
    }catch(e){
        console.log(e.message)
    }
})