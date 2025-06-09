import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  AlertTriangle,
} from 'lucide-react'
import type { SkipOption } from '../../../common/types/skip'
import GridCardDetails from './GridCardDetails'

interface GridSkipCardProps {
  skip: SkipOption
  isActive: boolean
  isSelected: boolean
  onSelect: () => void
  onHover: () => void
}

const GridSkipCard: React.FC<GridSkipCardProps> = ({
  skip,
  isActive,
  isSelected,
  onSelect,
  onHover,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const totalPrice = skip.priceBeforeVat * (1 + skip.vat / 100)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onEnter = () => el.classList.add('ring-2', 'ring-primary-400/50')
    const onLeave = () => el.classList.remove('ring-2', 'ring-primary-400/50')
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={onHover}
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        relative cursor-pointer overflow-visible rounded-md border transition-all
        ${isSelected
          ? 'border-primary-500 shadow-xl'
          : isActive
            ? 'border-primary-300 shadow-lg'
            : 'border-border/60 hover:shadow-lg'}
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative z-10">
        {/* Image */}
        <div className="relative h-48 w-full overflow-visible">
          <img
            src={skip.imageUrl}
            alt={`${skip.size} Yard Skip`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Size badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 
                   flex items-center justify-center shadow-primary-500/50 rounded-lg">
              <span className="text-xs md:text-[15px] font-bold text-text-secondary p-2">
                {skip.size} yards
              </span>
              {!skip.allowedOnRoad && (
                <div
                  className="absolute -top-2 -right-2 bg-alert-500 text-gray-900 rounded-full p-1 shadow-lg"
                  title="Not allowed on road"
                >
                  <AlertTriangle size={12} strokeWidth={2.5} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price & Details toggle */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 items-baseline gap-4 py-2">
            {/* price */}
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-3xl font-bold text-transparent">
                £{totalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted">inc. VAT</span>
            </div>

            {/* days-hire badge */}
            <span className="justify-self-end inline-flex items-center gap-1 rounded-full bg-card-light-secondary dark:bg-card-dark-secondary px-3 py-1 text-sm font-medium text-muted">
              <Calendar size={14} />
              {skip.hirePeriodDays} day{skip.hirePeriodDays > 1 ? 's' : ''} hire
            </span>
          </div>

          {/* Details */}
          <GridCardDetails
            skip={skip}
            isSelected={isSelected}
            onSelect={onSelect}
          />
        </div>
      </div>

    </motion.div>
  )
}

export default GridSkipCard
