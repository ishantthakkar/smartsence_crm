import { LogoutButton } from '@/components/LogoutButton';
import { ADMIN_USERNAME } from '@/lib/auth';

export default function Header() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <div className="navbar-nav pl-2" />

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link p-0 pr-3" data-toggle="dropdown" href="#">
            <img src="/img/avatar5.png" className="img-circle elevation-2" width="40" height="40" alt="" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-3">
            <h4 className="h4 mb-0">
              <strong>{ADMIN_USERNAME}</strong>
            </h4>
            <div className="mb-3 text-muted">Administrator</div>
            <div className="dropdown-divider" />
            <LogoutButton />
          </div>
        </li>
      </ul>
    </nav>
  );
}
