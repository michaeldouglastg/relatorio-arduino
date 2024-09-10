let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.slider');

next.addEventListener('click', function(){
    let slides = document.querySelectorAll('.slides');
    slider.appendChild(slides[0]);
})

prev.addEventListener('click', function(){
    let slides = document.querySelectorAll('.slides');
    slider.prepend(slides[slides.length - 1]);
})

function toggleMode() {
    const html = document.documentElement
    html.classList.toggle("light")
    
    //pegar a tag img
    const img=document.querySelector("#profile img")
    
    //substituir a imagem
    if(html.classList.contains('light')) {
      //se tiver light mode, adiciona a imgem light
      img.setAttribute("src", "./assets/avatar-light.png")
    } else {
      //se tiver sem light mode, manter a imagem normal
      img.setAttribute("src", "./assets/avatar.png")
    }
  }

        