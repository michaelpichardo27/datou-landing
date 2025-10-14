# Testing Setup for DATOU Landing Page

## Overview
This project now includes a comprehensive test suite using Vitest and React Testing Library.

## Installation Required

First, you need to install the testing dependencies. Run one of the following commands depending on your package manager:

### Using npm:
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

### Using pnpm:
```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

### Using yarn:
```bash
yarn add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

### Using bun:
```bash
bun add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

## Test Scripts

After installing dependencies, you can use these npm scripts:

- `npm test` - Run tests in watch mode (interactive)
- `npm run test:ui` - Run tests with Vitest UI (visual interface)
- `npm run test:run` - Run all tests once (CI mode)
- `npm run test:coverage` - Run tests with coverage report

## Test Coverage

The test suite includes comprehensive tests for:

### 1. **WaitlistForm Component** (`components/__tests__/waitlist-form.test.tsx`)
- Form rendering
- Email input validation
- Form submission
- Loading states
- Success toast notifications
- Form reset after submission

### 2. **Hero Component** (`components/__tests__/hero.test.tsx`)
- Main heading rendering
- Description text
- CTA buttons (Join Waitlist, Explore Work)
- Section navigation anchors
- Animation elements

### 3. **Features Component** (`components/__tests__/features.test.tsx`)
- Section heading and description
- All 6 feature cards rendering
- Feature descriptions
- Section navigation
- Styling classes

### 4. **Navbar Component** (`components/__tests__/navbar.test.tsx`)
- Logo rendering
- Navigation links (Home, Vision, Features, Team, Waitlist, Contact)
- Link href attributes
- Mobile menu toggle
- Join Waitlist button
- Fixed positioning

## Project Structure

```
datou-landing/
├── vitest.config.ts              # Vitest configuration
├── test/
│   ├── setup.ts                  # Test environment setup
│   └── utils.tsx                 # Test utilities
└── components/
    └── __tests__/                # Component tests
        ├── waitlist-form.test.tsx
        ├── hero.test.tsx
        ├── features.test.tsx
        └── navbar.test.tsx
```

## Configuration

### Vitest Config (`vitest.config.ts`)
- Uses jsdom environment for DOM testing
- Includes path aliases (@/)
- Auto-imports globals
- CSS processing enabled

### Test Setup (`test/setup.ts`)
- Jest-DOM matchers
- IntersectionObserver mock
- Window.matchMedia mock
- Scroll behavior mocks
- Cleanup after each test

## Running Tests

1. **Install dependencies** (see Installation section above)
2. **Run tests**:
   ```bash
   npm test
   ```
3. **View UI** (recommended for development):
   ```bash
   npm run test:ui
   ```

## Next Steps

To expand test coverage, consider adding tests for:
- Vision component
- Team component
- Contact component
- Footer component
- BackToTop component
- Integration tests
- E2E tests with Playwright

