import React from "react";

const FormField = ({
  labelName,
  type,
  placeHolder,
  name,
  value,
  handleChange,
  handleSurpriseMe,
  isSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            className="text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black font-semibold"
            onClick={handleSurpriseMe}
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value || ""} // Ensure value is never null
        onChange={handleChange}
        placeholder={placeHolder}
        className="bg-gray-50 border border-b-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4669ff] focus:border-[#4669ff] w-full outline-none block p-3"
        required
      />
    </div>
  );
};

export default FormField;
