import "@components/Reponse.css";

export default function ButtonReponse({
  success,
  flag,
  onClick,
  fail,
  name,
  capital,
  children,
  disabled,
}) {
  return (
    <div className="wrapperRep">
      <button
        type="button"
        className={`ctaRep ${success ? "greenBtn" : ""}${fail ? "redBtn" : ""}`}
        onClick={() => !disabled && onClick()}
        name={name}
        disabled={disabled}
      >
        {children}
        {capital}
        {flag}
      </button>
    </div>
  );
}
