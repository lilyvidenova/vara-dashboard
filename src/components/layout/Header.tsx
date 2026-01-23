import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { MobileSearchModal } from './MobileSearchModal'
import { useIsMobile } from '@/hooks/useMediaQuery'

interface HeaderProps {
  currentPage: string
  onSearch?: (query: string) => void
  userAvatar?: string
  userName?: string
}

export function Header({
  currentPage,
  onSearch,
  userAvatar,
  userName = 'User',
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const isMobile = useIsMobile()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim())
    }
  }

  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
          {/* Left side - Logo and page title */}
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-base font-bold text-primary">
              VARA METRICS
            </span>

            {/* Divider and page title - hidden on mobile */}
            <div className="hidden items-center gap-4 lg:flex">
              <div className="h-6 w-px bg-border" />
              <span className="text-base font-bold text-foreground">
                {currentPage}
              </span>
            </div>
          </div>

          {/* Right side - Search and avatar */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop search input */}
            {!isMobile && (
              <form onSubmit={handleDesktopSearch} className="hidden md:block">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                  className="w-[280px] lg:w-[336px]"
                />
              </form>
            )}

            {/* Mobile search button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* User avatar */}
            <Avatar>
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName} />
              ) : null}
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile search modal */}
      <MobileSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
        recentSearches={['Dashboard metrics', 'Revenue report', 'User analytics']}
      />
    </>
  )
}
