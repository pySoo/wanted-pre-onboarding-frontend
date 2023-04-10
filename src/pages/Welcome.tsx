import Card from "components/Card";
import CardContainer from "components/CardContainer";
import { useNavigate } from "react-router-dom";
import { path } from "routes/path";

export default function Welcome() {
  const navigate = useNavigate();
  const directToSignIn = () => navigate(path.signin);

  return (
    <CardContainer bgColor="primary">
      <Card css="p-10 flex flex-col items-center whitespace-pre-line text-center">
        <p className="text-xl font-semibold">
          {`2023 원티드 프리온보딩 \n 프론트엔드 인턴쉽 선발과제`}
        </p>
        <button
          className="text-lg font-semibold mt-5 bg-primary text-white rounded-xl p-2 hover:bg-blue-400"
          onClick={directToSignIn}
        >
          시작하기
        </button>
      </Card>
    </CardContainer>
  );
}
