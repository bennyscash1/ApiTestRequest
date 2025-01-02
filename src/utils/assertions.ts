import { ApiKeyValue } from '../types/api';

export function parseValue(value: string, type: 'string' | 'number'): string | number {
  return type === 'number' ? Number(value) : value;
}

export function validateAssertions(
  responseData: any,
  assertions: ApiKeyValue[]
): { success: boolean; expected: Record<string, any>; actual: Record<string, any> } {
  const expected: Record<string, any> = {};
  const actual: Record<string, any> = {};
  
  for (const assertion of assertions) {
    const expectedValue = parseValue(assertion.value, assertion.type);
    expected[assertion.key] = expectedValue;
    actual[assertion.key] = responseData?.[assertion.key];
  }

  const success = Object.entries(expected).every(([key, value]) => 
    actual[key] === value
  );

  return { success, expected, actual };
}