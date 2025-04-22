export default function FloatingInput({ label, icon, ...props }, date) {
  return (
    <div className="relative mt-4 w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      {date ? (
        <input
          {...props}
          type="date"
          placeholder=" "
          className={`input peer bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-lg ${icon ? 'pl-10' : ''}`}
        />
      ) : (
        <input
          {...props}
          placeholder=" "
          className={`input peer bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 text-lg ${icon ? 'pl-10' : ''}`}
        />
      )}
      <label className="absolute bg-white dark:bg-gray-800 left-5 peer-placeholder-shown:top-1/2 top-0 transform -translate-y-1/2 text-gray-500 dark:text-white peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary-600 transition-all">
        {label}
      </label>
    </div>
  );
}
