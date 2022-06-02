import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import data2 from "../assets/Images/CountdownAnimation.json";
import "../App.css";

function UseDecrement() {
  const container3 = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    lottie.loadAnimation({
      container: container3.current,

      render: "svg",
      loop: false,
      autoplay: true,
      animationData: data2,
    });
  }, []);

  setTimeout(() => {
    navigate("/jeuPays");
  }, 4250);

  return (
    <div>
      <div className="container3" ref={container3} />
    </div>
  );
}

export default UseDecrement;
