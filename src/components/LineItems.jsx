import { useInvoiceStore } from '../store/useInvoiceStore';

export default function LineItems() {
  const removeItem = useInvoiceStore((state) => state.removeItem)
  const invoice = useInvoiceStore((state) => state.invoice)
  const updateItem = useInvoiceStore((state) => state.updateItem)
  const addItem = useInvoiceStore((state) => state.addItem)

  return (
    <div>
      <label className="block font-semibold text-lg mb-2">Line Items</label>
      <div className="space-y-3">
        {invoice.items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              placeholder="Description"
              className="input peer bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-lg"
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              className="input peer bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-lg" value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Price"
              className="input peer bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-lg" value={item.price}
              onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
            />
            <button
              type="button"
              className="col-span-1 text-red-500 font-bold"
              onClick={() => removeItem(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 text-blue-600 hover:underline font-medium"
        onClick={addItem}
      >
        + Add Item
      </button>
    </div>
  );
}
