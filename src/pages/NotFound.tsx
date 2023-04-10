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
      <Card css="p-10 flex flex-col items-center whitespace-pre-line text-center">
        <p className="text-xl font-semibold">유효하지 않은 페이지입니다.</p>
        <button
          className="text-lg font-semibold mt-5 bg-primary text-white rounded-xl p-2 hover:bg-blue-400"
          onClick={directToSignIn}
        >
          {`로그인 페이지로`}
        </button>
      </Card>
    </CardContainer>
  );
}
