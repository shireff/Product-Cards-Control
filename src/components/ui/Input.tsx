import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}

// eslint-disable-next-line no-empty-pattern
const Input = ({ ...rest }: Iprops) => {
  return (
    <input
      className="border-[1px] border-gray-400 shadow-md focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-md px-3 py-3 text-md"
      {...rest}
    />
  );
};

export default Input;
