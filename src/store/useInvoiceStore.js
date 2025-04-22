import { create } from 'zustand';

export const useInvoiceStore = create((set) => ({
  invoice: {
    // Existing fields
    sender: '',         // If you no longer need 'sender' you can remove it
    recipient: '',      // Same here, or rename it to something else
    currency: ['USD', 'GEL', 'EUR', 'GBP', 'RUB'],
    selectedCurrency: 'USD',
    items: [
      { description: '', quantity: 1, price: 0 },
    ],
    notes: '',
    taxRate: 0,

    // NEW fields
    clientName: '',
    companyName: '',
    billingAddress: '',
    phone: '',
    email: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    paymentMethod: '',
    bankAccount: '',
    signatureName: '',
    terms: `• Payment is due upon receipt of this invoice.\n• Late payments may incur additional charges.\n• Please make checks payable to Your Graphic Design Studio.`,
  },

  logo: null,
  setLogo: (file) => {
    if (!/image\/(png|jpeg|jpg)/.test(file.type)) {
      alert('Only PNG or JPG images can be used in the PDF');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => set({ logo: reader.result });
    reader.readAsDataURL(file);
  },

  updateInvoice: (key, value) =>
    set((state) => ({
      invoice: { ...state.invoice, [key]: value },
    })),

  updateItem: (index, key, value) =>
    set((state) => {
      const items = [...state.invoice.items];
      items[index][key] = value;
      return {
        invoice: { ...state.invoice, items },
      };
    }),

  addItem: () =>
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: [
          ...state.invoice.items,
          { description: '', quantity: 1, price: 0 },
        ],
      },
    })),

  removeItem: (index) =>
    set((state) => {
      const items = [...state.invoice.items];
      items.splice(index, 1);
      return {
        invoice: { ...state.invoice, items },
      };
    }),
}));

