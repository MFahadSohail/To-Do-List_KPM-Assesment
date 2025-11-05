import { useState } from 'react'
import './App.css'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: inputText.trim(), completed: false }])
      setInputText('')
    }
  }

  const handleEdit = (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      setEditingId(id)
      setEditText(todo.text)
    }
  }

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      setTodos(todos.map(t => t.id === id ? { ...t, text: editText.trim() } : t))
    }
    setEditingId(null)
    setEditText('')
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const handleToggle = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <div className="app">
      <h1>To-Do List</h1>
      
      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty">No tasks yet. Add one above!</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleSaveEdit(todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(todo.id)
                      if (e.key === 'Escape') {
                        setEditingId(null)
                        setEditText('')
                      }
                    }}
                    autoFocus
                  />
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <div className="actions">
                    <button onClick={() => handleEdit(todo.id)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

