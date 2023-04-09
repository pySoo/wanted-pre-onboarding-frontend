import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import TodoButton from "./TodoButton";

interface TodoBoxProps {
  item: TodoProps;
  handleUpdate: (item: TodoProps) => void;
  handleDelete: (id: number) => void;
}

export interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export default function TodoBox({
  item,
  handleUpdate,
  handleDelete,
}: TodoBoxProps) {
  const [todo, setTodo] = useState(item.todo);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const changedTodo = { ...item, isCompleted: !item.isCompleted };
    handleUpdate(changedTodo);
  };

  const handleModifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todo.length === 0) {
      toast.warn("내용을 입력해 주세요.");
      return;
    }
    const changedTodo = { ...item, todo };
    handleUpdate(changedTodo);
    setIsUpdate(false);
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
          {isUpdate ? (
            <input
              data-testid="modify-input"
              autoFocus
              value={todo}
              className="break-all w-full ring-[2px] focus:outline-none p-1"
              onChange={handleModifyInput}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          ) : (
            <span className="p-1 break-all">{item.todo}</span>
          )}
        </div>
      </label>
      <div className="flex items-center gap-1 shrink-0">
        {isUpdate ? (
          <>
            <TodoButton data-testid="submit-button" onClick={handleSubmit}>
              제출
            </TodoButton>
            <TodoButton
              data-testid="cancel-button"
              onClick={() => setIsUpdate(false)}
              className={`shrink-0 p-1 rounded-md bg-red-400 text-white hover:bg-red-300`}
            >
              취소
            </TodoButton>
          </>
        ) : (
          <>
            <TodoButton
              data-testid="modify-button"
              onClick={() => setIsUpdate(true)}
            >
              수정
            </TodoButton>
            <TodoButton
              data-testid="delete-button"
              onClick={() => handleDelete(item.id)}
              className={`shrink-0 p-1 rounded-md bg-red-400 text-white hover:bg-red-300`}
            >
              삭제
            </TodoButton>
          </>
        )}
      </div>
    </li>
  );
}
