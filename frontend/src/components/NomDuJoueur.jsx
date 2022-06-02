export default function NomDuJoueur({ playerName = "", onChange }) {
  return (
    <div className="PlayerName">
      <input
        className="ChooseName"
        value={playerName}
        type="text"
        placeholder="Entrez votre nom"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
