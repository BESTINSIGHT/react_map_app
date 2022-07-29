const Input = ({
  children,
  id,
  className,
  style,
  onChange,
  type,
  placeholder,
  ref,
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
    >
      {children}
    </input>
  );
};

export default Input;
