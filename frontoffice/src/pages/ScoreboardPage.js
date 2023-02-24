import Scoreboard from "../components/PersonalArea/Scoreboard";

const { useLayoutEffect } = require("react");
const { FidgetSpinner } = require("react-loader-spinner");
const { useSelector, useDispatch } = require("react-redux");
const {
  waitingLeaderboard,
  getLeaderboard,
} = require("../app/leaderboardSlice");

const ScoreboardPage = () => {
  const dispatch = useDispatch();
  const { leaderboard, loadingLeaderboard } = useSelector(
    (state) => state.leaderboard
  );

  useLayoutEffect(() => {
    dispatch(waitingLeaderboard());
    dispatch(getLeaderboard());
  }, [dispatch]);

  if (loadingLeaderboard)
    return (
      <div className="flex flex-col items-center mt-8 justify-center">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#EFBB1A", "#EFBB1A", "#EFBB1A"]}
          backgroundColor="#0"
        />
        <small> Caricando i punteggi dai nostri uffici... </small>
      </div>
    );
  return (
    <div className="flex flex-col gap-y-8 mt-8 justify-center mb-24">
      <h2 className="font-bold text-3xl text-center">Classifica dei giochi</h2>
      { Object.keys(leaderboard).map((gameType, index) => <Scoreboard key={gameType} gameType={gameType} scores={leaderboard[gameType]} /> ) }
    </div>
  );
};

export default ScoreboardPage
