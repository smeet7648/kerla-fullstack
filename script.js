// document.getElementById("open4").addEventListener("click",function() {
//     document.getElementById("sid4").style.display="inline"; 
//     document.getElementById("open4").style.display="none";
//     document.getElementById("close4").style.display="block";
//     // document.getElementById("sid4").style.marginLeft="0px"; 
// });
// document.getElementById("close4").addEventListener("click",function() {
//     document.getElementById("sid4").style.display="none";
//     document.getElementById("open4").style.display="block";
//     document.getElementById("close4").style.display="none";
// });
document.getElementById("open4").addEventListener("click", function () {
    document.getElementById("sid4").classList.add("active");
    document.getElementById("open4").style.display = "none";
    document.getElementById("close4").style.display = "block";
});

document.getElementById("close4").addEventListener("click", function () {
    document.getElementById("sid4").classList.remove("active");
    document.getElementById("open4").style.display = "block";
    document.getElementById("close4").style.display = "none";
});
