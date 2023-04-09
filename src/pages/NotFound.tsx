import Card from "components/Card";
import CardContainer from "components/CardContainer";
import React from "react";
import { useNavigate } from "react-router-dom";
import { path } from "routes/path";

export default function NotFound() {
  const navigate = useNavigate();
  const directToSignIn = () => navigate(path.signin);

  return (
    <CardContainer bgColor="primary">
      <Card css="p-10 flex flex-col items-center">
        <p className="text-xl font-semibold">유효하지 않은 페이지입니다.</p>
        <p
          className="text-primary text-lg font-semibold pt-4 cursor-pointer"
          onClick={directToSignIn}
        >
          로그인 페이지로 이동하기
        </p>
      </Card>
    </CardContainer>
  );
}
