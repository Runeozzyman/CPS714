import { Fragment } from "react";
import RegisterForm from "../components/RegisterForm";

export default function LoginSuccess() {
  return (
    <Fragment>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/regbg.jpg')" }}
      >
        <RegisterForm />
      </div>
    </Fragment>
  );
}
