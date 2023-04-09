import apiClient from "api/apiClient";
import { apiUrl } from "api/config";
import CardContainer from "components/CardContainer";
import { useLocalStorage } from "hooks/useLocalStorage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { path } from "routes/path";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useLocalStorage("access_token");

  const navigate = useNavigate();
  const directToTodo = () => navigate("/todo");
  useEffect(() => {
    if (accessToken) {
      directToTodo();
    }
  }, [accessToken]);

  const postSignIn = () =>
    apiClient["post"](apiUrl.signIn, { email, password })
      .then((res: any) => {
        const token = res.access_token;
        if (token) {
          toast.success("환영합니다!");
          setAccessToken(token);
        }
      })
      .catch((err) => {
        switch (err.statusCode) {
          case 401:
            toast.error("비밀번호를 다시 확인해 주세요.");
            break;
          case 404:
            toast.error(err.message);
            break;
          default:
            toast.error("로그인에 실패했습니다.");
            break;
        }
        setAccessToken("");
      });

  const validateForm = () => {
    if (email.includes("@") && password.length >= 8) {
      return false;
    }
    return true;
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postSignIn();
  };

  return (
    <CardContainer bgColor="primary">
      <form
        className="flex flex-col items-center gap-10 p-10 pb-8"
        onSubmit={handleSubmit}
        autoComplete="auto"
      >
        <h1 className="font-bold text-[30px] text-gray-600">로그인</h1>
        <input
          data-testid="email-input"
          value={email}
          type="email"
          placeholder="이메일"
          className="w-full border-b-2 focus:border-b-primary focus:outline-none "
          onChange={onChangeEmail}
        />
        <input
          value={password}
          data-testid="password-input"
          type="password"
          placeholder="비밀번호"
          className="w-full border-b-2 focus:border-b-primary focus:outline-none"
          onChange={onChangePassword}
        />
        <button
          data-testid="signin-button"
          className="w-full bg-primary text-white rounded-lg p-3 mt-2 font-semibold disabled:opacity-50"
          disabled={validateForm()}
        >
          로그인
        </button>
        <div className="flex items-center text-md">
          <span>처음이에요</span>
          <a className="ml-2 underline" href={path.signup}>
            회원가입
          </a>
        </div>
      </form>
    </CardContainer>
  );
}
