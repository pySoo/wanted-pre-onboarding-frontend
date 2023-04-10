import apiClient from "api/apiClient";
import { apiUrl } from "api/config";
import CardContainer from "components/CardContainer";
import SignInput, { InputProps } from "components/SignInput";
import { useLocalStorage } from "hooks/useLocalStorage";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const inputList: InputProps[] = [
    {
      testId: "email-input",
      value: email,
      type: "email",
      placeholder: "이메일",
      onChange: onChangeEmail,
      info: "이메일에는 @가 포함되어야 합니다.",
    },
    {
      testId: "password-input",
      value: password,
      type: "password",
      placeholder: "비밀번호",
      onChange: onChangePassword,
      info: "비밀번호는 8자 이상이어야 합니다.",
    },
  ];

  return (
    <CardContainer bgColor="primary">
      <form
        className="flex flex-col gap-5 p-10 pb-8 items-center"
        onSubmit={handleSubmit}
        autoComplete="auto"
      >
        <h1 className="font-bold text-[30px] text-gray-600">로그인</h1>
        {inputList.map((input) => (
          <SignInput input={input} />
        ))}
        <button
          data-testid="signin-button"
          className="w-full bg-primary text-white rounded-lg p-3 mt-2 font-semibold disabled:opacity-50"
          disabled={validateForm()}
        >
          로그인
        </button>
        <div className="flex items-center text-md">
          <span>처음이에요</span>
          <Link to={path.signup} className="ml-2 underline">
            회원가입
          </Link>
        </div>
      </form>
    </CardContainer>
  );
}
