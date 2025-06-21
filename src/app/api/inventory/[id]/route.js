import { getInventory, setInventory } from '../route';

export async function GET(request, { params }) {
  const items = getInventory();
  const item = items.find(item => item.id === Number(params.id));
  if (!item) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(item);
}

export async function PUT(request, { params }) {
  const items = getInventory();
  const index = items.findIndex(item => item.id === Number(params.id));
  if (index === -1) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  
  const updatedItem = await request.json();
  items[index] = { ...items[index], ...updatedItem };
  setInventory(items);
  return Response.json(items[index]);
}

export async function DELETE(request, { params }) {
  const items = getInventory();
  const index = items.findIndex(item => item.id === Number(params.id));
  if (index === -1) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  
  items.splice(index, 1);
  setInventory(items);
  return Response.json({ message: 'Item deleted' });
}