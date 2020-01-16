const NAV_NAME = document.getElementById("navbar__list");
const HIDE_H = -13;
let hide_x = HIDE_H;
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

function show_frame() {
    let id = setInterval(s_frame, 10);
    function s_frame() {
        if (hide_x == 0) {
            clearInterval(id);
        } else {
            hide_x++;
            document.getElementsByClassName('page__header')[0].style.top = `${hide_x}vh`;
        }
    }
}

function hide_frame() {
    let id = setInterval(s_frame, 10);
    function s_frame() {
        if (hide_x == HIDE_H) {
            clearInterval(id);
        } else {
            hide_x--;
            document.getElementsByClassName('page__header')[0].style.top = `${hide_x}vh`;
        }
    }
}

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
    show_frame();
}

// keep tracking of scrolling the window
let prevScrollpos = window.pageYOffset;
function timing() {
    if(prevScrollpos === window.pageYOffset) {
        hide_frame();
    } else {
        show_frame();
    }
    prevScrollpos = window.pageYOffset;
}
setInterval(timing,2000);

