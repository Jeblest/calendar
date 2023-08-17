import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CalendarHeader from "../components/CalendarHeader";
import axios from "axios";
export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        data: {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        },
        withCredentials: true,
        url: "http://localhost:3000/auth/register",
      });
      console.log(res);
      nav("/login");
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  async function isAuth() {
    try {
      const res = await axios({
        url: "http://localhost:3000/auth/register",
        withCredentials: true,
      });
      nav("/register");
    } catch (error) {
      console.log(error);
      nav("/calendar");
    }
  }
  useEffect(() => {
    isAuth();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <section className="bg-gray-50 flex flex-col h-screen">
      {<CalendarHeader />}
      <div className="flex flex-col items-center justify-center  px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create a new account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your username
                </label>
                <input
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-secondary-100 focus:outline-none block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
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
                type="button"
                className="w-full text-white bg-primary hover:opacity-90 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline"
                  to={"/register"}
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
