import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./features/login/login').then(m => m.Login) },
    { path: 'board/:id', canActivate: [authGuard], loadComponent: () => import('./features/board/board').then(m => m.Board) },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
