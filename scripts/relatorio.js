//Alternar Modo Escuro
function toggleMode() {
    const html = document.documentElement
    html.classList.toggle("light")
    
    //pegar a tag img
    const img=document.querySelector(".logo img")
    
    //substituir a imagem
    if(html.classList.contains('light')) {
      //se tiver light mode, adiciona a imgem light
      img.setAttribute("src", "../assets/logo-light.png")
    } else {
      //se tiver sem light mode, manter a imagem normal
      img.setAttribute("src", "../assets/logo-dark.png")
    }
  }


//Buttons Slider
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


// Função do Botões de Navegação
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





//Horizontal Slider Nav
const tabs = document.querySelectorAll(".tab-container button");
const rightArrow = document.querySelector(
  ".tab-container .right-arrow svg"
);
const leftArrow = document.querySelector(
  ".tab-container .left-arrow svg"
);
const tabsList = document.querySelector(".tab-container ul");
const leftArrowContainer = document.querySelector(
  ".tab-container .left-arrow"
);
const rightArrowContainer = document.querySelector(
  ".tab-container .right-arrow"
);

const removeAllActiveClasses = () => {
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    removeAllActiveClasses();
    tab.classList.add("active");
  });
});

const manageIcons = () => {
  if (tabsList.scrollLeft >= 20) {
    leftArrowContainer.classList.add("active");
  } else {
    leftArrowContainer.classList.remove("active");
  }

  let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;
  console.log("scroll width: ", tabsList.scrollWidth);
  console.log("client width: ", tabsList.clientWidth);

  if (tabsList.scrollLeft >= maxScrollValue) {
    rightArrowContainer.classList.remove("active");
  } else {
    rightArrowContainer.classList.add("active");
  }
};

rightArrow.addEventListener("click", () => {
  tabsList.scrollLeft += 200;
  manageIcons();
});

leftArrow.addEventListener("click", () => {
  tabsList.scrollLeft -= 200;
  manageIcons();
});

tabsList.addEventListener("scroll", manageIcons);

let dragging = false;

const drag = (e) => {
  if (!dragging) return;
  tabsList.classList.add("dragging");
  tabsList.scrollLeft -= e.movementX;
};

tabsList.addEventListener("mousedown", () => {
  dragging = true;
});

tabsList.addEventListener("mousemove", drag);

document.addEventListener("mouseup", () => {
  dragging = false;
  tabsList.classList.remove("dragging");
});