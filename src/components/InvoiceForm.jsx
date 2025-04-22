import React, { useEffect } from 'react';
import {
  useForm,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { FaUser, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';

import { useInvoiceStore } from '../store/useInvoiceStore';
import FloatingInput from './ui/FloatingInput';
import LineItems from './LineItems';
import ThemeToggle from './ThemeToggle';

export default function InvoiceForm() {
  const invoiceFromStore = useInvoiceStore((s) => s.invoice);
  const updateInvoice = useInvoiceStore((s) => s.updateInvoice);
  const setLogo = useInvoiceStore((s) => s.setLogo);

  const methods = useForm({
    defaultValues: {
      sender: invoiceFromStore.sender,
      recipient: invoiceFromStore.recipient,
      taxRate: invoiceFromStore.taxRate,
      notes: invoiceFromStore.notes,
      selectedCurrency: invoiceFromStore.selectedCurrency,
      items: invoiceFromStore.items,

      // NEW fields
      clientName: invoiceFromStore.clientName,
      companyName: invoiceFromStore.companyName,
      billingAddress: invoiceFromStore.billingAddress,
      phone: invoiceFromStore.phone,
      email: invoiceFromStore.email,
      invoiceNumber: invoiceFromStore.invoiceNumber,
      invoiceDate: invoiceFromStore.invoiceDate,
      dueDate: invoiceFromStore.dueDate,
      paymentMethod: invoiceFromStore.paymentMethod,
      bankAccount: invoiceFromStore.bankAccount,
      signatureName: invoiceFromStore.signatureName,
    },
  });

  const { control, register } = methods;
  const formValues = useWatch({ control });

  useEffect(() => {
    const {
      sender,
      recipient,
      taxRate,
      notes,
      selectedCurrency,
      items,
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
    } = formValues;

    updateInvoice('sender', sender);
    updateInvoice('recipient', recipient);
    updateInvoice('taxRate', parseFloat(taxRate || 0));
    updateInvoice('notes', notes);
    updateInvoice('selectedCurrency', selectedCurrency);
    updateInvoice(items || []);

    // NEW fields
    updateInvoice('clientName', clientName);
    updateInvoice('companyName', companyName);
    updateInvoice('billingAddress', billingAddress);
    updateInvoice('phone', phone);
    updateInvoice('email', email);
    updateInvoice('invoiceNumber', invoiceNumber);
    updateInvoice('invoiceDate', invoiceDate);
    updateInvoice('dueDate', dueDate);
    updateInvoice('paymentMethod', paymentMethod);
    updateInvoice('bankAccount', bankAccount);
    updateInvoice('signatureName', signatureName);
  }, [formValues, updateInvoice]);



  return (
    <FormProvider {...methods}>
      <div className="space-y-6 bg-white dark:bg-gray-800 p-4 rounded-[20px]">
        {/* Theme Toggle (optional) */}
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setLogo(file);
            }}
            className="block w-full border rounded-lg px-3 py-2 text-sm 
              bg-white dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        {/* Invoice Number / Invoice Date */}
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Invoice Number"
            icon={<FaUser />}
            {...register('invoiceNumber')}
          />
          <FloatingInput
            type="date"
            label="Invoice Date (YYYY-MM-DD)"
            icon={<FaUserTie />}
            {...register('invoiceDate')}
          />
        </div>

        {/* Client Name / Company Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Client Name"
            {...register('clientName')}
          />
          <FloatingInput
            label="Company Name"
            {...register('companyName')}
          />
        </div>

        {/* Billing Address / Phone / Email */}
        <FloatingInput
          label="Billing Address"
          {...register('billingAddress')}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Phone"
            {...register('phone')}
          />
          <FloatingInput
            label="Email"
            {...register('email')}
          />
        </div>

        {/* Payment Info (Due date, Payment Method, Bank Account) */}
        <div className="grid md:grid-cols-3 gap-4">
          <FloatingInput
            type="date"
            label="Due Date (YYYY-MM-DD)"
            {...register('dueDate')}
          />
          <FloatingInput
            label="Payment Method"
            {...register('paymentMethod')}
          />
          <FloatingInput
            label="Bank Account"
            {...register('bankAccount')}
          />
        </div>

        {/* Signature Name */}
        <FloatingInput
          label="Signature (e.g. John Smith)"
          {...register('signatureName')}
        />

        {/* Tax & Currency */}
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Tax Rate (%)"
            icon={<FaMoneyBillWave />}
            type="number"
            step="0.1"
            {...register('taxRate')}
          />
          <div className="relative mt-4">
            <select
              {...register('selectedCurrency')}
              className="input block w-full rounded-lg px-3 pt-4 pb-1 
                bg-transparent border border-gray-300 
                dark:border-gray-600 text-sm 
                focus:outline-none focus:border-primary-500 
                dark:focus:border-primary-400 dark:text-white dark:bg-gray-800"
            >
              {invoiceFromStore.currency.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label className="absolute left-3 top-1 text-sm text-gray-500 dark:text-gray-400">
              Currency
            </label>
          </div>
        </div>

        {/* LineItems */}
        <LineItems />

        {/* Notes */}
        <div className="relative mt-4">
          <textarea
            rows={4}
            placeholder=" "
            {...register('notes')}
            className="input w-full rounded-lg 
              px-3 pt-4 pb-1 border border-gray-300 
              dark:border-gray-600 bg-transparent 
              focus:outline-none focus:border-primary-500 
              dark:focus:border-primary-400"
          />
          <label className="absolute left-3 top-1 text-sm text-gray-500 dark:text-gray-400">
            Notes
          </label>
        </div>
      </div>
    </FormProvider>
  );
}
