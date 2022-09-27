import ReactDOM from "react-dom";

function Portal({ children }: React.PropsWithChildren): JSX.Element {
  return ReactDOM.createPortal(children, window.document.body);
}

export default Portal;
