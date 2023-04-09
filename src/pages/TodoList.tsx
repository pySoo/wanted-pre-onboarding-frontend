import apiClient from "api/apiClient";
import { apiUrl } from "api/config";
import Card from "components/Card";
import TodoItem, { TodoProps } from "components/TodoItem";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect } from "react";

export default function TodoList() {
  const [todoList, setTodoList] = useLocalStorage<TodoProps[]>("todo_list", []);
  const [accessToken, setAccessToken] = useLocalStorage("access_token");

  const getTodos = () =>
    apiClient["get"](apiUrl.todos).then((res: any) => {
      setTodoList(res);
    });

  useEffect(() => {
    getTodos();
  }, []);

  const handleLogout = () => {
    setAccessToken("");
  };

  return (
    <div className="w-screen h-screen bg-gray-200 p-5 relative flex flex-col justify-center">
      <button
        className="absolute right-0 top-0 text-gray-500 p-5 mb-5"
        onClick={handleLogout}
      >
        로그아웃
      </button>
      <Card css="h-[500px]">
        <div className="w-full bg-primary text-white text-center py-[9px]">
          <span className="font-bold text-[28px]">TodoList</span>
        </div>
        <div className="p-3 w-full h-[400px] overflow-auto">
          <div className="flex flex-col gap-3">
            {todoList.map((item, index) => (
              <TodoItem key={`${item.id}${index}`} item={item} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
