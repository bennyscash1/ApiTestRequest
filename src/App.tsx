import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { RequestType, ApiKeyValue, ResponseStatus, TestResult } from './types/api';
import { ApiKeyValuePair } from './components/ApiKeyValuePair';
import { TestResultDisplay } from './components/TestResult';
import { AssertionPanel } from './components/AssertionPanel';
import { validateAssertions } from './utils/assertions';

function App() {
  const [requestType, setRequestType] = useState<RequestType>('GET');
  const [baseUrl, setBaseUrl] = useState('');
  const [keyValues, setKeyValues] = useState<ApiKeyValue[]>([]);
  const [assertions, setAssertions] = useState<ApiKeyValue[]>([]);
  const [expectedResponse, setExpectedResponse] = useState<ResponseStatus>(200);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const addKeyValue = () => {
    setKeyValues([...keyValues, { key: '', value: '', type: 'string' }]);
  };

  const updateKeyValue = (index: number, updated: ApiKeyValue) => {
    const newKeyValues = [...keyValues];
    newKeyValues[index] = updated;
    setKeyValues(newKeyValues);
  };

  const deleteKeyValue = (index: number) => {
    setKeyValues(keyValues.filter((_, i) => i !== index));
  };

  const handleTest = async () => {
    try {
      const options: RequestInit = {
        method: requestType,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (requestType === 'POST') {
        const body = Object.fromEntries(
          keyValues.map(({ key, value, type }) => [
            key,
            type === 'number' ? Number(value) : value,
          ])
        );
        options.body = JSON.stringify(body);
      }

      const response = await fetch(baseUrl, options);
      const responseData = await response.json().catch(() => ({}));
      
      const statusSuccess = response.status === expectedResponse;
      const assertionResults = assertions.length > 0 
        ? validateAssertions(responseData, assertions)
        : undefined;

      setTestResult({
        expected: expectedResponse,
        actual: response.status,
        success: statusSuccess && (assertionResults?.success ?? true),
        assertions: assertionResults
      });
    } catch (error) {
      setTestResult({
        expected: expectedResponse,
        actual: 500,
        success: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">API Tester</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Request Type
              </label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as RequestType)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                API Base URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>

            {requestType === 'POST' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Request Parameters</h2>
                  <button
                    onClick={addKeyValue}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Plus size={16} />
                    Add Parameter
                  </button>
                </div>
                {keyValues.map((kv, index) => (
                  <ApiKeyValuePair
                    key={index}
                    keyValue={kv}
                    onChange={(updated) => updateKeyValue(index, updated)}
                    onDelete={() => deleteKeyValue(index)}
                  />
                ))}
              </div>
            )}

            <AssertionPanel
              assertions={assertions}
              onChange={setAssertions}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expected Response
              </label>
              <select
                value={expectedResponse}
                onChange={(e) => setExpectedResponse(Number(e.target.value) as ResponseStatus)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value={200}>200 - OK</option>
                <option value={400}>400 - Bad Request</option>
                <option value={401}>401 - Unauthorized</option>
                <option value={403}>403 - Forbidden</option>
                <option value={404}>404 - Not Found</option>
                <option value={500}>500 - Internal Server Error</option>
              </select>
            </div>

            <button
              onClick={handleTest}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Test API
            </button>

            <TestResultDisplay result={testResult} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;