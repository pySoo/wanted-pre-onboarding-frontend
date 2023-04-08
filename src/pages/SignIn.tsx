import CardContainer from "components/CardContainer";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <a className="ml-2 underline" href={"/signin"}>
            회원가입
          </a>
        </div>
      </form>
    </CardContainer>
  );
}
