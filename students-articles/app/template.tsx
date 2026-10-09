// Re-mounts on every navigation: a quiet fade between pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
