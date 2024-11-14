import { useRouter } from "next/navigation";

export const handleRegister = async (
e: React.FormEvent, username: string, email: string, password: string, phone: string, role: string, fullname: string, setErrorMessage: (message: string) => void, router: ReturnType<typeof useRouter>) => {
  e.preventDefault();

  const response = await fetch("http://127.0.0.1:8080/api/database", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname,username, email, password, phone, role }), // Include role in the request body
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Registration successful:", data);
    router.push("/Home");
  } else {
    const errorData = await response.json();
    setErrorMessage(errorData.message || "Registration failed");
  }
};