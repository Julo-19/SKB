
const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counter = document.querySelectorAll(".counter span");
const progress_bar = document.querySelectorAll(".skill svg circle")

const ml_section = document.querySelector(".milestones");
const ml_counter = document.querySelectorAll(".number span");

const links = document.querySelectorAll('.nav-link');
const toggle_btn = document.querySelector('.toggle-btn');

const hamburger = document.querySelector('.hamburger'); 

window.addEventListener("scroll", () =>{
    activeLink();
    if(!skillsPlayed) skillsCounter();
    mlCounter();
});

function updateCount(num, maxNum)
{
    let currentNum =+num.innerText;

    if(currentNum < maxNum)
    {
        num.innerText = currentNum + 1;
        setTimeout(() =>{
            updateCount(num,maxNum);
        }, 12)
    }
}

function stickyNavbar()
{
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll",stickyNavbar);
 
let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", { delay:600});
sr.reveal(".showcase-img", { origin:top, delay:700});


// Progress bar cercle

function hasReached(el)
{
    let topPosition = el.getBoundingClientRect().top;

    if(window.innerHeight >= topPosition + el.offsetHeight) return true;

    return false;
    
   
}

function updateCount(num, maxNum)
{
    let currentNum =+num.innerText;

    if(currentNum < maxNum)
    {
        num.innerText = currentNum + 1;
        setTimeout(() =>{
            updateCount(num,maxNum);
        }, 12)
    }
}

let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill)) return;

    skillsPlayed = true;

    sk_counter.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427-430 *(target/100);

        progress_bar[i].style.setProperty("--target", strokeValue)

        setTimeout(() =>{
            updateCount(counter, target);
        }, 400)
    });

    progress_bar.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"));

}

function mlCounter()
{
    if(!hasReached(ml_section)) return;

    ml_counter.forEach((ctr) =>{
        let target = +ctr.dataset.target;

        setTimeout(() =>{
            updateCount(ctr, target);
        }, 400);
    });
}


function  activeLink()
{
    let sections = document.querySelectorAll('section[id]');
    let passedSections = Array.from(sections).map((sct,i)=>{
        return { 
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    })
    .filter((sct) => sct.y <= 0);

    let currSectionsID = passedSections.at(-1).id;

    links.forEach((l)=> l.classList.remove('active'));
    links[currSectionsID].classList.add('active');
}   

activeLink();



let firstTheme = localStorage.getItem('dark');

changeTheme(+firstTheme);

function changeTheme(isDark){
    if(isDark){
        document.body.classList.add('dark');
        toggle_btn.classList.replace('uil-moon', 'uil-sun');
        localStorage.setItem('dark', 1);
    }
    else
    {
        document.body.classList.remove('dark');
        toggle_btn.classList.replace('uil-sun', 'uil-moon');
        localStorage.setItem('dark', 0)
    }
}

toggle_btn.addEventListener('click', () => {
    changeTheme(!document.body.classList.contains('dark'));
})



hamburger.addEventListener('click', () =>{
    document.body.classList.toggle('open');
    document.body.classList.toggle('stopScrolling');
});

links.forEach((link) => 
    link.addEventListener('click', () => {
    document.body.classList.remove('open');
    document.body.classList.remove('stopScrolling');
})
);












"use strict";
// Select all slides
const slides = document.querySelectorAll(".slide");

// loop through slides and set each slides translateX
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// select next slide button
const nextSlide = document.querySelector(".btn-next");

// current slide counter
let curSlide = 0;
// maximum number of slides
let maxSlide = slides.length - 1;

// add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  // check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //   move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// select next slide button
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

