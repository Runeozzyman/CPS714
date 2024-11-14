import { Fragment } from "react";
import RegisterForm from "../components/RegisterForm";

export default function LoginSuccess() {
  return (
    <Fragment>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/regbg.jpg')" }}
      >
        <div className="flex items-center justify-center bg-white dark:bg-gray-900 ">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Sign Up
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-900 min-h-screen">
          <RegisterForm />
        </div>
      </div>
    </Fragment>
  );
}
