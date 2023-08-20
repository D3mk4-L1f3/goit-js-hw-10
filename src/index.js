import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selectForm = document.querySelector('.breed-select');
const catDescription = document.querySelector('.cat-info');
const loadString = document.querySelector('.loader');
const errorString = document.querySelector('.error');

function catsBreedDescription(data) {
    const { url, width, height, breeds } = data;
    const { name, description, temperament } = breeds[0];
    
  const createCatCard = `
    <img src="${url}" width="${width}" height="${height}" />
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
  `;
  catDescription.insertAdjacentHTML('beforeend', createCatCard);

  loadString.setAttribute('hidden', '');
  catDescription.removeAttribute('hidden');
}
function onError() {
  errorString.removeAttribute('hidden');
  loadString.setAttribute('hidden', '');
  catDescription.setAttribute('hidden', '');
}
if (selectForm && loadString) {
  loadString.removeAttribute('hidden');
  errorString.setAttribute('hidden', '');

  fetchBreeds()
    .then(breeds => {
        const interfaceOptions = breeds.map(breed => `
    <option value="${breed.id}">${breed.name}</option>`)
    .join('');

        selectForm.insertAdjacentHTML('beforeend', interfaceOptions);
        selectForm.removeAttribute('hidden');
        loadString.setAttribute('hidden', '');

      selectForm.addEventListener('change', evt => {
        const breedId = evt.target.value;
        loadString.removeAttribute('hidden');
        catDescription.setAttribute('hidden', '');
        errorString.setAttribute('hidden', '');

        fetchCatByBreed(breedId)
          .then(catData => {
            catsBreedDescription(catData);
          })
          .catch(error => {
            onError();
          });

        loadString.removeAttribute('hidden');
        catDescription.setAttribute('hidden', '');
        errorString.setAttribute('hidden', '');
      });
    })
    .catch(error => {
      onError();
    });
}








