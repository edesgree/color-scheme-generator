import '../scss/styles.scss';
//https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6

const colorSchemeForm = document.getElementById('colorSchemeForm');
const colorSchemePicker = document.getElementById('colorPicker');
const colorSchemeSelect = document.getElementById('selectType');
const colorSchemeNb = 5;
let colorList = [];
const colorSchemeModes = [
  'monochrome',
  'monochrome-dark',
  'monochrome-light',
  'analogic',
  'complement',
  'analogic-complement',
  'triad',
  'quad'
];
// fill select options
colorSchemeModes.forEach((mode) => {
  const option = document.createElement('option');
  option.value = mode;
  option.text = mode;
  colorSchemeSelect.appendChild(option);
});

colorSchemeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('colorSchemePicker', colorSchemePicker.value);
  console.log('colorSchemeSelect', colorSchemeSelect.value);
  const colorHexa = colorSchemePicker.value.slice(1);
  const url = `https://www.thecolorapi.com/scheme?hex=${colorHexa}&mode=${colorSchemeSelect.value}&count=${colorSchemeNb}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      const colors = data.colors;
      console.log(data);
      generateSwatches(colors);
    })
    .catch((error) => console.log(error));
});

const generateSwatches = (colors) => {
  const colorList = document.querySelector('.color-list');
  colorList.innerHTML = '';
  colors.forEach((color) => {
    const colorItem = document.createElement('li');
    colorItem.classList.add('color-item');
    colorItem.innerHTML = `
    <div class="color-swatch" style="background-color: ${color.hex.value}">
      <img src="${color.image.named}" alt="${color.name.value}" />
      <span class="color-copy-label">Copied!</span>
    </div>
    
    <div class="color-legend">
      ${color.hex.value}
    </div>
  `;
    // Add click event listener to the image to copy the color
    const imageElement = colorItem.querySelector('img');
    const colorCopyLabel = colorItem.querySelector('.color-copy-label');
    imageElement.addEventListener('click', function (event) {
      event.preventDefault();

      // Copy the text inside the text field
      navigator.clipboard.writeText(color.hex.value);
      colorCopyLabel.classList.add('active');
      setTimeout(function () {
        colorCopyLabel.classList.remove('active');
      }, 1000);
    });
    colorList.appendChild(colorItem);
  });
};
