import './App.css'
import InvoiceForm from './components/InvoiceForm';
import PreviewPane from './components/PreviewPane';
import PDFExportButton from './components/PDFExportButton';
import { useEffect } from 'react';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 p-5 dark:text-white transition-colors duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <InvoiceForm />
        <div className='flex flex-col w-full items-center'>
          <PreviewPane />
          <PDFExportButton />
        </div>
      </div>
    </div>
  );
}
