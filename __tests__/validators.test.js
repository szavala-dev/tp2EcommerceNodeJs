import { validateRequiredFields } from '../utils/validators.js';

describe('validateRequiredFields', () => {
  it('returns valid when all fields are present', () => {
    const payload = { name: 'A', email: 'a@example.com' };
    const result = validateRequiredFields(payload, ['name', 'email']);
    expect(result).toEqual({ valid: true, missing: [] });
  });

  it('returns missing fields when payload is incomplete', () => {
    const payload = { name: 'A' };
    const result = validateRequiredFields(payload, ['name', 'email']);
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual(['email']);
  });
});
