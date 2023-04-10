import { ChangeEvent } from "react";

export interface InputProps {
  testId: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  info: string;
}

interface SignInputProps {
  input: InputProps;
}

export default function SignInput({ input }: SignInputProps) {
  const { testId, value, type, placeholder, onChange, info } = input;
  return (
    <div className="w-full">
      <input
        data-testid={testId}
        value={value}
        type={type}
        placeholder={placeholder}
        className="w-full border-b-2 focus:border-b-primary focus:outline-none "
        onChange={onChange}
      />
      <span className="text-gray-400 text-xs">{info}</span>
    </div>
  );
}
