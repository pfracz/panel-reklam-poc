import _uniqueId from 'lodash/uniqueId';
import Advertisement from '../types/Advertisement';
import ExampleAdvertisements from '../db/ExampleAdvertisements';

export function isAdvertisementNameAvailable(name: string, id?: string): boolean {
    const advertisements: Advertisement[] = getAdvertisements();

    let available = true;
    for (let i = 0; i < advertisements.length; i++) {
        if (advertisements[i].name === name && advertisements[i].id !== id) {
            available = false;
            break;
        }
    }

    return available;
}

export function createAdvertisement(name: string, content: string, startDate: Date, endDate: Date) {
    const advertisements: Advertisement[] = getAdvertisements();

    advertisements.push({ id: _uniqueId(), name, content, startDate: startDate, endDate: endDate });

    saveAdvertisements(advertisements);
}

export function editAdvertisement(id: string, name: string, content: string, startDate: Date, endDate: Date) {
    const advertisements: Advertisement[] = getAdvertisements();

    saveAdvertisements(
        advertisements.map((item) => {
            if (item.id === id) return { id, name, content, startDate: startDate, endDate: endDate };
            return item;
        })
    );
}

export function removeAdvertisement(id: string) {
    const advertisements: Advertisement[] = getAdvertisements();
    saveAdvertisements(advertisements.filter((item) => item.id !== id));
}

export function getAdvertisements(): Advertisement[] {
    return JSON.parse(localStorage.getItem('AdvertisementList') || '[]') as Advertisement[];
}

export function getAdvertisement(id: string): Advertisement | undefined {
    const advertisements: Advertisement[] = getAdvertisements();
    return advertisements.find((item) => item.id === id);
}

export function saveAdvertisements(advertisements: Advertisement[]) {
    localStorage.setItem('AdvertisementList', JSON.stringify(advertisements));
}

export function resetAdvertisements() {
    localStorage.setItem('AdvertisementList', JSON.stringify(ExampleAdvertisements));
}
