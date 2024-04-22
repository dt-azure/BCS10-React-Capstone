import React from "react";

const ButtonCustom = ({ label, classNameAdd }) => {
  return (
    <>
      <button
        type="button"
        className={`focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 w-full ${classNameAdd}`}
      >
        {label}
      </button>
    </>
  );
};

export default ButtonCustom;
