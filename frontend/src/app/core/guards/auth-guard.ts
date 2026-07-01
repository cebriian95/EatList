import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  
  const auth = inject(Auth);
  const router = inject(Router);

  const urlBoardId = parseInt(route.params['id']);
  const sessionBoardId = auth.getCurrentBoard();

  if (!await auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (sessionBoardId !== urlBoardId) {
    router.navigate(['/board', sessionBoardId]);
    return false;
  }

  return true;
};
