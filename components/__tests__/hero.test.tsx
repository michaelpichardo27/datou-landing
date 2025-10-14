import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Hero } from '../hero'

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Web3 Marketplace for Creators/i)).toBeInTheDocument()
    expect(screen.getByText(/Effortless Collaboration/i)).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Hero />)
    
    expect(
      screen.getByText(/DATOU unites photographers, videographers, models, and agencies/i)
    ).toBeInTheDocument()
  })

  it('renders the Join Waitlist button', () => {
    render(<Hero />)
    
    const joinButton = screen.getByRole('link', { name: /join waitlist/i })
    expect(joinButton).toBeInTheDocument()
    expect(joinButton).toHaveAttribute('href', '#waitlist')
  })

  it('renders the Explore Work button', () => {
    render(<Hero />)
    
    const exploreButton = screen.getByRole('link', { name: /explore work/i })
    expect(exploreButton).toBeInTheDocument()
    expect(exploreButton).toHaveAttribute('href', '#vision')
  })

  it('has correct section id for navigation', () => {
    const { container } = render(<Hero />)
    
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'home')
  })

  it('renders with animated elements', () => {
    const { container } = render(<Hero />)
    
    // Check for motion div elements (framer-motion components)
    const motionDivs = container.querySelectorAll('[style*="opacity"]')
    expect(motionDivs.length).toBeGreaterThan(0)
  })
})

