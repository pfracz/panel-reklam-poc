// Na potrzeby PoC informację o autoryzacji trzymamy jako boolean w localStorage
// Normalnie sprawdzalibyśmy to za pomocą tokenu otrzymanego z serwera

export function checkPassword(password: string) {
    return password === 'recruitment';
}

export function logIn() {
    localStorage.setItem('auth', JSON.stringify(true));
}

export function logOut() {
    localStorage.removeItem('auth');
}

export function isLoggedIn() {
    return JSON.parse(localStorage.getItem('auth') || 'false') as boolean;
}
