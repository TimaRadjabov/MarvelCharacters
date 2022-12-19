const Button = (props) => {
  return (
    <button className="button button__main" onClick={props.updateChar}>
      <div className="inner">{props.children}</div>
    </button>
  );
};  

export default Button;
