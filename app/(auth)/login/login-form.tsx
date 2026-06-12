'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { loginAction, type LoginState } from './actions';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '@/lib/auth';

const initialState: LoginState | null = null;

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link href="/login" className="h3">
            WeCom CRM
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          {state?.error ? (
            <div className="alert alert-danger" role="alert">
              {state.error}
            </div>
          ) : null}
          <form action={formAction}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                defaultValue={ADMIN_USERNAME}
                required
                autoComplete="username"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                defaultValue={ADMIN_PASSWORD}
                required
                autoComplete="current-password"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block" disabled={isPending}>
                  {isPending ? 'Signing in...' : 'Login'}
                </button>
              </div>
            </div>
          </form>
          <p className="mb-0 mt-3 text-muted text-center small">
            Default: {ADMIN_USERNAME} / {ADMIN_PASSWORD}
          </p>
        </div>
      </div>
    </div>
  );
}
