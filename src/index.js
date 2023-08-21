import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selectForm = document.querySelector('.breed-select');
const catDescription = document.querySelector('.cat-info');
const loadString = document.querySelector('.loader');
const errorString = document.querySelector('.error');

function displayCatBreedInfo(data) {
  const { url, breeds } = data;
  const { name, description, temperament } = breeds[0];

  const catCardHTML = `
    <img src="${url}" alt="${name}" />
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
  `;
  catDescription.innerHTML = catCardHTML;

  loadString.setAttribute('hidden', '');
  catDescription.removeAttribute('hidden');
}

function onError() {
  errorString.removeAttribute('hidden');
  loadString.setAttribute('hidden', '');
  catDescription.setAttribute('hidden', '');
  selectForm.setAttribute('hidden', '');
}

if (selectForm) {
  loadString.removeAttribute('hidden');
  errorString.setAttribute('hidden', '');

  fetchBreeds()
    .then(breeds => {
      const interfaceOptions = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      selectForm.innerHTML = interfaceOptions;

      selectForm.removeAttribute('hidden');
      loadString.setAttribute('hidden', '');

      selectForm.addEventListener('change', evt => {
        const breedId = evt.target.value;
        loadString.removeAttribute('hidden');
        catDescription.setAttribute('hidden', '');
        errorString.setAttribute('hidden', '');

        fetchCatByBreed(breedId)
          .then(catData => {
            displayCatBreedInfo(catData);
            loadString.setAttribute('hidden', '');
            catDescription.removeAttribute('hidden');
          })
          .catch(error => {
            onError();
          });
      });
    })
    .catch(error => {
      onError();
    });
}





