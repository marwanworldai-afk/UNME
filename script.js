// Splash 6 seconds
window.onload = function(){
    setTimeout(()=>{
      document.getElementById("splash").style.display="none";
      document.getElementById("loginPage").classList.remove("hidden");
    },3000);
  };
  
  function login(){
  
    let acc = document.getElementById("accNumber").value;
    let pin = document.getElementById("pin").value;
  
    let accError = document.getElementById("accError");
    let pinError = document.getElementById("pinError");
  
    accError.innerText = "";
    pinError.innerText = "";
  
    document.getElementById("accNumber").style.border="1px solid #ccc";
    document.getElementById("pin").style.border="1px solid #ccc";
  
    // fake check
    if(acc === "123456" && pin === "1234"){
      alert("تم الدخول ✔️");
    } else {
      accError.innerText = "البيانات غير صحيحة";
      pinError.innerText = "البيانات غير صحيحة";
  
      document.getElementById("accNumber").style.border="1px solid red";
      document.getElementById("pin").style.border="1px solid red";
    }
  }


  function login(){

    let acc = document.getElementById("accNumber").value;
    let pin = document.getElementById("pin").value;
    let error = document.getElementById("error");
  
    // الحساب الصحيح (مؤقت)
    let validAcc = "123456";
    let validPin = "1234";
  
    if(acc === validAcc && pin === validPin){
  
      // يفتح صفحة البنك
      window.location.href = "bank.html";
  
    } else {
  
      error.innerText = "البيانات غير صحيحة ❌";
    }
  }