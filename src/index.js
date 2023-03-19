import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('ul.country-list'),
    countryInfo: document.querySelector('div.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(e => {
    const enteredCountry = refs.searchBox.value.trim();
    if (enteredCountry == '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    } else if (enteredCountry !== '') {
        fetchCountries(enteredCountry)
            .then(foundСountries => {
                if (foundСountries.length > 10) {
                    Notify.info(
                        `Too many matches found. Please enter a more specific name.`
                    );
                } else if (foundСountries.length > 2 && foundСountries.length <= 10) {
                    createCountryList(foundСountries);

                } else if (foundСountries.length === 1) {
                    createCountryInfo(foundСountries);

                }
}).catch(error => {
                Notify.failure(
                    `Oops, there is no country with that name!`
                );
                return error;
        })
    }
}, DEBOUNCE_DELAY)
);

function createCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="40">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function createCountryInfo(countries) {
      const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="40">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      refs.countryList.innerHTML = markup;
}