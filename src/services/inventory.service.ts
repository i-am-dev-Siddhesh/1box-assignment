import inventoryFormFields from '@/constants/form.fields';
import apiClient from './serverConfig';

export const InventoryService = {
  async getAll(): Promise<InventoryItem[]> {
    try {
      return await apiClient.get('/inventory');
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch inventory'
      );
    }
  },

  async getById(id: number): Promise<InventoryItem> {
    try {
      return await apiClient.get(`/inventory/${id}`);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Inventory item not found'
      );
    }
  },

  async create(item: InventoryItem): Promise<InventoryItem> {
    try {
      return await apiClient.post('/inventory', item);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to create inventory item'
      );
    }
  },

  async update(
    id: number,
    updates: Partial<InventoryItem>
  ): Promise<InventoryItem> {
    try {
      return await apiClient.put(`/inventory/${id}`, updates);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to update inventory item'
      );
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/inventory/${id}`);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to delete inventory item'
      );
    }
  },
};
