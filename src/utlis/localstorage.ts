
export type StorageKeys = 'theme' | 'other..'

export const setStorageItem = (key: StorageKeys, value: string): void => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error('LocalStorage set error:', e);
    }
};


export const getStorageItem = <T>(key: StorageKeys): T | null => {
    try {
        const item = localStorage.getItem(key);
        if (!item) {
            return null
        }
        return localStorage.getItem(key) as T;
    } catch (e) {
        console.error('LocalStorage get error:', e);
        return null;
    }
};


export const removeStorageItem = (key: StorageKeys): void => {
    localStorage.removeItem(key);
};

