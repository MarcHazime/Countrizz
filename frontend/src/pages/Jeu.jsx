import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { randomCountryQuestion, getRandomCountries } from "@services/api";
import lottie from "lottie-web";
import bumpimg from "@assets/Images/bump4k.jpg";
import bumpd from "@assets/Images/bump4kD.jpg";
import * as THREE from "three";
import ocean from "@assets/Images/ocean10kM.jpg";
import allcountries from "@assets/allcountries.js";
import Globe from "@components/Globe";
import Responses from "@components/Reponses";
import Header from "@components/Header";
import GameCountdown from "@components/GameCountdown";
import earthImageM from "@assets/Images/earth4K.jpg";
import spaceImage from "@assets/Images/night-sky.png";
import earthImage from "../assets/Images/laterre4k.jpeg";
import data2 from "../assets/Images/CountdownAnimation.json";

const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 3;
globeMaterial.bumpAltitude = 1;
new THREE.TextureLoader().load(ocean, (texture) => {
  globeMaterial.specularMap = texture;
  globeMaterial.specular = new THREE.Color("grey");
  globeMaterial.shininess = 18;
});

function Jeu({
  score,
  setScore,
  playerName,
  onFinished,
  renderQuestion,
  renderResponse,
}) {
  const globeRef = useRef();
  const [countryRandom, setCountryRandom] = useState([]);
  const [countryToGuess, setCountryToGuess] = useState();
  const [isGoodResponse, setIsGoodResponse] = useState(false);
  const [isBadResponse, setIsBadResponse] = useState(false);
  const [canRespond, setCanRespond] = useState(false);
  const [turn, setTurn] = useState(0);

  const isDeskTop = useMediaQuery({ minWidth: 677 });
  const isHmobile = useMediaQuery({ minWidth: 390, maxWidth: 460 });
  const isMobile = useMediaQuery({ maxWidth: 390 });
  const isFold = useMediaQuery({ minWidth: 460, maxWidth: 677 });
  const container3 = useRef(null);

  const getAltitudeFromArea = (area) => {
    if (area > 10000000) {
      return isDeskTop ? 1.4 : 2;
    }

    if (area > 5000000) {
      return isDeskTop ? 1.2 : 1.7;
    }

    if (area > 1000000) {
      return isDeskTop ? 1.1 : 1.5;
    }
    if (area > 500000) {
      return isDeskTop ? 1 : 1.3;
    }

    if (area > 100000) {
      return isDeskTop ? 0.8 : 1.2;
    }
    if (area > 50000) {
      return isDeskTop ? 0.7 : 1.1;
    }

    if (area > 10000) {
      return isDeskTop ? 0.6 : 1;
    }

    if (area > 5000) {
      return isDeskTop ? 0.5 : 0.9;
    }
    if (area > 2500) {
      return isDeskTop ? 0.4 : 0.7;
    }
    if (area > 1500) {
      return isDeskTop ? 0.3 : 0.6;
    }

    if (area > 500) {
      return isDeskTop ? 0.2 : 0.4;
    }
    return 0.25;
  };

  useEffect(() => {
    lottie.loadAnimation({
      container: container3.current,
      render: "svg",
      loop: false,
      autoplay: true,
      animationData: data2,
    });
  }, []);

  async function nextRound() {
    setIsGoodResponse(false);
    setIsBadResponse(false);

    const countries = await getRandomCountries(4);
    const randomCountry = randomCountryQuestion(countries);

    const countryLocation = {
      lat: randomCountry.latlng[0],
      lng: randomCountry.latlng[1],
      altitude: getAltitudeFromArea(randomCountry.area),
    };

    const franceLocation = {
      altitude: isDeskTop ? 1.2 : 2,
    };

    globeRef.current.pointOfView(franceLocation, 900);

    setTimeout(() => {
      globeRef.current.pointOfView(countryLocation, 1400);
      setCountryRandom(countries);
      setCountryToGuess(randomCountry);
      setTimeout(() => {
        setCanRespond(true);
      }, 400);
    }, 500);
  }
  useEffect(() => {
    nextRound();

    globeRef.current.controls().enabled = false;
  }, [Globe]);

  function onResponse(country) {
    setCanRespond(false);

    if (country.name.common === countryToGuess.name.common) {
      setIsGoodResponse(true);
      setTurn(turn + 1);
      setScore(score + 10);
      setTimeout(() => nextRound(), 600);
    } else {
      setIsBadResponse(true);
      setTurn(turn + 1);
      setTimeout(() => nextRound(), 600);
    }
  }

  return (
    <div className="Jeu">
      <Header playerName={playerName} score={score} />
      <GameCountdown onFinished={onFinished} />
      {/* <div className="container3" ref={container3} /> */}

      {isMobile && (
        <Globe
          height={680}
          width={360}
          ref={globeRef}
          globeMaterial={globeMaterial}
          bumpImageUrl={bumpimg}
          bumpMap
          alpha
          showAtmosphere
          globeImageUrl={earthImageM}
          backgroundImageUrl={spaceImage}
          lineHoverPrecision={0}
          polygonsData={allcountries.features.filter((d) => d.id !== "AQ")}
          polygonAltitude={0.004}
          polygonCapColor={(d) =>
            countryToGuess && countryToGuess.cca3 === d.id
              ? "#ffee03a1"
              : "transparent"
          }
          polygonSideColor={() => "rgba(0, 20, 0, 0.00001)"}
          polygonStrokeColor={() => "#111"}
          polygonsTransitionDuration={300}
        />
      )}

      {isFold && (
        <Globe
          height={800}
          width={650}
          ref={globeRef}
          globeMaterial={globeMaterial}
          bumpImageUrl={isDeskTop ? bumpd : bumpimg}
          bumpMap
          alpha
          showAtmosphere
          globeImageUrl={earthImageM}
          backgroundImageUrl={spaceImage}
          lineHoverPrecision={0}
          polygonsData={allcountries.features.filter((d) => d.id !== "AQ")}
          polygonAltitude={0.004}
          polygonCapColor={(d) =>
            countryToGuess && countryToGuess.cca3 === d.id
              ? "#ffee03a1"
              : "transparent"
          }
          polygonSideColor={() => "rgba(0, 20, 0, 0.00001)"}
          polygonStrokeColor={() => "#111"}
          polygonsTransitionDuration={300}
        />
      )}

      {isDeskTop && (
        <Globe
          height={750}
          width={1300}
          ref={globeRef}
          globeMaterial={globeMaterial}
          bumpImageUrl={bumpd}
          bumpMap
          alpha
          showAtmosphere
          globeImageUrl={earthImage}
          backgroundImageUrl={spaceImage}
          lineHoverPrecision={0}
          polygonsData={allcountries.features.filter((d) => d.id !== "AQ")}
          polygonAltitude={0.004}
          polygonCapColor={(d) =>
            countryToGuess && countryToGuess.cca3 === d.id
              ? "#ffee03a1"
              : "transparent"
          }
          polygonSideColor={() => "rgba(0, 20, 0, 0.00001)"}
          polygonStrokeColor={() => "#111"}
          polygonsTransitionDuration={300}
        />
      )}
      {isHmobile && (
        <Globe
          height={820}
          width={390}
          ref={globeRef}
          globeMaterial={globeMaterial}
          bumpImageUrl={isDeskTop ? bumpd : bumpimg}
          bumpMap
          alpha
          showAtmosphere
          globeImageUrl={earthImageM}
          backgroundImageUrl={spaceImage}
          lineHoverPrecision={0}
          polygonsData={allcountries.features.filter((d) => d.id !== "AQ")}
          polygonAltitude={0.004}
          polygonCapColor={(d) =>
            countryToGuess && countryToGuess.cca3 === d.id
              ? "#ffee03a1"
              : "transparent"
          }
          polygonSideColor={() => "rgba(0, 20, 0, 0.00001)"}
          polygonStrokeColor={() => "#111"}
          polygonsTransitionDuration={300}
        />
      )}

      {countryToGuess && renderQuestion(countryToGuess)}

      <Responses
        className={`responses${isMobile ? "-mobile" : ""}`}
        countryRandom={countryRandom}
        countryToGuess={countryToGuess}
        isGoodResponse={isGoodResponse}
        isBadResponse={isBadResponse}
        canRespond={canRespond}
        renderResponse={renderResponse}
        onResponse={onResponse}
      />
    </div>
  );
}

export default Jeu;
