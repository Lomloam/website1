let close = document.getElementById("closeBut");
if(close){
    close.addEventListener("click", function(){
        document.getElementById("alertDiv").remove();
        document.getElementById("closeBut").remove();
    });
    
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
}

let dropdownContainer = document.getElementById("dropdown");
let dropdown = document.getElementById("otherDropdown");
dropdownContainer.addEventListener("mouseover", function(event){
    dropdown.style.backgroundColor = "rgb(84, 84, 84)";
    console.log(1);
});
dropdownContainer.addEventListener("mouseout", function(event){
    dropdown.style.backgroundColor = "rgb(35, 35, 35)";
    
});

