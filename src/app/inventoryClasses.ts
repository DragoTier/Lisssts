//inventory
export class InventoryItem {
    name: string;
    count: number;
}

export class InventoryList {
    name: string;
    id: number;
    items: InventoryItem[];
}

//shopping list
export class ShoppingListItem extends InventoryItem{
    isChecked: boolean = false;
}

export class ShoppingList extends InventoryList{
    items: ShoppingListItem[];

    
}