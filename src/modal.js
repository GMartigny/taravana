window.addEventListener("load", () => {
    const { body } = document;
    const modals = document.body.querySelectorAll(".modal");
    let opened = null;

    modals.forEach((modal) => {
        const opener = document.getElementById(modal.dataset.open);

        opener.addEventListener("click", () => {
            modal.classList.add("open");
            body.classList.add("modal-open");

            if (opened && opened !== modal) {
                opened.classList.remove("open");
            }
            opened = modal;
        });

        const closer = modal.querySelector(".close");
        closer.addEventListener("click", () => {
            modal.classList.remove("open");
            body.classList.remove("modal-open");

            opened = null;
        });
    });

    document.body.addEventListener("click", ({ target }) => {
        if (target === body && opened) {
            opened.classList.remove("open");
            body.classList.remove("modal-open");

            opened = null;
        }
    });
});
