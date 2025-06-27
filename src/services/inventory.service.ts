import apiClient from './serverConfig';

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

interface BulkUpdateRequest {
  updates: {
    id: number;
    name?: string;
    quantity?: number;
  }[];
}

interface BulkDeleteRequest {
  ids: number[];
}
export const InventoryService = {
  async getAll(): Promise<InventoryItem[]> {
    try {
      const response = await apiClient.get('/inventory');
      return response.data || [];
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch inventory'
      );
    }
  },

  async getById(id: number): Promise<InventoryItem> {
    try {
      const response = await apiClient.get(`/inventory?id=${id}`);
      if (!response.data) {
        throw new Error('Inventory item not found');
      }
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Inventory item not found'
      );
    }
  },

  async bulkCreate(
    items: Omit<InventoryItem, 'id'>[]
  ): Promise<InventoryItem[]> {
    try {
      const response = await apiClient.post('/inventory', items);
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to create inventory items'
      );
    }
  },

  async create(item: any): Promise<InventoryItem> {
    const [createdItem] = await this.bulkCreate([item]);
    return createdItem;
  },

  async bulkUpdate(
    updates: BulkUpdateRequest['updates']
  ): Promise<InventoryItem[]> {
    try {
      const response = await apiClient.put('/inventory', { updates });
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to update inventory items'
      );
    }
  },

  async update(
    id: number,
    updates: Partial<InventoryItem>
  ): Promise<InventoryItem> {
    const [updatedItem] = await this.bulkUpdate([{ id, ...updates }]);
    return updatedItem;
  },

  async bulkDelete(ids: number[]): Promise<{ deletedCount: number }> {
    try {
      const response = await apiClient.delete('/inventory', {
        data: { ids },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to delete inventory items'
      );
    }
  },

  async delete(id: number): Promise<void> {
    await this.bulkDelete([id]);
  },

  async searchByName(query: string): Promise<InventoryItem[]> {
    try {
      const allItems = await this.getAll();
      return allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to search inventory'
      );
    }
  },
};
