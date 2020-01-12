export class InventoryItem {
    name: string;
    count: number;
}

export class InventoryList {
    name: string;
    id: number;
    items: InventoryItem[];
}
