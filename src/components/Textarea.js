import "../styles/components/textarea.scss";

const Textarea = ({
  ref,
  children,
  className,
  style,
  size,
  resize,
  disabled,
  ...props
}) => {
  return (
    <textarea
      className={`${className} textarea-size-${size} textarea-resize-${
        resize === true ? "inherit" : "none"
      } textarea`}
      style={style}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </textarea>
  );
};

export default Textarea;
