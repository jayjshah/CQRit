$(document).ready(function(){
    $("#port").click(function () {
myf()   
     })
})

function myf(){
    x=document.getElementById('portscanner');
    if(x.style.display==='none'){
        x.style.display='block'
    }
    else
    x.style.display = "none";
}