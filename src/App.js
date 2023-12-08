import { useCallback, useEffect, useState } from "react";
import AddTodo from "./AddTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    handleFetchTodos();
  }, [handleFetchTodos]);

  return (
    <div>
      <button onClick={handleFetchTodos}>Fetch Todos</button>
      <AddTodo />
      <h1>Todos</h1>
      {isLoading && todos.length === 0 && <p>Loading...</p>}
      {!isLoading && todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
      {!isLoading && error && <p>Something went wrong</p>}
    </div>
  );
}

export default App;
