import React from 'react';
import { Trash2 } from 'lucide-react';
import { ApiKeyValue } from '../types/api';

interface ApiKeyValuePairProps {
  keyValue: ApiKeyValue;
  onChange: (updated: ApiKeyValue) => void;
  onDelete: () => void;
}

export function ApiKeyValuePair({ keyValue, onChange, onDelete }: ApiKeyValuePairProps) {
  return (
    <div className="flex gap-4 items-start mb-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="API Key"
          value={keyValue.key}
          onChange={(e) => onChange({ ...keyValue, key: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <input
          type={keyValue.type === 'number' ? 'number' : 'text'}
          placeholder="Value"
          value={keyValue.value}
          onChange={(e) => onChange({ ...keyValue, value: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex-1">
        <select
          value={keyValue.type}
          onChange={(e) => onChange({ ...keyValue, type: e.target.value as 'string' | 'number' })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="string">String</option>
          <option value="number">Number</option>
        </select>
      </div>
      <button
        onClick={onDelete}
        className="p-2 text-red-500 hover:text-red-700"
        aria-label="Delete key-value pair"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}