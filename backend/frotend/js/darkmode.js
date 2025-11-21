document.addEventListener('DOMContentLoaded', () => {

  let switches = [
    document.getElementById('themeSwitch'),       
    document.getElementById('themeSwitchMobile'),   
  ].filter(Boolean); // elimina los null si alguno no existe


  let logo = document.querySelector('.logo');

  const setLogoForTheme = (isDark) => {
    if (!logo) return;
    logo.src = isDark
      ? 'img/groupe-six-blanco.png'   // logo claro para darkmode
      : 'img/groupe-six.png';          // logo normal 
  };

  // detectar si el navegador/sistema usa darkmode
  let prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

 
  let savedTheme = localStorage.getItem('theme');

  let isDark = savedTheme
    ? savedTheme === 'dark'
    : prefersDark.matches;


  document.body.classList.toggle('dark', isDark); 
  switches.forEach(sw => sw?.classList.toggle('active', isDark));
  setLogoForTheme(isDark);

  //Función para cambiar manualmente entre claro y oscuro
  const toggleTheme = () => {
    let nowDark = !document.body.classList.contains('dark'); 

    document.body.classList.toggle('dark', nowDark); 
    localStorage.setItem('theme', nowDark ? 'dark' : 'light'); // guarda la preferencia

    switches.forEach(sw => sw?.classList.toggle('active', nowDark));
    setLogoForTheme(nowDark); 
  };

 
  switches.forEach(sw => sw?.addEventListener('click', (e) => {
    e.preventDefault(); // con esto el click no dispara otros eventos
    e.stopPropagation(); // con esto el click no se propaga a otros elementos, funciona solo donde se da click
    toggleTheme(); // ejecuta el cambio de tema
  }));

  //detecta los cambios del navegador/sistema a tiempo real
  prefersDark.addEventListener('change', (event) => { 
    if (!localStorage.getItem('theme')) {
      let systemDark = event.matches; 
      document.body.classList.toggle('dark', systemDark);
      switches.forEach(sw => sw?.classList.toggle('active', systemDark));
      setLogoForTheme(systemDark);
    }
  });
});
