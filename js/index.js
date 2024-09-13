  const btnToggle = document.getElementById("toggle-btn");
  const btnHeading = document.querySelector(".btn__heading")
  const toggleImg = document.getElementById("toggle__img");
  let text = true;

  let toggle = () => {
    document.body.classList.toggle("dark");
    if(text) {
      text = false;
      btnHeading.textContent = "Light";
      toggleImg.setAttribute("src", "./images/icon-sun.svg")
    }else {
      text = true;
      btnHeading.textContent = "Dark";
      toggleImg.setAttribute("src", "./images/icon-moon.svg");
    }
  }

btnToggle.addEventListener("click", toggle)