export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hold-transition login-page">
      {children}
    </div>
  );
}
