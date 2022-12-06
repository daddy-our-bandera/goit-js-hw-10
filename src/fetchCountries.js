
import Notiflix, { Notify } from 'notiflix';
 
export function fetchCountries(name = "Ukraine"){
  const BASE_URL =`https://restcountries.com/v3.1/name/`

  return  fetch(`${BASE_URL}${name}?feilds=name,capital,currencies,population,languages,flags`).then(resp => {
        if (!resp.ok && name) {
        throw new Error(Notify.failure("Oops, there is no country with that name"))
        }
        return resp.json()
    }).catch(err => console.log(err));
}

