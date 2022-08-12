import "../styles/components/input.scss";

const Input = ({
  children,
  id,
  className,
  style,
  onChange,
  type,
  placeholder,
  ref,
  ...props
}) => {
  return (
    <input
      id={id}
      className={`${className} input`}
      ref={ref}
      type={type}
      style={style}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
