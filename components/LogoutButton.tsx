'use client';

import { logoutAction } from '@/app/(auth)/login/actions';

export function LogoutButton() {
  return (
    <button
      type="button"
      className="dropdown-item text-danger border-0 bg-transparent w-100 text-left"
      onClick={() => logoutAction()}
    >
      <i className="fas fa-sign-out-alt mr-2" />
      Logout
    </button>
  );
}
