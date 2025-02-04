import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { assignTasks, completeTask, getGuide } from "../api/api";
import { FaCheckCircle, FaChevronRight, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setDailyData } from "../services/redux/dailyDataSlice";
import { setUserData } from "../services/redux/userSlice";

const DailyTasks = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const [loading, setLoading] = useState(false);
  const dailyData = useSelector((state) => state.dailyData);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [guide, setGuide] = useState();
  const [guideActive, setGuideActive] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await assignTasks(auth.id);
        dispatch(setDailyData(response.data.dailyPlan));
      } catch (error) {
        console.error("Error fetching daily tasks:", error);
      }
      setLoading(false);
    };
    fetchTasks();
  }, [isAuthenticated, navigate, auth, dispatch]);

  const isCompleted = (name) => {
    const result = userData.completedTasks.some((t) => t === name);
    return result;
  };

  const handleTaskComplete = async (name) => {
    const isConfirmed = window.confirm(`Mark "${name}" as complete?`);

    if (isConfirmed) {
      setLoading(true);
      try {
        const response = await completeTask(auth.id, name);
        alert(response.data.message);

        const updatedData = {
          points: response.data.points,
          streak: response.data.streak,
          completedTasks: response.data.completedTasks,
        };

        dispatch(setUserData(updatedData));
      } catch (error) {
        console.error("Error completing task:", error);
        alert("Failed to complete task. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleGuide = async (name) => {
    try {
      const response = await getGuide(name);
      // console.log(response.data);
      if (response) {
        setGuideActive(true);
        setGuide(response.data);
      }
    } catch (err) {
      console.log("Error loading the guide", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 mt-16 text-white">
        <h1 className="text-3xl md:text-4xl text-red-500 font-bold mb-6">
          Day {dailyData.day} - Your Daily Plan
        </h1>

        {/* Congrats Message if all tasks are completed */}
        {userData.remainingTasks === 0 && (
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6 text-center animate-bounce">
            🎉 Hurrah! You completed all tasks today! Keep up the great work! 💪
          </div>
        )}

        {/* Diet Plan */}
        <div className="w-full max-w-lg bg-gray-800 p-6 rounded shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-3 text-center">🍽 Diet Plan</h2>
          <p>
            <strong>🌄 Breakfast:</strong> {dailyData.dietPlan.breakfast}
          </p>
          <p>
            <strong>☀️ Lunch:</strong> {dailyData.dietPlan.lunch}
          </p>
          <p>
            <strong>🌃 Dinner:</strong> {dailyData.dietPlan.dinner}
          </p>
        </div>

        {/* Workout Plan */}
        <div className="w-full max-w-lg bg-gray-800 p-6 rounded shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-3 text-center">
            🏋️ Workout Plan
          </h2>
          {dailyData.workoutPlan.map((workout, index) => (
            <div
              key={workout._id}
              className="p-3 border-b last:border-none flex justify-between"
            >
              <div>
                <p>
                  <strong>
                    {index + 1}. {workout.name}
                  </strong>
                </p>
                <p className="text-gray-200">{workout.duration}</p>
              </div>

              <div className="flex items-center gap-6 md:gap-14">
                {isCompleted(workout.name) ? (
                  <button disabled className="text-2xl text-green-500">
                    <FaCheckCircle />
                  </button>
                ) : (
                  <button
                    onClick={() => handleTaskComplete(workout.name)}
                    className="text-2xl text-red-500"
                  >
                    <FaTimesCircle />
                  </button>
                )}
                <button onClick={() => handleGuide(workout.name)}>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="w-full max-w-lg bg-yellow-600 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">💡 Tip of the Day</h2>
          <p>{dailyData.tips}</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Back to Dashboard
        </button>
      </div>

      {guideActive && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-6">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setGuideActive(false)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-700 rounded-full w-8 h-8 flex justify-center items-center"
            >
              <FaTimesCircle/>
            </button>

            {/* Guide Content */}
            <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">
              {guide.name}
            </h2>
            <ul className="list-disc list-inside space-y-2 p-2 bg-black rounded-lg">
              {guide.steps.map((step, index) => (
                <li key={index} className="text-gray-300">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default DailyTasks;
