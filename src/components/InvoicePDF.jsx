import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { useInvoiceStore } from '../store/useInvoiceStore';



// Create some basic PDF styles:
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica', // or 'Roboto'
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    borderBottomStyle: 'solid',
    marginBottom: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  logoImage: {
    height: 40,
    objectFit: 'contain',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  infoText: {
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    gap: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 4,
    paddingBottom: 4,
  },
  th: {
    fontWeight: 'bold',
  },
  tdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tdLeft: {
    flex: 3,
    textAlign: 'left',
  },
  tdRight: {
    flex: 1,
    textAlign: 'right',
  },
  totalsContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    width: '50%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  signatureContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    borderTopStyle: 'solid',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureLine: {
    width: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginBottom: 2,
  },
  smallText: {
    fontSize: 10,
    color: '#555',
  },
  notesText: {
    fontSize: 11,
    marginTop: 5,
    lineHeight: 1.4,
  },
});

export function InvoicePDF({ invoice, logo }) {
  const {
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
    items,
    selectedCurrency,
    taxRate,
  } = invoice;

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.titleText}>Invoice</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {/* If you have a base64 logo */}
            {logo && <Image src={logo} style={styles.logoImage} />}
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Design Studio
            </Text>
          </View>
        </View>

        {/* BILL TO / INVOICE INFO */}
        <View style={styles.row}>
          {/* Bill To Column */}
          <View style={[styles.column]}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            <Text style={styles.infoText}>Client Name: {clientName}</Text>
            <Text style={styles.infoText}>Company: {companyName}</Text>
            <Text style={styles.infoText}>Address: {billingAddress}</Text>
            <Text style={styles.infoText}>Phone: {phone}</Text>
            <Text style={styles.infoText}>Email: {email}</Text>
          </View>
          {/* Invoice Info Column */}
          <View style={[styles.column, { alignItems: 'flex-end' }]}>
            <Text style={styles.infoText}>
              Invoice Number: {invoiceNumber}
            </Text>
            <Text style={styles.infoText}>Invoice Date: {invoiceDate}</Text>
            <Text style={styles.infoText}>Due Date: {dueDate}</Text>
          </View>
        </View>

        {/* LINE ITEMS TABLE */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>Items:</Text>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.column, styles.th]}>Description</Text>
            <Text style={[styles.column, styles.th, { textAlign: 'center' }]}>
              Qty
            </Text>
            <Text style={[styles.column, styles.th, { textAlign: 'right' }]}>
              Rate
            </Text>
            <Text style={[styles.column, styles.th, { textAlign: 'right' }]}>
              Total
            </Text>
          </View>
          {/* Table Body */}
          {items.map((item, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={[styles.column]}>
                {item.description}
              </Text>
              <Text
                style={[
                  styles.column,
                  { textAlign: 'center' },
                ]}
              >
                {item.quantity}
              </Text>
              <Text style={[styles.column, { textAlign: 'right' }]}>
                {selectedCurrency} {item.price.toFixed(2)}
              </Text>
              <Text style={[styles.column, { textAlign: 'right' }]}>
                {selectedCurrency}{' '}
                {(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* TERMS / NOTES + TOTALS */}
        <View style={[styles.row, { marginTop: 20 }]}>
          {/* Terms & Conditions */}
          <View style={[styles.column, { marginRight: 10 }]}>
            <Text style={styles.sectionTitle}>Terms & Conditions:</Text>
            {terms &&
              terms.split('\n').map((line, i) => (
                <Text key={i} style={styles.notesText}>
                  {line}
                </Text>
              ))}
            {notes && (
              <>
                <Text style={styles.sectionTitle}>Additional Notes:</Text>
                <Text style={styles.notesText}>{notes}</Text>
              </>
            )}
          </View>

          {/* Totals */}
          <View style={[styles.column, styles.totalsContainer]}>
            <View style={styles.totalRow}>
              <Text>Subtotal:</Text>
              <Text>
                {selectedCurrency} {subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Tax ({taxRate}%)</Text>
              <Text>
                {selectedCurrency} {tax.toFixed(2)}
              </Text>
            </View>
            <View
              style={[
                styles.totalRow,
                { marginTop: 5, borderTopWidth: 1, borderTopColor: '#000', borderTopStyle: 'solid', paddingTop: 4 },
              ]}
            >
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalLabel}>
                {selectedCurrency} {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* PAYMENT INFO */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Payment Information:</Text>
          <Text style={styles.infoText}>
            Payment Method: {invoice.paymentMethod}
          </Text>
          <Text style={styles.infoText}>
            Bank Account: {invoice.bankAccount}
          </Text>
        </View>

        {/* SIGNATURE SECTION */}
        <View style={styles.signatureContainer}>
          <View>
            <Text style={styles.smallText}>Date: {invoiceDate}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.signatureLine} />
            <Text style={styles.smallText}>
              {signatureName || 'Signature'}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.notesText}>Notes: {invoice.notes}</Text>
        </View>
      </Page>
    </Document>
  );
}
