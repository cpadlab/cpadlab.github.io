async function loadCSS() {
  const css = await import('https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css');
  console.log(css);
}

loadCSS();

var pages_cbx = document.getElementById('pages-cbx');
var pages_list = document.getElementById('pages-list');
var pages_icon = document.getElementById('pages-icon');

var about_cbx = document.getElementById('about-cbx');
var about_list = document.getElementById('about-list');
var about_icon = document.getElementById('about-icon');

pages_cbx.addEventListener('click', function() {
  if (pages_list.style.display === 'none') {
    pages_list.style.display = 'block';
  } else {
    pages_list.style.display = 'none';
  }
});

about_cbx.addEventListener('click', function() {
  if (about_list.style.display === 'none') {
    about_list.style.display = 'block';
  } else {
    about_list.style.display = 'none';
  }
});


pages_cbx.addEventListener('change', function() {
  if (pages_cbx.checked) {
    pages_icon.classList.remove('fi fi-br-angle-right');
    pages_icon.classList.add('fi fi-br-angle-down');
  } else {
    pages_icon.classList.remove('fi fi-br-angle-down');
    pages_icon.classList.add('fi fi-br-angle-right');
  }
});

about_cbx.addEventListener('change', function() {
  if (about_cbx.checked) {
    about_icon.classList.remove('fi fi-br-angle-right');
    about_icon.classList.add('fi fi-br-angle-down');
  } else {
    about_icon.classList.remove('fi fi-br-angle-down');
    about_icon.classList.add('fi fi-br-angle-right');
  }
});