const WrapperContainer = ({ children, className, ref, ...props }) => {
  return (
    <div ref={ref} className={`${className} page-Wrapper`} {...props}>
      {children}
    </div>
  );
};

export default WrapperContainer;
