import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_L0jvsXCus7UsmimSLLHveKMvHoGwXBTyJ06eJCJjQsFwCgHb9nRp2hbLd6KkimC9";
const CAT_URL = "https://api.thecatapi.com/v1";

export function fetchBreeds() {
  return axios.get(`${CAT_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  return axios.get(`${CAT_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw error;
    });
}

