import { Header } from './Header'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: string
  onSearch?: (query: string) => void
  userAvatar?: string
  userName?: string
}

export function DashboardLayout({
  children,
  currentPage,
  onSearch,
  userAvatar,
  userName,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        currentPage={currentPage}
        onSearch={onSearch}
        userAvatar={userAvatar}
        userName={userName}
      />
      <main className="flex-1">
        <div className="content-container">{children}</div>
      </main>
    </div>
  )
}
