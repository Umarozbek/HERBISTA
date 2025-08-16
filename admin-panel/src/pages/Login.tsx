import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fetch } from "../middlewares/Fetch";
import { UserTypes } from "@/types/RootTypes";

interface LoginResponse {
  token: string;
  data: UserTypes;
  message: string;
}

export default function Login() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [globalError, setGlobalError] = useState("");

  const validateForm = (formData: FormData) => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

      if (!email) {
        newErrors.email = "Email is required.";
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Enter a valid email address.";
        valid = false;
      }
    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) return;

    try {
      const response = (
        await Fetch.post<LoginResponse>("users/login", {
          email: formData.get("email"),
          password: formData.get("password"),
        })
      ).data;
      
      localStorage.setItem("token", response.token);
      window.location.href = "/";
      
    } catch (error) {
        const err = error as Error;
        setGlobalError(err.message || "Unknown Token");
        console.error(error);
      }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#202020]">
      <Card className="w-full max-w-md shadow-md bg-[#333533] border-none text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {globalError && (
              <Alert variant="destructive" className="bg-red-300">
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                placeholder="+998901233434"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <Button type="submit" variant={"secondary"} className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
