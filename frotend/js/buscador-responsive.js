// buscador responsive
const buscadorLogo = document.getElementById('buscador-logo');
const buscadorResponsive = document.querySelector('.buscador-responsive');

if (buscadorLogo && buscadorResponsive) {
    buscadorLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        buscadorResponsive.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!buscadorResponsive.contains(e.target)) {
            buscadorResponsive.classList.remove('active');
        }
    });
}
