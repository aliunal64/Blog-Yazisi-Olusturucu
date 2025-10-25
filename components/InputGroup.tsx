
import React from 'react';

interface InputGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  as?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  as = 'input',
  rows = 3,
  required = false
}) => {
  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    placeholder,
    required,
    className: "block w-full rounded-md border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:focus:ring-indigo-500"
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200">
        {label}
      </label>
      <div className="mt-2">
        {as === 'textarea' ? (
          <textarea {...commonProps} rows={rows}></textarea>
        ) : (
          <input type="text" {...commonProps} />
        )}
      </div>
    </div>
  );
};

export default InputGroup;
