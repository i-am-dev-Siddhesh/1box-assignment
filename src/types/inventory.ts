interface InventoryItem {
  id?: number;
  ticketType: string;
  quantity: number;
  splitType?: string;
  seatingArrangement: string;
  maxDisplayQuantity?: number;
  fanArea?: string;
  category: string;
  sectionBlock?: string;
  row?: number;
  firstSeat?: number;
  faceValue?: number;
  payoutPrice: number;
  benefits?: string;
  restrictions?: string;
  dateToShip?: string;
  ticketsInHand?: boolean;
  uploadTickets?: string;
}