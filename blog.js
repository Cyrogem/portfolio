var genericModal = document.getElementById("generic-modal")
var genericImage = document.getElementById("generic-image")
var genericDescription = document.getElementById("generic-description")
var genericClose = document.getElementById("generic-close")

Array.from(document.getElementsByClassName("zoom")).forEach(function(item) {
    //console.log(item.src);
    item.onclick = function(){
    genericModal.style.display = "block";
    genericImage.src = item.src;
    genericDescription.innerHTML = item.alt;
    }    
});

genericClose.onclick = function(){
    genericModal.style.display = "none";
}

window.onclick = function(event){
    if (event.target == genericModal){
        genericModal.style.display = "none";
    }
}