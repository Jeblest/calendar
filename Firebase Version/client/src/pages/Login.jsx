import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CalendarHeader from "../components/CalendarHeader";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth"

export default function Login() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();

  function isAuth() {
    if (!user) return nav("/calendar/login");
    if (user) return nav("/calendar");
  }
  useEffect(() => {
    isAuth();
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      nav("/calendar");
    } catch (err) {
      console.error(err);
      window.location.reload()
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const provider =  new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userID = user.uid;
        const email = user.email;
        const username = user.displayName;
        const usersRef = collection(db, "users");
        const userDoc = doc(usersRef, userID);
        setDoc(
          userDoc,
          {
            email: email,
            username: username,
            userId: userID,
          },
          { merge: true }
        );
      })
  }

  return (
    <section className="bg-gray-50 flex flex-col h-screen">
      {<CalendarHeader />}
      <div className="flex flex-col items-center justify-center  px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-secondary-100 focus:outline-none block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-secondary-100 focus:outline-none block focus:
                    w-full p-2.5  "
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full text-white bg-primary hover:opacity-90 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline"
                  to={"/calendar/register"}
                >
                  Register
                </Link>
              </p>
              <hr />
              <button className="w-full bg-blue-400 rounded-full h-12 text-white" onClick={handleGoogle}>Sign in with Google</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
