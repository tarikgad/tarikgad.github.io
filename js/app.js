const NAV_NAME = document.getElementById("navbar__list");
let count = 0; // used to count the sections in the HTML
let section_i; // used to handle the section element
let sections_y = Array; // used to collect all sections positions
sections_y[0] = document.getElementsByTagName("h1")[0].offsetTop;

// check all sections in the HTML and add them in navigation bar
for (let i=1;;i++){
    section_i = document.getElementById("section"+i);
    if (section_i === null){
        count = i-1;
        break;
    }
    let i_item = document.createElement('li');
    const head_name = document.getElementsByTagName('h2')[i-1].innerHTML;
    i_item.innerHTML = `<span class = "menu__link" onclick = "section${i}.scrollIntoView({behavior: 'smooth'});">${head_name}</span>`;
    NAV_NAME.appendChild(i_item);
    sections_y[i] = section_i.offsetTop;
}

sections_y[count+1] = document.getElementsByTagName("footer")[0].offsetTop;

let span_item = document.getElementsByTagName('span'); // used to have a list of all spans

// highlight the navbar related to current section
window.onscroll = function() {
    for (i=1;i<=count;i++){
        section_i = document.getElementById("section"+i);
        if (window.pageYOffset > (sections_y[i-1] + sections_y[i])/2 && window.pageYOffset < (sections_y[i+1] + sections_y[i])/2) {
            section_i.classList.add("your-active-class");
            span_item[i-1].classList.add("reached__section");
        } else {
            section_i.classList.remove("your-active-class");
            span_item[i-1].classList.remove("reached__section");
        }
    }
    document.getElementsByClassName('page__header')[0].style.top="0";
}

// keep tracking of scrolling the window
let prevScrollpos = 1000;
function timing() {
    prevScrollpos === window.pageYOffset ? document.getElementsByClassName('page__header')[0].style.top="-10vh" : document.getElementsByClassName('page__header')[0].style.top="0";
    prevScrollpos = window.pageYOffset;
}
setInterval(timing,2000);

