document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav_links').classList.toggle('active');
});


let popup = document.getElementById("pop-up")


function openPopup() {
popup.classList.add("open-popup");

}

function closePopup() {
    popup.classList.remove("open-popup");
    
    }