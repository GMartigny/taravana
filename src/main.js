import "./robots.txt";
import images from "./static/*.jpg";
import "./modal.js";

window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        document.body.classList.add("ready");
    });

    const nav = document.getElementById("nav");
    const switcher = document.getElementById("menuSwitch");
    const sections = document.body.querySelectorAll("h2");

    sections.forEach((title) => {
        const anchor = document.createElement("span");
        anchor.className = "anchor";
        const id = title.innerText.toLowerCase().replace(/ /g, "_").normalize("NFD").replace(/\W/g, "");
        anchor.id = id;
        title.appendChild(anchor);

        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.innerText = title.innerText;
        link.addEventListener("click", () => switcher.checked = false);
        li.appendChild(link);
        nav.appendChild(li);
    });

    const viewHeight = window.innerHeight;
    let scroll = window.scrollY;
    document.body.classList.toggle("scrolled", scroll > 50);

    const setBgPosition = (el, top, height) => {
        const position = ((viewHeight + scroll) - top) / (viewHeight + height);
        if (0 < position && position < 1) {
            el.style.backgroundPositionY = `${position * 100}%`;
        }
    }

    const windows = [...document.querySelectorAll(".window")].map((el) => {
        el.style.backgroundImage = `url(${images[el.dataset.img]})`;
        const top = el.offsetTop;
        const { height } = el.getBoundingClientRect();
        setBgPosition(el, top, height);
        return {
            el,
            top,
            height,
        };
    });

    window.addEventListener("scroll", () => {
        scroll = window.scrollY;

        document.body.classList.toggle("scrolled", scroll > 50);

        windows.forEach(({ el, top, height }) => {
            setBgPosition(el, top, height);
        });
    }, {
        passive: true,
    });
});
