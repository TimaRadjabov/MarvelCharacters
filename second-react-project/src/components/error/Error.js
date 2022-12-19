import errorImg from "./error.webp";


const Error = () => {
    const styles = {
        display: "display",
        margin: "0 auto",
        width: 200,
        height: 200,
    }
  return <img src={errorImg} alt="error" style={styles}/>;
};

export default Error;