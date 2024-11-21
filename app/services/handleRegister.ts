import { useRouter } from "next/navigation";

export const handleRegister = async (
  e: React.FormEvent,
  fullname: string,
  username: string,
  email: string,
  password: string,
  phone: string,
  role: string,
  company: string,
  setErrorMessage: (message: string) => void,
  setLoading: (loading: boolean) => void,
  toast: (options: { title: string }) => void,
  router: ReturnType<typeof useRouter>
) => {
  e.preventDefault();

  setLoading(true);

  const newUser = {
    fullname,
    username,
    email,
    password,
    phone,
    role,
    loyaltypoints: 0,
    company,
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      toast({
        title: "Account Created Successfully!",
      });
      router.push("/Home");
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