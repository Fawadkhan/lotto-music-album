import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  getItem<T>(itemKey: LocalStorageKey): T {
    let valueFromStorage: string | undefined;
    valueFromStorage = localStorage.getItem(itemKey) as string | undefined;
    return valueFromStorage ? JSON.parse(valueFromStorage) : undefined;
  }

  setItem<T>(itemKey: LocalStorageKey, value: T): void {
    localStorage.setItem(itemKey, JSON.stringify(value));
  }

  deleteItem(itemKey: LocalStorageKey): void {
    localStorage.removeItem(itemKey);
  }
}
