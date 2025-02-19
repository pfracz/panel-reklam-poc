import Advertisement from '../types/Advertisement';

const ExampleAdvertisements: Advertisement[] = [
    {
        id: '01',
        name: 'Pierwsza reklama',
        content: 'Krótka treść pierwszej reklamy',
        startDate: new Date(),
        endDate: new Date(),
    },
    {
        id: '02',
        name: 'Druga reklama',
        content: 'Second Content here',
        startDate: new Date(),
        endDate: new Date(),
    },
    {
        id: '03',
        name: 'Trzecia reklama',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus interdum dolor in vestibulum. Vivamus semper tempor est sed convallis. Curabitur ultrices eget risus at semper. Nunc convallis tempor nulla in auctor. Nunc vitae libero nec mi feugiat mattis in eu orci. Donec a feugiat mi. Pellentesque et nunc sed mi feugiat cursus ac ut augue. Praesent tincidunt enim sed lectus blandit, a efficitur ligula rutrum. Phasellus orci arcu, iaculis et ligula tincidunt, pellentesque rutrum magna.',
        startDate: new Date(),
        endDate: new Date(),
    },
];

export default ExampleAdvertisements;
