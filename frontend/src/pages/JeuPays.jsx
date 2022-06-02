import Jeu from "@pages/Jeu";
import Questions from "@components/Questions";

export default function JeuPays({ score, setScore, playerName, onFinished }) {
  return (
    <Jeu
      score={score}
      playerName={playerName}
      setScore={setScore}
      onFinished={onFinished}
      renderQuestion={(countryToGuess) => (
        <Questions
          flag={countryToGuess.flag}
          countryQuestion="Trouve le nom de ce pays?  "
        />
      )}
      renderResponse={(country) => country.translations.fra.common}
    />
  );
}
