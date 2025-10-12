document.addEventListener('DOMContentLoaded', () => {
  let switches = [
    document.getElementById('themeSwitch'),
    document.getElementById('themeSwitchMobile'),
  ].filter(Boolean);

  let logo = document.querySelector('.logo');

  const setLogoForTheme = (isDark) => {
    if (!logo) return;
    logo.src = isDark
      ? 'img/groupe-six-blanco.png'   // logo claro para dark mode
      : 'img/groupe-six.png';          // logo normal para light mode
  };

  let saved = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', saved);
  switches.forEach(sw => sw?.classList.toggle('active', saved));
  setLogoForTheme(saved);

 let toggleTheme = () => {
   let nowDark = !document.body.classList.contains('dark');
    document.body.classList.toggle('dark', nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    switches.forEach(sw => sw?.classList.toggle('active', nowDark));
    setLogoForTheme(nowDark);
  };

  switches.forEach(sw => sw?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  }));
});
