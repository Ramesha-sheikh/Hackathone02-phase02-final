// frontend/src/services/todo_api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Todo {
  id: number; // Backend uses integer IDs for tasks
  title: string;
  description: string | null;
  status: string; // Backend uses status field instead of completed boolean
}

interface CreateTodoData {
  title: string;
  description?: string;
}

interface UpdateTodoData {
  title?: string;
  description?: string;
  status?: string;
}

export const fetchTodos = async (token: string): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const data = await response.json();
  // Map backend response to frontend Todo interface
  return data.map((todo: any) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status || 'pending' // Default to 'pending' if status is not provided
  }));
};

export const createTodo = async (
  token: string,
  data: CreateTodoData
): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

export const updateTodo = async (
  token: string,
  id: number,
  data: UpdateTodoData
): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

export const deleteTodo = async (token: string, id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
