export class InventoryItem {
    name: string;
    count: number;
}

export class InventoryList {
    name: string;
    id: number;
    items: InventoryItem[];
}

export const INVENTORY: InventoryList[] = [
    {name: 'Lebensmittel', id: 1, items: [{name: 'Bierooo', count: 9000}, {name: 'Weinoo', count: 666}]},
    {name: 'Anderes', id: 2, items: [{name: 'Star Wars', count: 404}, {name: 'deine mutter', count: 1}]}
];
