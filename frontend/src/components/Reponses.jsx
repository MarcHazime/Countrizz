import ButtonReponse from "@components/ButtonReponse";

export default function Reponses({
  className,
  countryRandom,
  countryToGuess,
  isGoodResponse,
  isBadResponse,
  canRespond,
  onResponse,
  renderResponse,
}) {
  return (
    <div className={className}>
      {countryRandom.map((country) => (
        <ButtonReponse
          key={country.cca3}
          success={
            isGoodResponse && country.name.common === countryToGuess.name.common
          }
          fail={
            isBadResponse && country.name.common !== countryToGuess.name.common
          }
          image={country.flags.png}
          disabled={!canRespond}
          onClick={() => onResponse(country)}
        >
          {renderResponse(country)}
        </ButtonReponse>
      ))}
    </div>
  );
}
