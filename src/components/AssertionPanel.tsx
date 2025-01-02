import React from 'react';
import { Plus } from 'lucide-react';
import { ApiKeyValue } from '../types/api';
import { ApiKeyValuePair } from './ApiKeyValuePair';

interface AssertionPanelProps {
  assertions: ApiKeyValue[];
  onChange: (assertions: ApiKeyValue[]) => void;
}

export function AssertionPanel({ assertions, onChange }: AssertionPanelProps) {
  const addAssertion = () => {
    onChange([...assertions, { key: '', value: '', type: 'string' }]);
  };

  const updateAssertion = (index: number, updated: ApiKeyValue) => {
    const newAssertions = [...assertions];
    newAssertions[index] = updated;
    onChange(newAssertions);
  };

  const deleteAssertion = (index: number) => {
    onChange(assertions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Response Assertions (Optional)</h2>
        <button
          onClick={addAssertion}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={16} />
          Add Assertion
        </button>
      </div>
      {assertions.map((assertion, index) => (
        <ApiKeyValuePair
          key={index}
          keyValue={assertion}
          onChange={(updated) => updateAssertion(index, updated)}
          onDelete={() => deleteAssertion(index)}
        />
      ))}
    </div>
  );
}