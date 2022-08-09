import "../styles/components/card.scss";

const Card = ({ children, className, style, color, ...props }) => {
  return (
    <div
      className={`${className} card-color-${color} card`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
