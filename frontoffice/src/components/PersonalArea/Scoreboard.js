const Scoreboard = ({ scores, gameType }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h3 className="bg-black text-yellow-400 p-3 font-bold rounded-xl">
        {" "}
        {gameType}{" "}
      </h3>
      <table className="table-fixed w-[600px] max-w-full text-center bg-gray-300">
        <thead>
          <tr className="text-lg bg-yellow-400 break-words">
            <th>Posizione</th>
            <th>Giocatore</th>
            <th>Punteggio/Tentativi</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} className="text-lg">
              <td> {index + 1} </td>
              <td> {score.name} </td>
              <td> {score.score} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
