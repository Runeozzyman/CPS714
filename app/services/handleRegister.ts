import { useRouter } from "next/navigation";
import { User } from "../interfaces/users"; // Adjust the path as necessary

export const handleRegister = async (
  e: React.FormEvent,
  user: User,
  setErrorMessage: (message: string) => void,
  setLoading: (loading: boolean) => void,
  toast: (options: { title: string }) => void,
  router: ReturnType<typeof useRouter>
) => {
  e.preventDefault();
  setLoading(true);


  try {
    const response = await fetch("http://127.0.0.1:8080/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      toast({
        title: "Account Created Successfully!",
      });
      //router.push("/Home");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    setErrorMessage("Registration failed");
  } finally {
    setLoading(false);
  }
};