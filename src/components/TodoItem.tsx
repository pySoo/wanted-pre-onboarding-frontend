import React, { ChangeEvent } from "react";
import TodoButton from "./TodoButton";

interface TodoBoxProps {
  item: TodoProps;
  handleDelete: (id: number) => void;
}

export interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export default function TodoBox({ item, handleDelete }: TodoBoxProps) {
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const changedTodo = { ...item, isCompleted: !item.isCompleted };
  };

  return (
    <li key={`${item.id}`} className="flex items-center justify-between gap-3">
      <label className="w-full flex items-center">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={handleCheckbox}
          className="w-[20px] h-[20px] mr-2 accent-primary shrink-0"
        />
        <div className="flex-1">
          <span className="p-1 break-all">{item.todo}</span>
        </div>
      </label>
      <div className="flex items-center gap-1 shrink-0">
        <>
          <TodoButton data-testid="modify-button">수정</TodoButton>
          <TodoButton
            data-testid="delete-button"
            onClick={() => handleDelete(item.id)}
            className={`shrink-0 p-1 rounded-md bg-red-400 text-white hover:bg-red-300`}
          >
            삭제
          </TodoButton>
        </>
      </div>
    </li>
  );
}
