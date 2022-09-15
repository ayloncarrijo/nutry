import type React from "react";
import "twin.macro";

function MessageBox({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <div tw="w-full py-32 px-8 border border-gray-500 rounded-xl flex items-center justify-center text-center font-medium">
      {children}
    </div>
  );
}

export default MessageBox;
