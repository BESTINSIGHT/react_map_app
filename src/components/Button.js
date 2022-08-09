import { forwardRef } from "react";
import "../styles/components/button.scss";

const Button = forwardRef(
  (
    {
      children,
      id,
      className,
      style,
      onClick,
      type,
      size = "sm",
      color = "default",
    },
    ref
  ) => {
    return (
      <button
        id={id}
        className={`${className} btn-size-${size} btn-color-${color}`}
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
