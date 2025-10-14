import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Features } from '../features'

describe('Features', () => {
  it('renders the section heading', () => {
    render(<Features />)
    
    expect(screen.getByText(/The DATOU/i)).toBeInTheDocument()
    expect(screen.getByText(/Platform/i)).toBeInTheDocument()
  })

  it('renders the section description', () => {
    render(<Features />)
    
    expect(
      screen.getByText(/Everything you need to collaborate, create, and monetize your work/i)
    ).toBeInTheDocument()
  })

  it('renders all six feature cards', () => {
    render(<Features />)
    
    expect(screen.getByText('Verified Profiles')).toBeInTheDocument()
    expect(screen.getByText('Collaboration Boards')).toBeInTheDocument()
    expect(screen.getByText('Portfolio & Ratings')).toBeInTheDocument()
    expect(screen.getByText('Payments & Licensing')).toBeInTheDocument()
    expect(screen.getByText('Creator Discovery')).toBeInTheDocument()
    expect(screen.getByText('Tokenized Monetization')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<Features />)
    
    expect(screen.getByText('Build trust with verified creator and agency accounts.')).toBeInTheDocument()
    expect(screen.getByText('Post and discover gigs, castings, and shoots.')).toBeInTheDocument()
    expect(screen.getByText('Showcase work with social proof.')).toBeInTheDocument()
    expect(screen.getByText('Secure payouts and content protection.')).toBeInTheDocument()
    expect(screen.getByText('Powerful search and matching.')).toBeInTheDocument()
    expect(screen.getByText('Reward participation and virality.')).toBeInTheDocument()
  })

  it('has correct section id for navigation', () => {
    const { container } = render(<Features />)
    
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'features')
  })

  it('renders with proper styling classes', () => {
    const { container } = render(<Features />)
    
    const section = container.querySelector('section')
    expect(section?.className).toContain('bg-gray-50')
  })
})

