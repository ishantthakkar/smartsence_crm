import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link href="/" className="brand-link">
        <img
          src="/img/wecom-logo.png"
          alt="WeCom CRM Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">WeCom CRM</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/messages" className="nav-link">
                <i className="nav-icon fas fa-envelope" />
                <p>Messages</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/catalogs" className="nav-link">
                <i className="nav-icon fas fa-book" />
                <p>Catalog Scanner</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link">
                <i className="nav-icon fas fa-box" />
                <p>Products</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/inquiries" className="nav-link">
                <i className="nav-icon fas fa-clipboard-list" />
                <p>Buyer Inquiries</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
