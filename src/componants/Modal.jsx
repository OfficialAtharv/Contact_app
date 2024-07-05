import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          className="grid place-items-center backdrop-blur h-screen z-40 w-screen absolute top-0"
        >
          <div className=" m-auto z-50 relative min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="self-end text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
          <div className=" backdrop-blur h-screen z-40 w-screen absolute top-0" />
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default modal;
