window.addEventListener("load", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const { target } = entry;
                target.src = target.dataset.src;
            }
        })
    }, {
        rootMargin: "100px",
    });
    [...document.querySelectorAll(".lazy")].forEach(img => {
        observer.observe(img);
        img.addEventListener("load", () => img.classList.add("loaded"));
    });
});
