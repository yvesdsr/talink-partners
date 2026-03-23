import SideNav from './SideNav';
import SiteFooter from './SiteFooter';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <main className="md:ml-20 lg:ml-64 pt-16 md:pt-0 min-h-screen">
        {children}
      </main>
      <div className="md:ml-20 lg:ml-64">
        <SiteFooter />
      </div>
    </div>
  );
};

export default Layout;
