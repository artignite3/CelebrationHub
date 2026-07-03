// jest.setup.js
require('@testing-library/jest-dom');
const React = require('react');

// Mock next/image for testing
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Return a React element for an img tag
    return React.createElement('img', {
      'data-testid': 'next-image',
      src: props.src || '',
      alt: props.alt || '',
      ...props
    });
  },
}));

// Mock next/link for testing
jest.mock('next/link', () => ({
  __esModule: true,
  // Return a React component that renders an anchor tag with click handler
  default: ({ href, children, ...props }) => {
    return React.createElement('a', {
      'data-testid': 'next-link',
      href: href || '#',
      onClick: (e) => {
        // Prevent default to simulate next/link behavior
        e.preventDefault();
        // In a real app, this would use the router
        // For testing, we just need the property to exist
      },
      ...props
    }, children);
  }
}));

// Mock next/router for useRouter hook
jest.mock('next/router', () => ({
  useRouter() {
    return {
      // Basic router properties
      push: jest.fn(),
      replace: jest.fn(),
      // Router events
      router: {
        events: {
          on: jest.fn(),
          off: jest.fn(),
        }
      },
      // Route information
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      isReady: true,
    };
  },
}));