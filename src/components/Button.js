import { forwardRef } from "react";
import "../styles/components/button.scss";

const Button = forwardRef(
  ({ children, id, className, style, size, onClick, type }, ref) => {
    return (
      <button
        id={id}
        className={`${className} btn-${size} btn`}
        type={type}
        style={style}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
