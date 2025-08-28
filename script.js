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

function booking(name,location,price){
    window.location.herf = `main.html?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}&price=${encodeURIComponent(price)}`
}

document.querySelectorAll(".btn1").forEach(el => {
    el.addEventListener("click", async function (e) {
        e.preventDefault();

        const title = el.parentElement.querySelector(".pl1").textContent;
        const location = el.parentElement.querySelector(".pl2").textContent;
        const price = el.parentElement.querySelector(".sp1").textContent;
        const img = el.parentElement.querySelector(".il1").getAttribute("src");

        try {
            const res = await fetch("http://localhost:3000/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, location, price, img })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
