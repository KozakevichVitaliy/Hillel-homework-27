const slides = [
  "https://picsum.photos/id/10/2500/1667",
  "https://picsum.photos/id/11/2500/1667",
  "https://picsum.photos/id/12/2500/1667",
  "https://picsum.photos/id/13/2500/1667",
  "https://picsum.photos/id/10/2500/1667",
  "https://picsum.photos/id/11/2500/1667",
  "https://picsum.photos/id/12/2500/1667",
  "https://picsum.photos/id/13/2500/1667",
];

const image = document.querySelector("#slide");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const pauseBtn = document.querySelector("#pause-btn");
const dots = document.querySelector("#dots");

let sliderInterval;
let currentIndex = 0;

image.setAttribute("src", slides[currentIndex]);
pauseBtn.classList.add("active");

// Prev/Next Btns listeners 
const handlePrevBtnClick = () => {
  if (currentIndex > 0) {
    currentIndex = currentIndex - 1;
    updateSlider();
    updadeDots();
  }
};

prevBtn.addEventListener("click", handlePrevBtnClick);

const handleNextBtnClick = () => {
  if (currentIndex < slides.length - 1) {
    currentIndex = currentIndex + 1;
    updateSlider();
    updadeDots();
  }
};

nextBtn.addEventListener("click", handleNextBtnClick);

// Pause Btn listener and add slider interval
const updateSliderByInterval = () => {
    sliderInterval = setInterval(() => {
    if (currentIndex < slides.length - 1) {
            currentIndex = currentIndex + 1;
            updateSlider();
            updadeDots();
        } else {
            currentIndex = -1;
        }
    }, 3000);

}
const handlePauseBtnClick = () => {
    pauseBtn.classList.toggle("active");
    if (pauseBtn.classList.contains("active")) {
        updateSliderByInterval()
        pauseBtn.innerText = 'Pause slider';
    } else {
        pauseBtn.innerText = 'Unpause slider';
        clearInterval(sliderInterval);
    }
};

pauseBtn.addEventListener("click", handlePauseBtnClick);

// Create Dots Elements
const createDots = () => {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot-item");
    dot.id = i;
    if (i === currentIndex) {
      dot.classList.add("active");
    }
    dot.innerHTML = `<span class="dot"></span>`;
    dots.insertAdjacentElement("beforeend", dot);
  }
};

// Update Dots Elements and Slider Index
const updadeDots = () => {
  const dots = document.querySelectorAll(".dot-item");
  dots.forEach((item) => {
    const id = Number(item.id);
    if (id === currentIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

const updateSlider = () => {
  image.setAttribute("src", slides[currentIndex]);
};

// Dots and "keyup" Listeners
dots.addEventListener("click", (event) => {
    try {
        currentIndex = Number(event.target.closest('li').id);
    } catch (e) {
        if (e instanceof TypeError) {
            console.error("This error is instance of 'TypeError'");
        }
    } finally {
        updateSlider();
        updadeDots();
    }
});
document.addEventListener("keyup", (event) => {
    if (event.keyCode === 39) {
        handleNextBtnClick()
    }
    if (event.keyCode === 37) {
        handlePrevBtnClick()
    }
})

updateSliderByInterval()
createDots();