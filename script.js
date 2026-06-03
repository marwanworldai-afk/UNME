/* ========================================= */
/* 🔥 شاشة البداية */
/* ========================================= */

window.addEventListener("load", function(){

  const splash = document.getElementById("splash");
  const loginPage = document.getElementById("loginPage");

  // تأكد إن العناصر موجودة
  if(splash && loginPage){ 

    // بعد 3 ثواني
    setTimeout(function(){

      // اخفاء شاشة البداية
      splash.style.display = "none";

      // اظهار صفحة تسجيل الدخول
      loginPage.classList.remove("hidden");

    }, 3000);

  }

});


/* ========================================= */
/* 🔐 تسجيل الدخول */
/* ========================================= */

function login(){

  /* ========================= */
  /* 📥 جلب البيانات */
  /* ========================= */

  let accInput = document.getElementById("accNumber"); // حقل رقم الحساب
  let pinInput = document.getElementById("pin");       // حقل الرقم السري
  let error = document.getElementById("errorMsg");     // مكان رسالة الخطأ

  let acc = accInput.value.trim();
  let pin = pinInput.value.trim();

  // تصفير رسالة الخطأ
  error.innerText = "";

  // تصفير البوردر
  accInput.style.border = "1px solid #ccc";
  pinInput.style.border = "1px solid #ccc";


  /* ========================= */
  /* 🧠 تحقق من الإدخال */
  /* ========================= */

  // لازم رقم الحساب 6 أرقام
  if(acc.length !== 6 || isNaN(acc)){
    error.innerText = "❌ رقم الحساب لازم يكون 6 أرقام";
    accInput.style.border = "1px solid red";
    return;
  }

  // لازم الرقم السري 4 أرقام
  if(pin.length !== 4 || isNaN(pin)){
    error.innerText = "❌ الرقم السري لازم يكون 4 أرقام";
    pinInput.style.border = "1px solid red";
    return;
  }


  /* ========================= */
  /* 🏦 حساب البنك (Admin) */
  /* ========================= */

  let adminAcc = "123456";
  let adminPin = "1234";

  if(acc === adminAcc && pin === adminPin){

    // حفظ المستخدم الحالي
    localStorage.setItem("currentUser", acc);

    // دخول صفحة البنك
    window.location.href = "bank.html";

    return;
  }


  /* ========================= */
  /* 👤 حسابات العملاء */
  /* ========================= */

  // جلب الحسابات المخزنة
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // البحث عن الحساب
  let foundAccount = null;

  for(let i = 0; i < accounts.length; i++){

    if(accounts[i].acc === acc && accounts[i].pin === pin){
      foundAccount = accounts[i];
      break;
    }

  }

  // لو الحساب موجود
  if(foundAccount){

    // حفظ المستخدم الحالي
    localStorage.setItem("currentUser", acc);

    // دخول صفحة العملاء
    window.location.href = "client.html";

    return;
  }


  /* ========================= */
  /* ❌ البيانات غلط */
  /* ========================= */

  error.innerText = "❌ البيانات التي أدخلتها غير صحيحة";

  accInput.style.border = "1px solid red";
  pinInput.style.border = "1px solid red";

}