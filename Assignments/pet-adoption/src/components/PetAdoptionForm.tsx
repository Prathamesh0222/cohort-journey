import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, RegisterInput } from "@/lib/form-validation";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export const PetAdoptionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName: "",
      petType: undefined,
      breed: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: RegisterInput) {
    setLoading(true);
    const storedData = localStorage.getItem("adoptionData");
    let currentSubmissions = [];

    if (storedData) {
      try {
        currentSubmissions = JSON.parse(storedData);

        if (!Array.isArray(currentSubmissions)) {
          currentSubmissions = [];
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
        currentSubmissions = [];
      } finally {
        setLoading(false);
      }
    }

    currentSubmissions.push(data);

    localStorage.setItem("adoptionData", JSON.stringify(currentSubmissions));

    form.reset();

    navigate("/submissions");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label className="text-center text-4xl font-bold m-12">
              Pet Adoption Form
            </Label>
          </div>
          <FormField
            control={form.control}
            name="petName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pet Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Pet Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                        <SelectItem value="Rabbit">Rabbit</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breed</FormLabel>
                <FormControl>
                  <Input placeholder="Breed" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4 w-full" type="submit" disabled={loading}>
            {loading
              ? "Loading... " + <LoaderCircle className="animate-spin" />
              : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
