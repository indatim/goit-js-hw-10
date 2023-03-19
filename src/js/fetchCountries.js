export function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    const filterData = '?fields=name,capital,population,flags,languages';
    return fetch(`${url}${name}${filterData}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}