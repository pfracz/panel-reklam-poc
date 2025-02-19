import Quote from '../types/Quote';

export default async function fetchQuote(): Promise<Quote[]> {
    const url = 'https://api.api-ninjas.com/v1/quotes';

    // zostawiam tutaj publicznie api_key, ktorego i tak nie uzywam,
    // zeby oszczedzic sobie robienie serwera dla jednego call'a (po kilku dniach i tak go zresetuje)
    const api_key = 'NjcVKjLIFDuyEenWYpWVZg==dF2hftBVMBc9KjBf';

    return fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': api_key,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((result) => result as Quote[]);
}
