import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { completeDay, getProgress } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../services/redux/userSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await getProgress(auth.id);
        dispatch(setUserData(response.data));
        // console.log(response.data);//
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [isAuthenticated, navigate, auth, dispatch]);

  useEffect(() => {
    if (!auth?.id) return; // Ensure auth.id is available

    // Get current time and calculate time left until midnight
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to midnight

    const timeUntilMidnight = midnight - now; // Time in milliseconds

    const completeDayTask = async () => {
      try {
        const response = await completeDay(auth.id);
        console.log("End of the day completed:", response.data);
      } catch (error) {
        console.error("Error completing day:", error);
      }
    };

    // Run completeDay at midnight
    const timeout = setTimeout(() => {
      completeDayTask();

      // After first call, run it every 24 hours
      setInterval(completeDayTask, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [auth]);

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl md:text-4xl text-red-500 font-bold mb-8 mt-16">
          Welcome to Your Dashboard
        </h1>

         {/* Congrats Message if all tasks are completed */}
         {userData.remainingTasks === 0 && (
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6 text-center animate-bounce">
            🎉 Hurrah! You completed all tasks today! Keep up the great work! 💪
          </div>
        )}

        {/* Card for User Info */}
        <div className="bg-gray-800 p-6 rounded shadow-md w-full text-center max-w-4xl mb-6">
          <h2 className="text-xl font-bold">Hello, {auth.name}!</h2>
          <p className="text-gray-200">Your fitness journey starts now!</p>

        </div>

        {/* Cards for Progress */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 w-full max-w-4xl">
          {/* Card for Points */}
          <div className="bg-gray-800 p-6 rounded shadow-md w-full text-center">
            <h3 className="text-lg font-bold">🎖️ Current Points</h3>
            <p className="text-2xl text-green-500 font-bold">
              {userData.points}
            </p>
          </div>

          {/* Card for Streak */}
          <div className="bg-gray-800 p-6 rounded shadow-md w-full text-center">
            <h3 className="text-lg font-bold">🔥 Current Streak</h3>
            <p className="text-2xl text-red-500 font-bold">
              {userData.streak} days
            </p>
          </div>

          {/* Card for Completed Tasks */}
          <div className="bg-gray-800 p-6 rounded shadow-md w-full text-center">
            <h3 className="text-lg font-bold">✅ Completed Tasks</h3>
            <p className="text-2xl text-blue-500 font-bold">
              {userData.completedTasks.length}
            </p>
          </div>

          {/* Card for Remaining Tasks */}
          <div className="bg-gray-800 p-6 rounded shadow-md w-full text-center">
            <h3 className="text-lg font-bold">⏳ Today&apos;s Remaining Tasks</h3>
            <p className="text-2xl text-orange-500 font-bold">
              {userData.remainingTasks}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 w-full max-w-lg flex flex-col gap-4">
          <button
            onClick={() => navigate("/tasks")}
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
          >
            📋 View Today&apos;s Tasks
          </button>

          {/* <button
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700 hover:border hover:border-gray-600"
          >
            Go to Profile
          </button> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
