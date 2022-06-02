import ButtonPlay from "@components/ButtonPlay";
import NomDuJoueur from "@components/NomDuJoueur";
import lottie from "lottie-web";
import data from "@assets/Images/boucleterre.json";
import { useEffect, useRef } from "react";
import Footer from "../components/footer";

export default function Home({ playerName, onPlayerNameChange }) {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: "svg",
      loop: true,
      autoplay: true,
      animationData: data,
    });
  }, []);

  return (
    <>
      <div />
      <div>
        <div className="container" ref={container} />

        <h1 className="titre"> Countrizz</h1>

        <NomDuJoueur playerName={playerName} onChange={onPlayerNameChange} />

        <ButtonPlay name="LET'S GO" to="/modejeu" />
      </div>

      <Footer />
    </>
  );
}
