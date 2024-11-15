import { useRouter } from "next/navigation";
import { Users } from "../interfaces/users";

export const handleLogin = async (
  e: React.FormEvent,
  username: string,
  password: string,
  setErrorMessage: (message: string) => void,
  router: ReturnType<typeof useRouter>
) => {
  e.preventDefault();
  try {
    const response = await fetch("http://127.0.0.1:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      router.push("/Home");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Login failed");
    }
  } catch (error) {
    setErrorMessage("An error occurred. Please try again.");
  }
};