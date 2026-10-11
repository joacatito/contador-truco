import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const rawValue = await AsyncStorage.getItem(key);
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function readString(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}

export async function writeString(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value);
}
