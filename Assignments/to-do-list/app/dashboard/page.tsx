"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
const todoSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

const Dashboard = () => {
  const session = useSession();
  const [title, setTitle] = useState<string>("");
  const [list, setList] = useState<Todo[]>([]);
  const REFRESH_TODO = 5 * 1000;

  if (!session) {
    return <div>Unauthorized</div>;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchTodos();
    }, REFRESH_TODO);
    return () => clearInterval(timer);
  }, []);

  const createTodo = async () => {
    const result = todoSchema.parse({ title, completed: false });
    console.log("Result: ", result);
    try {
      const res = await fetch("api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (!res.ok) {
        toast.error("Error while creating todo");
        const errorData = await res.json();
        throw new Error(errorData.message || "Error while creating todo");
      }

      const data = await res.json();
      setList((prev) => [...prev, data.todo]);
      setTitle("");
      toast.success("Todo created successfully");
    } catch (error) {
      console.error("Error while creating todo", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch("api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error while fetching todos");
      }

      const data = await res.json();
      const todos = Array.isArray(data) ? data : data.todos;
      setList(todos);
    } catch (error) {
      console.error("Error while fetching todos", error);
    }
  };

  const updateCheckbox = async (id: string, completed: boolean) => {
    try {
      const res = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error while updating todo");
      }

      const updatedTodo = await res.json();
      setList((prev) =>
        prev.map((todo) =>
          todo.id === updatedTodo.todo.id ? updatedTodo.todo : todo
        )
      );
    } catch (error) {
      console.error("Error while updating todo", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Error while deleting todo");
        const errorData = await res.json();
        throw new Error(errorData.message || "Error while deleting todo");
      }

      setList((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error while deleting todo", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = e.target;
    updateCheckbox(id, checked);
  };

  const completedTodos = list.filter((todo) => todo.completed).length;
  const totalTodos = list.length;
  const progressValue = totalTodos ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-gray-800 via-blue-700 to-gray-900">
      <div className="flex flex-col h-screen justify-center ">
        <Card className="w-full max-w-md mx-auto shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              <div className="flex justify-between">
                <div>
                  Hello{" "}
                  <span className="underline">
                    {session.data?.user?.username}
                  </span>
                  ,
                  <span className="flex text-lg font-normal items-center">
                    Your Todos List <ArrowDown className="ml-2" size={15} />
                  </span>
                </div>
                <Button onClick={() => signOut()}>Logout</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Add a new todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button onClick={createTodo}>Add</Button>
            </div>
            <ul className="space-y-2">
              <div className="flex items-center justify-center">
                <p className="font-bold">{completedTodos + "/" + totalTodos}</p>
                <Progress
                  total={totalTodos}
                  completed={completedTodos}
                  value={progressValue}
                  className="ml-2 w-1/2"
                />
              </div>
              {list.map((todo) => (
                <div>
                  <li
                    key={todo.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        name="completed"
                        checked={todo.completed}
                        onChange={(e) => handleChange(e, todo.id!)}
                      />
                      <label
                        htmlFor={`todo-${todo.id}`}
                        className={`${
                          todo.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {todo.title}
                      </label>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => deleteTodo(todo.id!)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </li>
                </div>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
