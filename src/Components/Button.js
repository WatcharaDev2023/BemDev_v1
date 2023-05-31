import "./Button.css";

const Button = ({ name, backgroundColor, onClick }) => {
  return (
    <button className="button" onClick={onClick} style={{ backgroundColor }}>
      {name}
    </button>
  );
};

export default Button;