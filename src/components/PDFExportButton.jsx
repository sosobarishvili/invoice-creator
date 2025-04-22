// src/components/PDFExportButton.jsx
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from './InvoicePDF';
import { useInvoiceStore } from '../store/useInvoiceStore';

export default function PDFExportButton() {
  // We do *not* subscribe here – we just need an imperative getter:
  const getInvoiceState = useInvoiceStore;

  // Local flag so React renders only once per click
  const [docElement, setDocElement] = React.useState(null);

  const handlePrepare = () => {
    const { invoice, logo } = getInvoiceState.getState();
    // Create a fresh <InvoicePDF /> only when user clicks
    setDocElement(<InvoicePDF invoice={invoice} logo={logo} />);
  };

  return (
    <div className="mt-4">
      {/* We render PDFDownloadLink only *after* we have a doc element */}
      {docElement ? (
        <PDFDownloadLink
          document={docElement}
          fileName="invoice.pdf"
          className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-4 py-2 rounded"
        >
          {({ loading }) =>
            loading ? 'Generating PDF…' : 'Click to download'
          }
        </PDFDownloadLink>
      ) : (
        <button
          onClick={handlePrepare}
          className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-4 py-2 rounded"
        >
          Prepare PDF
        </button>
      )}
    </div>
  );
}
