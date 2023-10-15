import { useState } from 'react';
import { SessionStorageKey } from '@/constants/storage';

type Setter<T> = (value: ((prev: T) => T) | T) => void;

export function useSessionStorage<T>(key: SessionStorageKey): [T | undefined, Setter<T | undefined>];
export function useSessionStorage<T>(key: SessionStorageKey, initialValue: T): [T, Setter<T>];
export function useSessionStorage<T>(key: SessionStorageKey, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => getStoredValue<T>(key, initialValue));

  const setValue: Setter<T | undefined> = value => {
    try {
      const valueToStore: T | undefined = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {}
  };

  return [storedValue, setValue];
}

function getStoredValue<T>(key: SessionStorageKey, initialValue?: T) {
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch (e) {
    return initialValue;
  }
}
