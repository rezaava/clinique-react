const html=document.documentElement;
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.setAttribute('data-theme','dark');
}