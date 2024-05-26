import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listGoals, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";
import GoalForm from "../components/GoalForm";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(listGoals());

    return () => {
      dispatch(reset());
    };

  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    <Spinner />
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome, {user ? user.name : ''}</h1>
      <h3 className="font-bold text-gray-500 text-xl mb-10">Goals Dashboard</h3>
      <GoalForm />
      {goals.length > 0 ? (
        goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} />
        ))
      ) : (
        <h1 className="text-gray-500 font-bold">No Goals Added Yet</h1>
      )}
    </>
  )
}

export default Dashboard