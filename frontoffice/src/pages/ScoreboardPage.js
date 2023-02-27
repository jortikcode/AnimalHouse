import Scoreboard from "../components/PersonalArea/Scoreboard";
import { useSelector, useDispatch } from "react-redux";
import { FidgetSpinner } from "react-loader-spinner";
import {
  waitingLeaderboard,
  getLeaderboard,
} from "../app/leaderboardSlice"
import { useLayoutEffect } from "react";
import ErrorModal from "../common/ErrorModal";
import { clearErrorLocations } from "../app/locationsSlice";

const ScoreboardPage = () => {
  const dispatch = useDispatch();
  const { leaderboard, loadingLeaderboard, errorMsg } = useSelector(
    (state) => state.leaderboard
  );

  useLayoutEffect(() => {
    dispatch(waitingLeaderboard());
    dispatch(getLeaderboard());
  }, [dispatch]);
  if (errorMsg)
    <ErrorModal msg={errorMsg} clearErrorFunction={() => dispatch(clearErrorLocations())} />
  else if (loadingLeaderboard)
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
