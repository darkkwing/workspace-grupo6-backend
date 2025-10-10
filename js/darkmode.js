document.addEventListener('DOMContentLoaded', () => {
  const switchEl = document.getElementById('themeSwitch');

  // guarda la prefrencia
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    switchEl?.classList.add('active');
  }

  //cambio de tema
   switchEl.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('dark');
    switchEl.classList.toggle('active');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    );
  });
});