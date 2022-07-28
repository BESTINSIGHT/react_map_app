import { forwardRef } from "react";
import "../styles/components/button.scss";

const Button = forwardRef(
  ({ children, id, className, style, size, onClick }, ref) => {
    return (
      <button
        id={id}
        className={`${className} btn-${size} btn`}
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
