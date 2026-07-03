// jest.setup.ts
import '@testing-library/jest-dom';

// Mock next/image for testing
jest.mock('next/image', () => ({
  __esModule: true,
  // @ts-ignore
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    // @ts-ignore
    return <img data-testid="next-image" src={src} alt={alt} {...rest} />;
  },
}));

// Mock next/link for testing
jest.mock('next/link', () => ({
  __esModule: true,
  // @ts-ignore
  default: ({ href, children, ...props }: any) => {
    // @ts-ignore
    return <a data-testid="next-link" href={href} {...props}>{children}</a>;
  }
}));

// Mock next/router for useRouter hook
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
      query: {},
      asPath: '/',
    };
  },
}));