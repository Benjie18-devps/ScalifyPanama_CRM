export const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'pi pi-home',
    to: '/dashboard',
  },
]

export const NAV_GROUPS = [
  {
    key: 'crm',
    label: 'CRM',
    items: [
      { key: 'clients', label: 'Clients', icon: 'pi pi-building', to: '/clients' },
      { key: 'contacts', label: 'Contacts', icon: 'pi pi-users', to: '/contacts' },
      { key: 'projects', label: 'Projects', icon: 'pi pi-briefcase', to: '/projects' },
      { key: 'tasks', label: 'Tasks', icon: 'pi pi-check-square', to: '/tasks' },
    ],
  },
  {
    key: 'support',
    label: 'Support',
    items: [
      { key: 'tickets', label: 'Tickets', icon: 'pi pi-ticket', to: '/tickets' },
      { key: 'knowledge', label: 'Knowledge Base', icon: 'pi pi-book', to: '/knowledge' },
      { key: 'files', label: 'Files', icon: 'pi pi-folder', to: '/files' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    items: [
      { key: 'invoices', label: 'Invoices', icon: 'pi pi-file-pdf', to: '/invoices' },
      { key: 'payments', label: 'Payments', icon: 'pi pi-credit-card', to: '/payments' },
      { key: 'quotes', label: 'Quotes', icon: 'pi pi-file-edit', to: '/quotes' },
    ],
  },
  {
    key: 'analytics',
    label: 'Analytics',
    items: [
      { key: 'reports', label: 'Reports', icon: 'pi pi-chart-bar', to: '/reports' },
      { key: 'calendar', label: 'Calendar', icon: 'pi pi-calendar', to: '/calendar' },
    ],
  },
  {
    key: 'administration',
    label: 'Administration',
    items: [
      { key: 'users', label: 'Users', icon: 'pi pi-user', to: '/admin/users' },
      { key: 'roles', label: 'Roles', icon: 'pi pi-shield', to: '/admin/roles' },
      { key: 'settings', label: 'Settings', icon: 'pi pi-cog', to: '/settings' },
    ],
  },
]
