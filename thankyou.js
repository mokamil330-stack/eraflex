window.onload = function () {

  const orderId = localStorage.getItem("orderId");

  if(orderId){
    document.getElementById("orderNumber").innerHTML =
    "Order ID : <span style='color:#16a34a'>" + orderId + "</span>";
  }

  setTimeout(function(){

    document.querySelector(".checkmark").style.transform="scale(1.15)";

    setTimeout(function(){

      document.querySelector(".checkmark").style.transform="scale(1)";

    },300);

  },500);

}
