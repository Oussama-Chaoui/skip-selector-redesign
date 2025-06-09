import { useState, useEffect } from 'react'
import { useSkips } from '../../common/hooks/useSkips'
import type { SkipOption } from '../../common/types/skip'
import HelpChatBot from '../../common/components/HelpChatBot'
import SelectedSkipSummary from '../timeline/components/SelectedSkipSummary'
import SkipComparisonModal from '../timeline/components/SkipComparisonModal'
import GridSkipCard from './components/GridCard'
import { Loader2, XCircle } from 'lucide-react'

const GridDesign = () => {
  const { skips, loading, error } = useSkips()
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null)
  const [activeSize, setActiveSize] = useState<number | null>(null)
  const [isComparing, setIsComparing] = useState(false)

  useEffect(() => {
    if (skips.length > 0 && activeSize === null) {
      setActiveSize(skips[0].size)
    }
  }, [skips, activeSize])

  useEffect(() => {
    if (selectedSkip) {
      const el = document.getElementById(`skip-${selectedSkip.id}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [selectedSkip])


  const handleSelect = (skip: SkipOption) => {
    setSelectedSkip(prev => prev?.id === skip.id ? null : skip)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-alert-600 py-20">
        <XCircle size={48} />
        <p className="mt-4 text-lg">Oops! Something went wrong.</p>
        <p className="mt-2 text-sm text-muted">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="pt-12 pb-8 px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
          Choose Your Skip Size
        </h1>
        <p className="text-muted max-w-2xl mx-auto">
          Select the perfect skip for your garden waste. Compare sizes, prices, and environmental impact.
        </p>
      </header>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-primary-500" size={48} />
        </div>
      )}

      <main className={`px-4 max-w-6xl mx-auto ${selectedSkip ? 'pb-54' : 'pb-20'}`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mt-16">
          {skips.map(skip => (
            <div key={skip.id} id={`skip-${skip.id}`}>
              <GridSkipCard
                skip={skip}
                isActive={activeSize === skip.size}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={() => handleSelect(skip)}
                onHover={() => {
                  if (!isComparing) setActiveSize(skip.size)
                }}
              />
            </div>
          ))}
        </div>


        <SelectedSkipSummary
          selectedSkip={selectedSkip!}
          onCompare={() => setIsComparing(true)}
          onChangeSelection={() => setSelectedSkip(null)}
        />
      </main>

      <SkipComparisonModal
        isComparing={isComparing}
        filteredSkips={skips}
        selectedSkip={selectedSkip}
        onClose={() => setIsComparing(false)}
        onSelect={skip => {
          setSelectedSkip(skip)
          setIsComparing(false)
        }}
      />

      {!loading && (
        <HelpChatBot skips={skips} />
      )}

      {/* Mobile-only bottom spacer to sit under the chatbot & theme toggle buttons */}
      <div className="fixed bottom-0 left-0 w-full h-[63px] bg-card-light-secondary sm:hidden z-0" />
    </div>
  )
}

export default GridDesign;
