import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Navbar } from '../navbar'

describe('Navbar', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  afterEach(() => {
    // Clean up
    delete (window as any).scrollY
  })

  it('renders the DATOU logo', () => {
    render(<Navbar />)
    
    expect(screen.getByText('DATOU')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Vision')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('Waitlist')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    render(<Navbar />)
    
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '#home')
    
    const visionLink = screen.getByText('Vision').closest('a')
    expect(visionLink).toHaveAttribute('href', '#vision')
    
    const featuresLink = screen.getByText('Features').closest('a')
    expect(featuresLink).toHaveAttribute('href', '#features')
  })

  it('renders Join Waitlist button in desktop nav', () => {
    render(<Navbar />)
    
    const buttons = screen.getAllByRole('link', { name: /join waitlist/i })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('shows mobile menu toggle button on mobile', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when clicking menu button', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    
    // Initially, mobile menu should not show navigation links (only desktop version visible)
    await user.click(menuButton)
    
    // After clicking, mobile menu should be visible with all nav items
    // The mobile menu has duplicate links, so we check for multiple instances
    const homeLinks = screen.getAllByText('Home')
    expect(homeLinks.length).toBeGreaterThan(1)
  })

  it('has fixed positioning', () => {
    const { container } = render(<Navbar />)
    
    const nav = container.querySelector('nav')
    expect(nav?.className).toContain('fixed')
  })

  it('logo links to home section', () => {
    render(<Navbar />)
    
    const logo = screen.getByText('DATOU').closest('a')
    expect(logo).toHaveAttribute('href', '#home')
  })
})

