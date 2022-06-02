import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import data1 from "@assets/Images/boucleterre.json";
import data from "@assets/Images/velo.json";
import "../App.css";

function Splash() {
  const container = useRef(null);
  const boucleterre = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,

      render: "svg",
      loop: false,
      autoplay: true,
      animationData: data,
    });
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      container: boucleterre.current,
      render: "svg",
      loop: true,
      autoplay: true,
      animationData: data1,
    });
  }, []);

  setTimeout(() => {
    navigate("/home");
  }, 8000);

  return (
    <div>
      <div className="containersplash" ref={boucleterre} />
      <h1 className="titre-splash">Countrizz </h1>
      <div className="container2" ref={container} />
      {/* <div className="container3"  ref={velo} />  */}
      <h2 className="slide-in-left"> Le Grupetto vous presente </h2>
    </div>
  );
}

export default Splash;
