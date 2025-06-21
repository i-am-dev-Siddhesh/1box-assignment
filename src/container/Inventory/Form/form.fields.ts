import { FaRegHandPaper } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { PiCurrencyGbp } from "react-icons/pi";

const inventoryFormFields = [
  {
    name: 'ticketType',
    label: 'Ticket Type',
    type: 'select',
    required: true,
    options: ['General Admission', 'VIP', 'Premium', 'Student', 'Season Pass'],
    note: 'Asterisk (*) indicates required field',
  },
  {
    name: 'quantity',
    label: 'Quantity',
    type: 'select',
    required: true,
    options: [1, 5, 10, 25, 50],
  },
  {
    name: 'splitType',
    label: 'Split Type',
    type: 'select',
    required: false,
    options: ['None', 'Not Seated Together', 'Partial Group', 'Even Split'],
  },
  {
    name: 'seatingArrangement',
    label: 'Seating Arrangement',
    type: 'select',
    required: true,
    options: [
      'Reserved Seating',
      'General Admission',
      'Standing Room',
      'Box Seats',
      'Balcony',
    ],
  },
  {
    name: 'maxDisplayQuantity',
    label: 'Max Display Quantity',
    type: 'number',
    required: false,
    note: "Has 'Y' indicator but no asterisk",
  },
  {
    name: 'fanArea',
    label: 'Fan Area',
    type: 'select',
    required: false,
    options: [
      'Home Fans',
      'Away Fans',
      'Family Zone',
      'Premium Lounge',
      'Disabled Access',
    ],
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    options: [
      'Away Fans Section',
      'Home Fans Section',
      'Neutral Zone',
      'Premium',
    ],
  },
  {
    name: 'sectionBlock',
    label: 'Section/Block',
    type: 'select',
    required: false,
    options: [
      'Longside Lower Tier',
      'Longside Upper Tier',
      'Shortside East',
      'Shortside West',
      'Center Box',
    ],
  },
  {
    name: 'row',
    label: 'Row',
    type: 'number',
    required: false,
    value: 5,
    min: 1,
    max: 50,
  },
  {
    name: 'firstSeat',
    label: 'First Seat',
    type: 'number',
    required: false,
    value: 3,
    min: 1,
    max: 100,
  },
  {
    name: 'faceValue',
    label: 'Face Value',
    type: 'currency',
    required: false,
    value: 90000,
    currency: 'GBP',
    leftIcon: PiCurrencyGbp
  },
  {
    name: 'payoutPrice',
    label: 'Payout Price',
    type: 'currency',
    required: true,
    value: 90000,
    currency: 'GBP',
    leftIcon: PiCurrencyGbp
  },
  {
    name: 'benefits',
    label: 'Benefits',
    type: 'select',
    required: false,
    options: [
      'None',
      'Early Entry',
      'Meet & Greet',
      'Merchandise Pack',
      'Food Voucher',
    ],
  },
  {
    name: 'restrictions',
    label: 'Restrictions',
    type: 'select',
    required: false,
    options: [
      'None',
      'No Alcohol',
      'Age Restricted',
      'No Re-entry',
      'Dress Code',
    ],
  },
  {
    name: 'dateToShip',
    label: 'Date to Ship',
    type: 'date',
    required: false,
    value: '29/11/2014',
    min: '01/11/2014',
    max: '31/12/2014',
  },
  {
    name: 'ticketsInHand',
    label: 'Tickets in hand',
    type: 'checkbox',
    required: false,
    leftIcon: FaRegHandPaper 
  },
  {
    name: 'uploadTickets',
    label: 'Upload Tickets',
    type: 'file',
    required: false,
    accept: '.pdf,.png,.jpg',
    leftIcon: FiUpload 
  },
];

export default inventoryFormFields;
