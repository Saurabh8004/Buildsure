import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Search, FileText, Award, Briefcase, 
  TrendingUp, CheckSquare, AlertTriangle, RefreshCw,
  FolderOpen, CreditCard, Bell, MessageSquare, User,
  Settings, LogOut, Menu, X, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function ContractorLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuItems = [
    {
      category: 'WORK',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/contractor' },
        { icon: Search, label: 'Find Projects', path: '/contractor/projects' },
        { icon: FileText, label: 'My Bids', path: '/contractor/bids' },
        { icon: Award, label: 'Awarded Projects', path: '/contractor/awarded-projects' },
        { icon: Briefcase, label: 'Active Projects', path: '/contractor/active-projects' },
      ]
    },
    {
      category: 'PROJECT MANAGEMENT',
      items: [
        { icon: TrendingUp, label: 'Progress', path: '/contractor/progress' },
        { icon: CheckSquare, label: 'Milestones', path: '/contractor/milestones' },
        { icon: AlertTriangle, label: 'QA & Inspections', path: '/contractor/qa' },
        { icon: AlertTriangle, label: 'Quality Issues', path: '/contractor/quality-issues' },
        { icon: RefreshCw, label: 'Corrective Actions', path: '/contractor/corrective-actions' },
        { icon: RefreshCw, label: 'Reinspection', path: '/contractor/reinspection' },
      ]
    },
    {
      category: 'DOCUMENTS',
      items: [
        { icon: FolderOpen, label: 'Documents', path: '/contractor/documents' },
        { icon: CreditCard, label: 'Payments', path: '/contractor/payments' },
      ]
    },
    {
      category: 'ACCOUNT',
      items: [
        { icon: Bell, label: 'Notifications', path: '/contractor/notifications' },
        { icon: MessageSquare, label: 'Messages', path: '/contractor/messages' },
        { icon: User, label: 'Profile', path: '/contractor/profile' },
        { icon: Settings, label: 'Settings', path: '/contractor/settings' },
      ]
    }
  ];

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/contractor') {
      return location.pathname === '/contractor';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <span className="text-lg font-bold text-navy">ConstructBid</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={20} className="text-text-muted" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map((category) => (
              <div key={category.category} className="mb-6">
                <h4 className="px-6 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {category.category}
                </h4>
                <nav className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? 'bg-orange/10 text-orange border-r-2 border-orange'
                            : 'text-text hover:bg-bg-alt hover:text-navy'
                        }`}
                      >
                        <Icon size={18} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* User Profile */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center">
                <User size={18} className="text-orange" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy truncate">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu size={24} className="text-text" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-bg-alt rounded-lg transition-colors">
              <Bell size={20} className="text-text" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 hover:bg-bg-alt rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center">
                  <User size={16} className="text-orange" />
                </div>
                <span className="text-sm font-medium text-navy hidden sm:block">
                  {user?.full_name || 'User'}
                </span>
                <ChevronDown size={16} className="text-text-muted" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                  >
                    <div className="p-4 bg-bg border-b border-border">
                      <p className="text-sm font-semibold text-navy">{user?.full_name}</p>
                      <p className="text-xs text-text-muted mt-1">{user?.email}</p>
                      <p className="text-xs text-orange font-medium mt-1 capitalize">{user?.role}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/contractor/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-bg-alt rounded-lg transition-colors"
                      >
                        <User size={16} />
                        Profile
                      </Link>
                      <Link
                        to="/contractor/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-bg-alt rounded-lg transition-colors"
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
