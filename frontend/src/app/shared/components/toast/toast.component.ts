import { Component, signal} from '@angular/core';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  toasts = signal<ToastMessage[]>([]);
  readonly MAX_TOASTS = 5;
  // Manejo de timeouts para evitar memory leaks
  private timeouts = new Map<string, ReturnType<typeof setTimeout>>();


  getToastClasses(type: ToastMessage['type']): string {
    const baseClasses = 'min-w-80 max-w-96 p-4 rounded-lg shadow-lg pointer-events-auto flex items-center text-sm font-sans leading-tight transition-all duration-300 ease-out';
    
    switch (type) {
      case 'error':
        return `${baseClasses} bg-white text-red-600 border border-red-600 dark:bg-red-500 dark:text-white`;
      case 'success':
        return `${baseClasses} bg-white text-green-600 border border-green-600 dark:bg-green-500 dark:text-white`;
      case 'warning':
        return `${baseClasses} bg-white text-yellow-600 border border-yellow-600 dark:bg-yellow-500 dark:text-white`;
      case 'info':
        return `${baseClasses} bg-white text-blue-600 border border-blue-600 dark:bg-blue-500 dark:text-white`;
      default:
        return `${baseClasses} bg-white text-gray-600 border border-gray-600 dark:bg-gray-500 dark:text-white`;
    }
  }

  showToast(message: string, type: ToastMessage['type'] = 'error', duration: number = 5000) {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, message, type, duration };
    
    // Obtener toast actuales
    const currentToasts = this.toasts();
    
    // Si ya hay 5 o más toast, eliminar el más antiguo
    if (currentToasts.length >= this.MAX_TOASTS) {
      const oldestToast = currentToasts[0];
      this.removeToast(oldestToast.id);
    }
    
    // Añadir el nuevo toast
    this.toasts.set([...currentToasts, newToast]);

    if(duration && duration > 0) {
      const timeoutId = setTimeout(() => {
        this.removeToast(id);
        this.timeouts.delete(id);
      }, duration);
      this.timeouts.set(id, timeoutId);
    }

    return id;
  }

  removeToast(id: string) {
    const timeoutId = this.timeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(id);
    }
    this.toasts.set(this.toasts().filter(toast => toast.id !== id));
  }

  clearAll() {
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.timeouts.clear();
    this.toasts.set([]);
  }
}
