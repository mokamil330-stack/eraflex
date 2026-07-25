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
