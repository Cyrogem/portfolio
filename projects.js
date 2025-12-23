var gsModal = document.getElementById("gs-modal")
var mansionModal = document.getElementById("mansion-modal")
var tprModal = document.getElementById("tpr-modal")
var snailModal = document.getElementById("snail-modal")
var genericModal = document.getElementById("generic-modal")
var strikersModal = document.getElementById("strikers-modal")
var plunderModal = document.getElementById("plunder-modal")
var blastballModal = document.getElementById("blastball-modal")
var loadingModal = document.getElementById("loading-modal")
var gaiaModal = document.getElementById("gaia-modal")

var gsImg = document.getElementById("gs-grid")
var mansionImg = document.getElementById("mansion-grid")
var tprImg = document.getElementById("tpr-grid")
var snailImg = document.getElementById("snail-grid")
var strikersImg = document.getElementById("strikers-grid")
var plunderImg = document.getElementById("plunder-grid")
var blastballImg = document.getElementById("blastball-grid")
var loadingImg = document.getElementById("loading-grid")
var gaiaImg = document.getElementById("gaia-grid")

var genericImage = document.getElementById("generic-image")
var genericDescription = document.getElementById("generic-description")

var gsClose = document.getElementById("gs-close")
var mansionClose = document.getElementById("mansion-close")
var tprClose = document.getElementById("tpr-close")
var snailClose = document.getElementById("snail-close")
var genericClose = document.getElementById("generic-close")
var strikersClose = document.getElementById("strikers-close")
var plunderClose = document.getElementById("plunder-close")
var blastballClose = document.getElementById("blastball-close")
var loadingClose = document.getElementById("loading-close")
var gaiaClose = document.getElementById("gaia-close")

gsImg.onclick = function(){
    gsModal.style.display = "block";
}
mansionImg.onclick = function(){
    mansionModal.style.display = "block";
}
tprImg.onclick = function(){
    tprModal.style.display = "block";
}
snailImg.onclick = function(){
    snailModal.style.display = "block";
}
strikersImg.onclick = function(){
    strikersModal.style.display = "block";
}
plunderImg.onclick = function(){
    plunderModal.style.display = "block";
}
blastballImg.onclick = function(){
    blastballModal.style.display = "block";
}
loadingImg.onclick = function(){
    loadingModal.style.display = "block";
}
gaiaImg.onclick = function(){
    gaiaModal.style.display = "block";
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
snailClose.onclick = function(){
    snailModal.style.display = "none";
}
genericClose.onclick = function(){
    genericModal.style.display = "none";
}
strikersClose.onclick = function(){
    strikersModal.style.display = "none";
}
plunderClose.onclick = function(){
    plunderModal.style.display = "none";
}
blastballClose.onclick = function(){
    blastballModal.style.display = "none";
}
loadingClose.onclick = function(){
    loadingModal.style.display = "none";
}
gaiaClose.onclick = function(){
    gaiaModal.style.display = "none";
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
        } else if (event.target == snailModal){
            snailModal.style.display = "none";
        } else if (event.target == strikersModal){
            strikersModal.style.display = "none";
        } else if (event.target == plunderModal){
            plunderModal.style.display = "none";
        } else if (event.target == blastballModal){
            blastballModal.style.display = "none";
        } else if (event.target == loadingModal){
            loadingModal.style.display = "none";
        } else if (event.target == gaiaModal){
            gaiaModal.style.display = "none";
        }
    }
}
