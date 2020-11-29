window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        document.body.classList.add("ready");
    });

    const viewHeight = window.innerHeight;
    let scroll = window.scrollY;

    const setBgPosition = (el, top, height) => {
        const position = ((viewHeight + scroll) - top) / (viewHeight + height);
        if (0 < position && position < 1) {
            el.style.backgroundPositionY = `${position * 100}%`;
        }
    }

    const windows = [...document.querySelectorAll(".window")].map((el) => {
        el.style.backgroundImage = `url(${el.dataset.img})`;
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
        windows.forEach(({ el, top, height }) => {
            setBgPosition(el, top, height);
        });
    }, {
        passive: true,
    });
});
