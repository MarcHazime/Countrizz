import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import data1 from "../assets/Images/congratulations.json";
import data from "../assets/Images/mortydance.json";
import Header from "../components/Header";
import Footer from "../components/footer";

function Congrate({ playerName, playerScore }) {
  const congratulations = useRef(null);
  const mortydance = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    lottie.loadAnimation({
      container: congratulations.current,

      render: "svg",
      loop: false,
      autoplay: true,
      animationData: data1,
    });
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      container: mortydance.current,
      render: "svg",
      loop: true,
      autoplay: true,
      animationData: data,
    });
  }, []);

  setTimeout(() => {
    navigate("/scores");
  }, 7000);

  return (
    <div>
      <br />
      <div />
      <Header playerName={playerName} score={playerScore} />
      <br />
      <div className="mortydance" ref={mortydance} />
      <div className="congratulations" ref={congratulations} />
      <Footer />
    </div>
  );
}

export default Congrate;
