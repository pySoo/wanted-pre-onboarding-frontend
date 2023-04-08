import React from "react";
import Card from "./Card";
interface CardContainerProps {
  children: React.ReactNode;
  bgColor?: string;
}

export default function CardContainer({
  children,
  bgColor,
}: CardContainerProps) {
  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center px-5 bg-${[
        bgColor,
      ]}`}
    >
      <Card>{children}</Card>
    </div>
  );
}
