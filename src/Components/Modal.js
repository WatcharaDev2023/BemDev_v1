import { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import "./Modal.css";
import Button from "./Button";

const Modal = NiceModal.create(
  ({ title, subtitle, action, bgColor, note = "" }) => {
    const [input, setInput] = useState(note);
    const modal = useModal();
    return (
      <div className="background">
        <div className="modal">
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
          {action === "Save" && (
            <input
              className="input"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          )}
          <div className="actions">
            <Button
              name={action}
              backgroundColor={bgColor}
              onClick={() => {
                if (action === "Save") {
                  if (input) {
                    modal.resolve(input);
                    modal.remove();
                    console.log("Note saved");
                  } else {
                    console.log("Note is empty");
                  }
                } else {
                  modal.resolve();
                  modal.remove();
                  console.log("Note removed");
                }
              }}
            />
            <Button
              name="Cancel"
              backgroundColor="silver"
              onClick={() => {
                modal.remove();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;