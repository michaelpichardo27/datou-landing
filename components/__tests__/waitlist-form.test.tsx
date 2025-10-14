import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { WaitlistForm } from '../waitlist-form'

// Mock the toast hook
const mockToast = vi.fn()
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}))

describe('WaitlistForm', () => {
  beforeEach(() => {
    mockToast.mockClear()
  })

  it('renders the form with email input and submit button', () => {
    render(<WaitlistForm />)
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument()
  })

  it('allows user to type in the email input', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('submits the form and shows success toast', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)
    
    // Check button shows loading state
    expect(screen.getByRole('button', { name: /joining/i })).toBeInTheDocument()
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "You're on the list!",
        description: "We'll notify you when DATOU launches.",
      })
    })
    
    // Check email input is cleared
    await waitFor(() => {
      expect(emailInput).toHaveValue('')
    })
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.click(submitButton)
    
    const loadingButton = screen.getByRole('button', { name: /joining/i })
    expect(loadingButton).toBeDisabled()
  })

  it('requires email input to submit', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)
    
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    
    // Try to submit without email
    await user.click(submitButton)
    
    // Toast should not be called
    expect(mockToast).not.toHaveBeenCalled()
  })
})

