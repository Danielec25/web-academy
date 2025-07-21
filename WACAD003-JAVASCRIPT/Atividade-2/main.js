const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Lista de imagens
const imageList = [
  'pic1.jpg',
  'pic2.jpg',
  'pic3.jpg',
  'pic4.jpg',
  'pic5.jpg',
  'pic6.jpg'
];

// Limpa a thumbBar antes de adicionar novas imagens
thumbBar.innerHTML = '';

// Loop para criar miniaturas
imageList.forEach((imageName, index) => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + imageName);
  newImage.setAttribute('alt', 'Thumbnail ' + (index + 1));
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', 'images/' + imageName);
  });
});

// Função do botão de escurecer/claro
btn.addEventListener('click', function () {
  const currentClass = btn.getAttribute('class');
  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});