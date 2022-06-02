import Jeu from "@pages/Jeu";
import Questions from "@components/Questions";

export default function JeuCity({ score, setScore, playerName, onFinished }) {
  return (
    <Jeu
      score={score}
      playerName={playerName}
      setScore={setScore}
      onFinished={onFinished}
      renderQuestion={(countryToGuess) => (
        <Questions
          countryQuestion="Trouve la capitale de "
          name={countryToGuess.translations.fra.common}
        />
      )}
      renderResponse={(country) => country.capital}
    />
  );
}
