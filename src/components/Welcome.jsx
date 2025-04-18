import { ReactTyped } from "react-typed";

const Welcome = () => {
  return (
    <div>
      <h1  style={{fontFamily: '"Caveat", cursive', fontWeight: '900', color: '#333333', fontSize: '5rem'}}>
        Welcome to{" "}
        <ReactTyped strings={["Blogi.."]} typeSpeed={120} showCursor={false}/>
      </h1>
    </div>
  );
};

export default Welcome;