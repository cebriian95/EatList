import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = async (route, state) => {
  
  const auth = inject(Auth);
  const router = inject(Router);

  if (await auth.isAuthenticated()) {
    const currentBoardId = auth.getCurrentBoard();
    router.navigate(['/board', currentBoardId]);
    return false;
  }
  
  return true;
};
