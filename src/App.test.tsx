import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('To-Do List')).toBeInTheDocument()
  })

  it('adds a new todo item', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    const button = screen.getByText('Add')

    await user.type(input, 'New task')
    await user.click(button)

    expect(screen.getByText('New task')).toBeInTheDocument()
  })

  it('deletes a todo item', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    const button = screen.getByText('Add')

    await user.type(input, 'Task to delete')
    await user.click(button)

    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument()
  })

  it('toggles todo completion status', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    const button = screen.getByText('Add')

    await user.type(input, 'Task to toggle')
    await user.click(button)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('edits a todo item', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('Add a new task...')
    const button = screen.getByText('Add')

    await user.type(input, 'Original task')
    await user.click(button)

    const editButton = screen.getByText('Edit')
    await user.click(editButton)

    const editInput = screen.getByDisplayValue('Original task')
    await user.clear(editInput)
    await user.type(editInput, 'Edited task')
    await user.keyboard('{Enter}')

    expect(screen.getByText('Edited task')).toBeInTheDocument()
    expect(screen.queryByText('Original task')).not.toBeInTheDocument()
  })

  it('shows empty state when no todos', () => {
    render(<App />)
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })
})

