import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const sessionGuard: CanActivateFn = (route, state) => {

  const cookie = document.cookie;
  const router = inject(Router);

  if(!cookie.length) {

    localStorage.clear();
    sessionStorage.clear();
    router.navigateByUrl("");
    return false;
  }

  return true;
};
