//Botão Slides
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

//Alternar Modo Escuro
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


//Função do Botões de Navegação
function initializeTabContainer(tabContainer) {
  const tabButtons = tabContainer.querySelectorAll('.tab-button');
  const tabBackground = tabContainer.querySelector('.tab-background');
  const tabContentContainer = tabContainer.nextElementSibling;
  const tabItems = tabContentContainer.querySelectorAll('.ta-tab-item');
  let currentActiveTab = 0;

  function setActiveTab(newTabIndex) {
    const currentTab = tabButtons[currentActiveTab];
    const newTab = tabButtons[newTabIndex];
    
    tabButtons.forEach(button => button.classList.remove('active'));
    newTab.classList.add('active');
    tabItems.forEach(item => {
      if (item.dataset.tab == newTab.dataset.tab) {
          item.classList.add('active');
      } else {
          item.classList.remove('active');
      }
    });

    const currentRect = currentTab.getBoundingClientRect();
        const newRect = newTab.getBoundingClientRect();
        const containerRect = tabButtons[0].parentElement.getBoundingClientRect();

        if (newTabIndex > currentActiveTab) {
            // Moving right
            tabBackground.style.width = `${newRect.right - currentRect.left}px`;
            tabBackground.style.left = `${currentRect.left - containerRect.left}px`;
            
            setTimeout(() => {
                tabBackground.style.width = `${newRect.width}px`;
                tabBackground.style.left = `${newRect.left - containerRect.left}px`;
            }, 150);
        } else {
            // Moving left
            tabBackground.style.width = `${currentRect.right - newRect.left}px`;
            tabBackground.style.left = `${newRect.left - containerRect.left}px`;
            
            setTimeout(() => {
                tabBackground.style.width = `${newRect.width}px`;
            }, 150);
        }

        currentActiveTab = newTabIndex;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => setActiveTab(index));
    });

    // Initialize the first tab as active
    setActiveTab(0);
}

// Initialize all tab containers
document.querySelectorAll('.tab-container').forEach(initializeTabContainer);