import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
