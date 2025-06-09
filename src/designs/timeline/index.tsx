import { useState, useEffect, useRef } from 'react'
import { useSkips } from '../../common/hooks/useSkips'
import type { SkipOption } from '../../common/types/skip'
import TimelineCard from './components/TimelineCard'
import SelectedSkipSummary from './components/SelectedSkipSummary'
import SkipComparisonModal from './components/SkipComparisonModal'
import HelpChatBot from '../../common/components/HelpChatBot'

const TimelineDesign = () => {
  const { skips, loading, error } = useSkips()
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null)
  const [activeSize, setActiveSize] = useState<number | null>(null)
  const [isComparing, setIsComparing] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (skips.length > 0 && !activeSize) {
      setActiveSize(skips[0].size)
    }
  }, [skips, activeSize])

  useEffect(() => {
    if (selectedSkip && timelineRef.current) {
      const el = document.getElementById(`skip-${selectedSkip.id}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [selectedSkip])

  const handleSelect = (skip: SkipOption) => {
    setSelectedSkip(prev =>
      prev?.id === skip.id ? null : skip
    )
  }

  if (error)
    return (
      <div className="text-alert-600 text-center py-20">
        Error: {error}
      </div>
    )

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="pt-12 pb-8 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6 text-center ">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              Choose Your Skip Size
            </h1>
            <p className="text-muted max-w-2xl">
              Select the perfect skip for your garden waste. Compare sizes, prices, and environmental impact.
            </p>
          </div>
        </div>
      </header>

      <main className={`px-4 max-w-6xl mx-auto ${selectedSkip ? 'pb-54' : 'pb-20'}`}>
        <div className="relative mt-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-primary-400" />

          <div ref={timelineRef} className="relative">
            {skips.map((skip, index) => (
              <div
                key={skip.id}
                id={`skip-${skip.id}`}
                className={`relative flex justify-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-background z-10" />
                <TimelineCard
                  skip={skip}
                  position={index % 2 === 0 ? 'right' : 'left'}
                  isActive={activeSize === skip.size}
                  isSelected={selectedSkip?.id === skip.id}
                  onSelect={() => handleSelect(skip)}
                  onHover={() => {
                    if (!isComparing) {
                      setActiveSize(skip.size)
                    }
                  }}
                />
              </div>
            ))}
          </div>
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
      <div className="fixed bottom-0 left-0 w-full h-[63px] bg-card-light-secondary sm:hidden z-100" />
    </div>
  )
}

export default TimelineDesign
