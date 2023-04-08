import CardContainer from "components/CardContainer";
import { ChangeEvent, useState } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "api/apiClient";
import { apiUrl } from "api/config";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const directToTodo = () => navigate("/todo");

  const postSignUp = () =>
    apiClient["post"](apiUrl.signUp, { email, password }).then((res: any) => {
      directToTodo();
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    postSignUp();
  };

  return (
    <CardContainer bgColor="primary">
      <form
        className="flex flex-col items-center gap-10 p-10 pb-8"
        onSubmit={handleSubmit}
        autoComplete="auto"
      >
        <h1 className="font-bold text-[30px] text-gray-600">회원가입</h1>
        <input
          data-testid="email-input"
          value={email}
          type="email"
          placeholder="이메일"
          className="w-full border-b-2 focus:border-b-primary focus:outline-none "
          onChange={onChangeEmail}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="비밀번호"
          className="w-full border-b-2 focus:border-b-primary focus:outline-none"
          onChange={onChangePassword}
        />
        <button
          data-testid="signup-button"
          className="w-full bg-primary text-white rounded-lg p-3 mt-2 font-semibold disabled:opacity-50"
          disabled={validateForm()}
        >
          회원가입
        </button>
        <div className="flex items-center text-md">
          <span>계정이 있어요</span>
          <a className="ml-2 underline" href={"/signin"}>
            로그인
          </a>
        </div>
      </form>
    </CardContainer>
  );
}
