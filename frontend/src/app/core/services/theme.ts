import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'spots-theme';
  
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const isDark = stored ? JSON.parse(stored) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(isDark);
    this.applyTheme();
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.saveTheme(newTheme);
    this.applyTheme();
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(isDark));
  }

  private applyTheme(): void {
    const root = document.documentElement;
    if (this.isDarkMode()) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
