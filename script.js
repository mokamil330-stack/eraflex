const images=[

"images/1.jpg",

"images/2.jpg",

"images/3.jpg",

"images/4.jpg",

"images/5.jpg"

];

let index=0;

setInterval(()=>{

index++;

if(index>=images.length){

index=0;

}

document.getElementById("slide").src=images[index];

},2500);

const form=document.getElementById("orderForm");

form.addEventListener("submit",function(e){

e.preventDefault();

let mobile=document.getElementById("mobile").value;

let pin=document.getElementById("pincode").value;

if(mobile.length!=10){

alert("Enter Valid Mobile Number");

return;

}

if(pin.length!=6){

alert("Enter Valid Pincode");

return;

}

// Google Sheets Integration Part-4 me aayega

document.getElementById("popup").style.display="flex";

form.reset();

});

function closePopup(){

document.getElementById("popup").style.display="none";

}
