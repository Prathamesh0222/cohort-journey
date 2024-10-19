"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpInput, signUpSchema } from "@/lib/auth-validation";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [inputs, setInputs] = useState<SignUpInput>({
    email: "",
    username: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const result = signUpSchema.parse(inputs);
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const signInRes = await signIn("credentials", {
          redirect: false,
          ...inputs,
        });

        if (!signInRes) {
          throw new Error("Invalid data");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error while signing up", error);
    }
  };

  const handleShowPassword = () => {
    setIsVisible(!isVisible);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          <Label className="flex justify-center text-3xl font-bold">
            Create an Account
          </Label>
          <div className="mt-4">
            <div className="mb-2">
              <Label className="font-semibold text-sm">Email</Label>
            </div>
            <Input
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="abc@example.com"
              type="text"
            />
            <div className="mt-4">
              <div className="mb-2">
                <Label className="font-semibold text-sm">Password</Label>
              </div>
              <div className="relative">
                <Input
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type={isVisible ? "text" : "password"}
                />
                {isVisible ? (
                  <EyeClosed
                    className="absolute right-3 top-2 cursor-pointer text-muted-foreground hover:text-black"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <EyeIcon
                    className="absolute right-3 top-2 cursor-pointer text-muted-foreground hover:text-black"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <Label className="font-semibold text-sm">Username</Label>
              </div>
              <Input
                name="username"
                value={inputs.username}
                onChange={handleChange}
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="mt-4">
              <Button className="w-full" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-gradient-to-br from-yellow-200 via-green-300 to-orange-200"></div>
    </div>
  );
};

export default SignUp;
