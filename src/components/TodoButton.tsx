import React from "react";

export default function TodoButton(props: any) {
  return (
    <button
      className={`shrink-0 p-1 rounded-md bg-gray-600 text-white hover:bg-gray-400`}
      {...props}
    >
      {props.children}
    </button>
  );
}
