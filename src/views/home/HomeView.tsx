import { SearchBar } from '@/components/forms/SearchBar'

export default function HomeView() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto">
        <SearchBar />
      </div>
    </div>
  )
}
