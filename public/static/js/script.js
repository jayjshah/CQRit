$(document).ready(function(){
    $("#domain").click(function () {
myf1()   
     })
})


function myf1(){
    x=document.getElementById('subsd');
    if(x.style.display==='none'){
        x.style.display='block'
    }
    else
    x.style.display = "none";
}