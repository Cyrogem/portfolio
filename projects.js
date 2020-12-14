var gsModal = document.getElementById("gs-modal")
var mansionModal = document.getElementById("mansion-modal")
var tprModal = document.getElementById("tpr-modal")
var genericModal = document.getElementById("generic-modal")

var gsImg = document.getElementById("gs-grid")
var mansionImg = document.getElementById("mansion-grid")
var tprImg = document.getElementById("tpr-grid")
var genericImage = document.getElementById("generic-image")
var genericDescription = document.getElementById("generic-description")

var gsClose = document.getElementById("gs-close")
var mansionClose = document.getElementById("mansion-close")
var tprClose = document.getElementById("tpr-close")
var genericClose = document.getElementById("generic-close")

gsImg.onclick = function(){
    gsModal.style.display = "block";
}
mansionImg.onclick = function(){
    mansionModal.style.display = "block";
}
tprImg.onclick = function(){
    tprModal.style.display = "block";
}
Array.from(document.getElementsByClassName("project-icon")).forEach(function(item) {
    //console.log(item.src);
    item.onclick = function(){
    genericModal.style.display = "block";
    genericImage.src = item.src;
    genericDescription.innerHTML = item.alt;
    }    
});

gsClose.onclick = function(){
    gsModal.style.display = "none";
}
mansionClose.onclick = function(){
    mansionModal.style.display = "none";
}
tprClose.onclick = function(){
    tprModal.style.display = "none";
}
genericClose.onclick = function(){
    genericModal.style.display = "none";
}

window.onclick = function(event){
    if (event.target == genericModal){
        genericModal.style.display = "none";
    } else {
        if (event.target == gsModal){
            gsModal.style.display = "none";
        } else if (event.target == mansionModal){
            mansionModal.style.display = "none";
        } else if (event.target == tprModal){
            tprModal.style.display = "none";
        }
    }
}
