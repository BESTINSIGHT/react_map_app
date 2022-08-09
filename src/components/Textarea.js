import "../styles/components/textarea.scss";

const Textarea = ({
  ref,
  children,
  className,
  color,
  style,
  size,
  resize,
  disabled,
  type,
  placeholder,
  ...props
}) => {
  return (
    <textarea
      className={`${className} textarea-color-${color} textarea-size-${size} textarea-resize-${
        resize === true ? "inherit" : "none"
      } textarea`}
      type={type}
      style={ style }
      ref={ref}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default Textarea;
