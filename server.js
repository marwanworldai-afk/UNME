const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ===== اتصال MongoDB ===== */
mongoose.connect("mongodb://127.0.0.1:27017/bankDB")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

/* ===== Model ===== */
const User = mongoose.model("User", {
  name: String,
  acc: String,
  pin: String,
  balance: Number
});

/* ===== إنشاء حساب ===== */
app.post("/create", async (req,res)=>{
  const user = new User({
    name: req.body.name,
    acc: req.body.acc,
    pin: req.body.pin,
    balance: 0
  });

  await user.save();
  res.json({msg:"done"});
});

/* ===== تسجيل دخول ===== */
app.post("/login", async (req,res)=>{
  const user = await User.findOne({
    acc: req.body.acc,
    pin: req.body.pin
  });

  if(user){
    res.json(user);
  }else{
    res.json({msg:"error"});
  }
});

/* ===== كل العملاء ===== */
app.get("/users", async (req,res)=>{
  const users = await User.find();
  res.json(users);
});

/* ===== تشغيل السيرفر ===== */
app.listen(3000, ()=>{
  console.log("Server running on http://localhost:3000");
});