"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
    setInterval(() => {
      fetchTodos();
    }, REFRESH_TODO);
    return () => clearInterval(REFRESH_TODO);
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
        const errorData = await res.json();
        throw new Error(errorData.message || "Error while creating todo");
      }

      const data = await res.json();
      setList((prev) => [...prev, data.todo]);
      setTitle("");
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
        const errorData = await res.json();
        throw new Error(errorData.message || "Error while deleting todo");
      }

      setList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error while deleting todo", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = e.target;
    updateCheckbox(id, checked);
  };

  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
      <div className="flex flex-col h-screen justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Todo List
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
              {list.map((todo) => (
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
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
