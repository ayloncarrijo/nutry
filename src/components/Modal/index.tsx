import IconButton from "components/IconButton";
import Portal from "components/Portal";
import React from "react";
import "twin.macro";

interface ModalProps extends React.PropsWithChildren {
  onDismiss: () => void;
  title?: string;
  className?: string;
}

function Modal({
  onDismiss,
  className,
  title,
  children,
}: ModalProps): JSX.Element {
  React.useEffect(() => {
    window.document.body.classList.add("is-modal-active");

    return () => {
      window.document.body.classList.remove("is-modal-active");
    };
  }, []);

  return (
    <Portal>
      <div tw="z-50 fixed inset-0 flex flex-col">
        <div tw="absolute inset-0 bg-black bg-opacity-50" onClick={onDismiss} />

        <div tw="relative bg-gray-900 p-4 flex justify-end">
          <div tw="-mx-2">
            <IconButton icon="close" onClick={onDismiss} />
          </div>
        </div>

        <div tw="min-h-0 flex justify-center items-center flex-1 p-1">
          <div
            tw="overflow-y-auto max-w-5xl max-h-full rounded-xl p-4 bg-gray-900 shadow-lg relative"
            className={className}
          >
            {title && (
              <h3 tw="mb-4 text-2xl font-medium text-center">{title}</h3>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
