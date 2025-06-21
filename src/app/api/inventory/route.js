import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

function getInventory() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function setInventory(items) {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
}

export async function GET(request) {
  const items = getInventory();
  console.log('items',items);
  
  return Response.json(items);
}

export async function POST(request) {
  const items = getInventory();
  const newItem = await request.json();
  const itemWithId = { ...newItem, id: Date.now() };
  const updatedItems = [...items, itemWithId];
  setInventory(updatedItems);
  return Response.json(itemWithId, { status: 201 });
}