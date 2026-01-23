import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search } from 'lucide-react'
import { useScrollLock } from '@/hooks/useScrollLock'

interface MobileSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
  recentSearches?: string[]
}

export function MobileSearchModal({
  isOpen,
  onClose,
  onSearch,
  recentSearches = [],
}: MobileSearchModalProps) {
  const [query, setQuery] = useState('')
  useScrollLock(isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      onClose()
    }
  }

  const handleRecentSearch = (search: string) => {
    onSearch(search)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 p-0 max-w-none h-full rounded-none border-none data-[state=open]:slide-in-from-top-0 data-[state=closed]:slide-out-to-top-0">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Search Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <button
              type="button"
              onClick={onClose}
              className="min-w-touch min-h-touch flex items-center justify-center -ml-2 rounded-full hover:bg-muted active:bg-muted/80"
              aria-label="Close search"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="border-none bg-transparent h-12 text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                icon={<Search className="h-5 w-5" />}
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-primary font-medium min-h-touch px-2 hover:underline"
            >
              Cancel
            </button>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="flex-1 overflow-auto p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Recent Searches
              </h3>
              <ul className="space-y-1">
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleRecentSearch(search)}
                      className="w-full text-left px-3 py-3 rounded-md hover:bg-muted active:bg-muted/80 text-sm flex items-center gap-3"
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      {search}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
