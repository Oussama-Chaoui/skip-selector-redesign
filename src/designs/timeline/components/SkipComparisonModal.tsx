import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RoadLegalBadge from './RoadLegalBadge'
import RoadIllegalBadge from './RoadIllegalBadge'
import type { SkipOption } from '../../../common/types/skip'
import { X } from 'lucide-react'

interface Props {
  isComparing: boolean
  filteredSkips: SkipOption[]
  selectedSkip: SkipOption | null
  onClose: () => void
  onSelect: (skip: SkipOption) => void
}

const SkipComparisonModal: React.FC<Props> = ({
  isComparing,
  filteredSkips,
  selectedSkip,
  onClose,
  onSelect,
}) => {

  useEffect(() => {
    if (isComparing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isComparing])

  return (
    <AnimatePresence>
      {isComparing && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg
                     z-9999 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="
              bg-card-light border border-border
              rounded-2xl w-full max-w-4xl max-h-[90vh]
              flex flex-col overflow-hidden
            "
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="sticky top-0 bg-card-light border-b border-border z-10 p-3 flex justify-between items-center">
              <h3 className="text-md font-bold text-heading">
                Compare Skip Sizes
              </h3>
              <button onClick={onClose} className="text-muted hover:text-text">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSkips.map(skip => {
                  const isSel = selectedSkip?.id === skip.id
                  return (
                    <div
                      key={skip.id}
                      className={`p-5 rounded-xl border ${isSel
                        ? 'border-accent-500 bg-accent-500/10'
                        : 'border-border bg-card-light-secondary'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-heading">
                          {skip.size}YD Skip
                        </h4>
                        <div className="text-xl font-bold text-accent-500">
                          £{(skip.priceBeforeVat * (1 + skip.vat / 100)).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {skip.allowedOnRoad ? <RoadLegalBadge /> : <RoadIllegalBadge />}
                      </div>
                      <div className="space-y-2 text-sm text-muted">
                        <div className="flex justify-between">
                          <span>Capacity:</span>
                          <span className="font-medium text-heading">{skip.size}YD</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hire Period:</span>
                          <span className="font-medium text-heading">
                            {skip.hirePeriodDays} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Waste Type:</span>
                          <span className="font-medium text-heading">
                            {skip.allowsHeavyWaste ? 'Heavy waste' : 'Light waste'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelect(skip)}
                        className={`mt-4 w-full py-2 rounded-lg font-medium ${isSel
                          ? 'bg-accent-500 text-text-secondary'
                          : 'bg-primary-500 hover:bg-primary-600 text-text-secondary'
                          }`}
                      >
                        {isSel ? '✓ Selected' : 'Select this Skip'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SkipComparisonModal
