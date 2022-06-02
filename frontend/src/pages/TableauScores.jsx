import { useEffect, useState } from "react";
import { getScores } from "@services/api";
import ButtonPlay from "@components/ButtonPlay";
import Footer from "../components/footer";

export default function TableauScores() {
  const [scores, setScores] = useState([]);

  useEffect(async () => {
    setScores(await getScores());
  }, []);

  return (
    <div className="finalScore">
      <h1>Top Scores</h1>

      <table>
        <tbody>
          {scores.map(({ name, score }) => (
            <tr>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonPlay name="Rejouer" to="/home" />
      <Footer />
    </div>
  );
}
