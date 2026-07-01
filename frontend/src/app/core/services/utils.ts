import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  
  sanitizeInput(input: string, maxLength: number = 40): string {
    return input
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/[<>'"&]/g, '')
      .substring(0, maxLength);
  }

  sanitizeId(input: string): string {
    return input
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/[<>'"&]/g, '')
      .replace(/[^0-9]/g, '')
      .substring(0, 10);
  }

  sanitizeUrl(input: string): string {
    return input
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/[<>'"&]/g, '')
      .substring(0, 100);
  }
}
