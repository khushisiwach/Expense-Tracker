import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = 'text',
  name,
  required = false,
  min,
  max,
  step,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  // Determine actual input type
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[16px] text-slate-600 mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center border rounded-md p-2">
        <input
          type={actualType}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent outline-none text-[15px] cursor-pointer"
        />

        {isPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 text-gray-600 focus:outline-none"
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
