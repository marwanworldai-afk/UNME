/* ================= SPLASH ================= */
window.onload = function(){
  setTimeout(()=>{
    document.getElementById("splash").style.display="none";
    document.getElementById("loginPage").classList.remove("hidden");
  },3000);
};


/* ================= FIREBASE ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-vEbe_F8d6-vLZQpTfhtbv8k5n77tV1w",
  authDomain: "un-me-15395.firebaseapp.com",
  databaseURL: "https://un-me-15395-default-rtdb.firebaseio.com",
  projectId: "un-me-15395"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


/* ================= LOGIN ================= */
window.login = async function(){

  let acc = document.getElementById("accNumber").value.trim();
  let pin = document.getElementById("pin").value.trim();

  let accError = document.getElementById("accError");
  let pinError = document.getElementById("pinError");

  accError.innerText = "";
  pinError.innerText = "";

  // 🔥 حساب البنك
  if(acc === "123456" && pin === "1234"){
    localStorage.setItem("currentUser", acc);
    window.location.href = "bank.html";
    return;
  }

  try{

    let snapshot = await get(child(ref(db), 'users/' + acc));

    if(snapshot.exists()){

      let data = snapshot.val();

      if(data.pin == pin){

        localStorage.setItem("currentUser", acc);
        window.location.href = "client.html";

      } else {

        pinError.innerText = "البيانات غير صحيحة ❌";
        document.getElementById("pin").style.border="1px solid red";
        document.getElementById("accNumber").style.border="1px solid red";

      }

    } else {

      accError.innerText = "الحساب غير موجود ❌";
      document.getElementById("accNumber").style.border="1px solid red";

    }

  }catch(e){
    accError.innerText = "مشكلة في الاتصال ❌";
  }

};


/* ================= CREATE ACCOUNT ================= */
window.createAccount = async function(){

  let acc = document.getElementById("newAcc")?.value;
  let pin = document.getElementById("newPin")?.value;

  if(!acc || !pin) return;

  if(acc.length !== 6 || pin.length !== 4){
    alert("اكتب رقم حساب 6 أرقام ورقم سري 4 أرقام");
    return;
  }

  try{

    let snapshot = await get(child(ref(db), 'users/' + acc));

    if(snapshot.exists()){
      alert("الحساب موجود بالفعل ❌");
      return;
    }

    await set(ref(db, 'users/' + acc), {
      pin: pin,
      balance: 0
    });

    alert("تم إنشاء الحساب ✅");

  }catch(e){
    alert("حصل خطأ ❌");
  }

};