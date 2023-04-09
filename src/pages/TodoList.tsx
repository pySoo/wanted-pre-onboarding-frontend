import apiClient from "api/apiClient";
import { apiUrl } from "api/config";
import Card from "components/Card";
import TodoAddInput from "components/TodoAddInput";
import TodoItem, { TodoProps } from "components/TodoItem";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [todoList, setTodoList] = useLocalStorage<TodoProps[]>("todo_list", []);
  const [accessToken, setAccessToken] = useLocalStorage("access_token");
  const navigate = useNavigate();
  const navigateToSignIn = () => navigate("/signin");

  useEffect(() => {
    if (!accessToken) {
      navigateToSignIn();
    }
  }, [accessToken]);

  const postCreateTodo = (todo: string) =>
    apiClient["post"](apiUrl.todos, { todo }).then((res: any) => {
      setTodoList((prev) => [...prev, res]);
    });

  const getTodos = () =>
    apiClient["get"](apiUrl.todos).then((res: any) => {
      setTodoList(res);
    });

  const updateTodo = (item: TodoProps) =>
    apiClient["put"](`${apiUrl.todos}/${item.id}`, {
      todo: item.todo,
      isCompleted: item.isCompleted,
    }).then((res) => {});

  const deleteTodo = (id: number) =>
    apiClient["delete"](`${apiUrl.todos}/${id}`).then((res) => {});

  useEffect(() => {
    getTodos();
  }, []);

  const handleInput = (input: string) => {
    postCreateTodo(input);
  };

  const handleUpdate = (item: TodoProps) => {
    updateTodo(item);
    setTodoList((prev) =>
      prev.map((prev) => (prev.id === item.id ? item : prev))
    );
  };
  const handleDelete = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

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
        <TodoAddInput handleInput={handleInput} />
        <div className="p-3 w-full h-[400px] overflow-auto">
          <div className="flex flex-col gap-3">
            {todoList.map((item, index) => (
              <TodoItem
                key={`${item.id}${index}`}
                item={item}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
