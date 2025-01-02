export type RequestType = 'GET' | 'POST';

export type ApiKeyValue = {
  key: string;
  value: string;
  type: 'string' | 'number';
};

export type ResponseStatus = 200 | 400 | 401 | 403 | 404 | 500;

export type TestResult = {
  expected: ResponseStatus;
  actual: number;
  success: boolean;
  assertions?: {
    expected: Record<string, any>;
    actual: Record<string, any>;
    success: boolean;
  };
};