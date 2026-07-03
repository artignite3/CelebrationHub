import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { formatDate, isBirthday } from '@/lib/dateUtils';

describe('Date Utilities', () => {
  let originalDate: Date;

  beforeEach(() => {
    // Store the original Date constructor
    originalDate = global.Date as any;

    // Create a fixed date for mocking
    const fixedDate = new Date('2023-06-15T00:00:00Z');

    // Mock the Date constructor to return our fixed date when called with no arguments
    // but delegate to the original Date constructor when called with arguments
    global.Date = class extends Date {
      constructor(...args: any[]) {
        if (args.length === 0) {
          // When called with no arguments, return our fixed date
          return new Date(fixedDate);
        } else {
          // When called with arguments, use the original Date constructor
          return new (Function.prototype.bind.call(originalDate, null, ...args))();
        }
      }
    } as any;

    // Copy over static properties from the original Date
    Object.assign(global.Date, originalDate);
  });

  afterEach(() => {
    // Restore the original Date constructor
    global.Date = originalDate as any;
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-06-15');
      expect(formatDate(date)).toBe('June 15, 2023');
    });

    it('should handle invalid dates gracefully', () => {
      // @ts-ignore - Testing invalid input
      expect(formatDate('invalid')).toContain('Invalid Date');
    });
  });

  describe('isBirthday', () => {
    it('should return true when date matches today', () => {
      expect(isBirthday(6, 15)).toBe(true); // June 15
    });

    it('should return false when date does not match today', () => {
      expect(isBirthday(6, 14)).toBe(false); // June 14
      expect(isBirthday(6, 16)).toBe(false); // June 16
      expect(isBirthday(5, 15)).toBe(false); // May 15
      expect(isBirthday(7, 15)).toBe(false); // July 15
    });
  });
});