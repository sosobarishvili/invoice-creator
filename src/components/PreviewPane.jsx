import { useInvoiceStore } from '../store/useInvoiceStore';

export default function PreviewPane() {
  const { invoice, logo } = useInvoiceStore();

  const {
    items,
    selectedCurrency,
    taxRate,
    clientName,
    companyName,
    billingAddress,
    phone,
    email,
    invoiceNumber,
    invoiceDate,
    dueDate,
    paymentMethod,
    bankAccount,
    signatureName,
    terms,
    notes,
  } = invoice;

  const subtotal = items.reduce(
    (sum, item, idx) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  return (
    <div
      id="invoice-preview"
      className="bg-white dark:bg-gray-900 text-black dark:text-gray-100 p-6 rounded-[20px] space-y-4 w-full mx-auto "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold">INVOICE</h1>
        </div>
        <div className="flex flex-col items-end">
          {logo && (
            <img
              src={logo}
              alt="Invoice Logo"
              className="h-12 mb-1 object-contain"
              style={{ maxWidth: '80px' }}
            />
          )}
          <span className="font-bold text-xl">Design Studio</span>
        </div>
      </div>

      {/* BILL TO & INVOICE INFO */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Bill To:</h2>
          <p>Client Name: {clientName}</p>
          <p>Company Name: {companyName}</p>
          <p>Billing Address: {billingAddress}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
        <div className="space-y-1 text-right md:text-left">
          <p>
            <strong>Invoice Number:</strong> {invoiceNumber}
          </p>
          <p>
            <strong>Invoice Date:</strong>{' '}
            {invoiceDate || 'September 26, 2030'}
          </p>
        </div>
      </div>

      {/* SERVICE DETAILS */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Service Details:</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 text-left">No</th>
              <th className="p-2 text-left">Description of Service</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-t dark:border-gray-700">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">
                  {selectedCurrency}{' '}
                  {item.price.toFixed(2)}
                </td>
                <td className="p-2 text-right">
                  {selectedCurrency}{' '}
                  {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TERMS & CONDITIONS */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="font-semibold mb-2">
            Terms and Conditions:
          </h3>
          {/* If your store has a multi-line string for terms, you can split by \n */}
          {terms?.split('\n').map((line, i) => (
            <p className="text-sm ml-2 list-disc" key={i}>
              {line.replace(/^•\s?/, '• ')}
            </p>
          ))}
        </div>
        {/* TOTALS */}
        <div className="w-48 self-end space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              {selectedCurrency} {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({taxRate || 0}%):</span>
            <span>
              {selectedCurrency} {tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-1">
            <span>Total Amount Due:</span>
            <span>
              {selectedCurrency} {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* PAYMENT INFORMATION */}
      <div>
        <h3 className="font-semibold text-lg mb-2">
          Payment Information:
        </h3>
        <div className="flex flex-col gap-1 text-sm">
          <p>
            <strong>Payment Method:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Due Date:</strong>{' '}
            {dueDate || 'October 15, 2030'}
          </p>
          <p>
            <strong>Bank Account:</strong> {bankAccount}
          </p>
        </div>
      </div>

      {/* NOTES (like “Questions”) */}
      <div>
        <h3 className="font-semibold text-lg mb-2">
          Notes
        </h3>
        {/* Example: user’s note or contact info */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {notes || (
            <>
              Email Us: designstudio@email.com
              <br />
              Call Us: (123) 456-7890
            </>
          )}
        </p>
      </div>

      {/* SIGNATURE AREA */}
      <div className="flex justify-between items-center mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Date : {invoiceDate || 'September 26, 2030'}
          </p>
        </div>
        <div className="text-right">
          <div className="h-8 border-b border-gray-500 w-48 mb-1 mx-auto" />
          <p className="text-sm">{signatureName || 'John Smith'}</p>
        </div>
      </div>
    </div>
  );
}
