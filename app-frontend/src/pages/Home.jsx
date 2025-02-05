import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgImage from "../assets/images/bg-two-people.jpg";

function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Hero Section */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-2">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 uppercase">
            Mission Fitness
          </h1>
          <p className="text-lg md:text-xl text-white">
            Your fitness journey starts here. This is a <span className="text-red-500 font-semibold">60 days challenge</span>.
          </p>
          <p className="text-lg md:text-xl text-white mb-8">
            Track your progress, complete tasks, and stay motivated!
          </p>

          <Link
            to="/login"
            className="bg-red-600 text-white py-2 px-6 rounded-md text-xl hover:bg-red-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-black bg-opacity-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Track Your Progress
              </h3>
              <p className="text-gray-200">
                Stay on top of your fitness goals and monitor your progress with
                detailed reports.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Personalized Tasks
              </h3>
              <p className="text-gray-200">
                Get daily workout tasks that are tailored to your fitness level.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Earn Rewards
              </h3>
              <p className="text-gray-200">
                Complete tasks and earn points to unlock rewards and achieve new
                fitness milestones.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
