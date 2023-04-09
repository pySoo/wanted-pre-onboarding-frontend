import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";

interface TodoAddInputProps {
  handleInput: (input: string) => void;
}

export default function TodoAddInput({ handleInput }: TodoAddInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.length === 0) {
      toast.warn("내용을 입력해 주세요.");
      return;
    }
    handleInput(input);
    setInput("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form className="w-full h-[40px] flex items-center" onSubmit={handleSubmit}>
      <input
        data-testid="new-todo-input"
        className="w-full h-full px-2 bg-gray-800 caret-primary text-gray-200 placeholder:text-gray-200 focus:outline-none"
        value={input}
        placeholder="내용을 입력하세요"
        onChange={handleChange}
      />
      <button
        data-testid="new-todo-add-button font-semibold"
        className="flex justify-center items-center w-[80px] h-full bg-gray-300"
      >
        <FaPencilAlt size="20px" className="transition hover:scale-[1.1]" />
      </button>
    </form>
  );
}
