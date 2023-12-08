import React, { useRef } from "react";

const AddTodo = () => {
  const todoRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const todo = {
      name: todoRef.current.value,
    };
    const response = await fetch(
      "https://react-post-request-7d546-default-rtdb.firebaseio.com/todos.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Todo name</label>
        <input ref={todoRef} />
        <button type="submit">Add todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
