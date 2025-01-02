import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { TestResult } from '../types/api';

interface TestResultProps {
  result: TestResult | null;
}

export function TestResultDisplay({ result }: TestResultProps) {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 rounded-lg bg-gray-50 border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Test Result</h3>
          <p className="text-gray-600">
            Expected: {result.expected} | Actual: {result.actual}
          </p>
        </div>
        <div className="flex items-center">
          {result.success ? (
            <CheckCircle className="text-green-500 w-8 h-8" />
          ) : (
            <XCircle className="text-red-500 w-8 h-8" />
          )}
        </div>
      </div>

      {result.assertions && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-md font-semibold mb-2">Response Assertions</h4>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium">Expected:</p>
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(result.assertions.expected, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium">Actual:</p>
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(result.assertions.actual, null, 2)}
              </pre>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Assertions:</span>
              {result.assertions.success ? (
                <span className="text-green-500">Passed</span>
              ) : (
                <span className="text-red-500">Failed</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}