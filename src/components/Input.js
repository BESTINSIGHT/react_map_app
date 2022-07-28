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
  <Input
    id={id}
    className={`${className}`}
    ref={ref}
    type={type}
    style={style}
    placeholder={placeholder}
    onChange={onChange}
  >
    {children}
  </Input>;
};

export default Input;
