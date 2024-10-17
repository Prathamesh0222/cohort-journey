"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      ...inputs,
    });

    if (!res) {
      throw new Error("Invalid data");
    } else {
      router.push("/dashboard");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Label>Email</Label>
      <Input
        value={inputs.email}
        onChange={handleInputChange}
        type="text"
        placeholder="abc@example.com"
      />
      <Label>Password</Label>
      <Input
        value={inputs.password}
        onChange={handleInputChange}
        type="password"
        placeholder="12345678"
      />
      <Button onClick={() => handleSubmit}>Submit</Button>
      <Link href={"/sign-up"}>Sign Up</Link>
    </div>
  );
};

export default SignIn;
