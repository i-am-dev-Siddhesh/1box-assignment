import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

// Helper functions
function getInventory(): InventoryItem[] {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function setInventory(items: InventoryItem[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
}

// Types
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

// Combined Update Request Type
interface UpdateRequest {
  updates: {
    id: number;
    name?: string;
    quantity?: number;
  }[];
}

// Combined Delete Request Type
interface DeleteRequest {
  ids: number[];
}

// API Endpoints
export async function GET() {
  const items = getInventory();
  return Response.json(items);
}

export async function POST(request: Request) {
  const items = getInventory();
  const newItems: Omit<InventoryItem, 'id'>[] = await request.json();

  // Validate input is an array
  if (!Array.isArray(newItems)) {
    return Response.json(
      { error: 'Expected an array of items' },
      { status: 400 }
    );
  }

  // Validate each item
  for (const item of newItems) {
    if (!item.name || item.quantity === undefined) {
      return Response.json(
        { error: 'Each item must have name and quantity' },
        { status: 400 }
      );
    }
  }

  const createdItems = newItems.map(item => ({
    ...item,
    id: Date.now() + Math.floor(Math.random() * 1000), // More unique IDs
    createdAt: new Date().toISOString()
  }));

  const updatedInventory = [...items, ...createdItems];
  setInventory(updatedInventory);

  return Response.json(createdItems, { status: 201 });
}

export async function PUT(request: Request) {
  const items = getInventory();
  const { updates }: UpdateRequest = await request.json();

  if (!Array.isArray(updates)) {
    return Response.json(
      { error: 'Expected an array of updates' },
      { status: 400 }
    );
  }

  const updatedItems: InventoryItem[] = [];
  const now = new Date().toISOString();

  for (const update of updates) {
    if (!update.id) {
      return Response.json(
        { error: 'Each update must include an ID' },
        { status: 400 }
      );
    }

    const index = items.findIndex(item => item.id === update.id);
    if (index === -1) {
      return Response.json(
        { error: `Item with ID ${update.id} not found` },
        { status: 404 }
      );
    }

    const existingItem = items[index];
    const updatedItem = {
      ...existingItem,
      ...update,
      updatedAt: now
    };

    items[index] = updatedItem;
    updatedItems.push(updatedItem);
  }

  setInventory(items);
  return Response.json(updatedItems);
}

export async function DELETE(request: Request) {
  const items = getInventory();
  const { ids }: DeleteRequest = await request.json();

  if (!Array.isArray(ids)) {
    return Response.json(
      { error: 'Expected an array of IDs to delete' },
      { status: 400 }
    );
  }

  const remainingItems = items.filter(item => !ids.includes(item.id));
  
  if (remainingItems.length === items.length) {
    return Response.json(
      { error: 'None of the specified IDs were found' },
      { status: 404 }
    );
  }

  setInventory(remainingItems);
  return Response.json(
    { message: 'Items deleted successfully', deletedCount: items.length - remainingItems.length },
    { status: 200 }
  );
}