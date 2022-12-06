import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import {fetchCountries} from './fetchCountries.js'


const input = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(onSearch,DEBOUNCE_DELAY))




function onSearch(evt){
    const countryName = evt.target.value.trim()
    
    fetchCountries(countryName).then(data => {
        if(!countryName){
            countryList.innerHTML = ''
        }else if (data.length >= 2 && data.length <= 10) {
            countryList.innerHTML = ''
            createMurkupList(data)
        }else if (data.length == 1) {
            countryList.innerHTML = ''
            createMurkupCard(data)
        }else if (data.length > 10){
            Notify.info("Too many matches found. Please enter a more specific name.");
        }
    });
    
}

function createMurkupList(arr) {
  const list =  arr.map(({ flags,name }) => {
     return `<li class="country-item">
       <img src="${flags.svg}" alt="${name.official}" width = "30px" height = "30px">
       <p class="country_list-name">${name.official}</p>
       </li>`}).join('')
countryList.insertAdjacentHTML('beforeend',list)
}
function createMurkupCard(arr) {
    const list =  arr.map(({ flags,name,capital,population,languages }) => { 
      return `<li class="country-card">
        <div class="title">
        <img src="${flags.svg}" alt="${name.official}" width = "50px" height = "50px">
        <p class="country-name">${name.official}</p>
        </div>
        <p class="country-txt"><span class="country-title">Capital: </span>${capital}</p>
        <p class="country-txt"><span class="country-title">Population: </span>${population}</p>
        <p class="country-txt"><span class="country-title">languages: </span>${Object.values(languages)}</p>
     </li>`}).join('')
  countryList.insertAdjacentHTML('beforeend',list)
  }
  