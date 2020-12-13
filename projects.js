var gsModal = document.getElementById("gs-modal")
var mansionModal = document.getElementById("mansion-modal")
var tprModal = document.getElementById("tpr-modal")

var gsImg = document.getElementById("gs-grid")
var mansionImg = document.getElementById("mansion-grid")
var tprImg = document.getElementById("tpr-grid")

var gsClose = document.getElementById("gs-close")
var mansionClose = document.getElementById("mansion-close")
var tprClose = document.getElementById("tpr-close")

gsImg.onclick = function(){
    gsModal.style.display = "block";
}
mansionImg.onclick = function(){
    mansionModal.style.display = "block";
}
tprImg.onclick = function(){
    tprModal.style.display = "block";
}

gsClose.onclick = function(){
    gsModal.style.display = "none";
}
mansionClose.onclick = function(){
    mansionModal.style.display = "none";
}
tprClose.onclick = function(){
    tprModal.style.display = "none";
}
