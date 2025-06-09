import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RoadLegalBadge from './RoadLegalBadge'
import RoadIllegalBadge from './RoadIllegalBadge'
import type { SkipOption } from '../../../common/types/skip'

interface Props {
  selectedSkip: SkipOption | null
  onCompare: () => void
  onChangeSelection: () => void
}

const SelectedSkipSummary: React.FC<Props> = ({
  selectedSkip,
  onCompare,
  onChangeSelection,
}) => {
  if (!selectedSkip) return null

  const price = (selectedSkip.priceBeforeVat * (1 + selectedSkip.vat / 100)).toFixed(2)

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-x-0
          bottom-[52px]     /* sit 52px above bottom on mobile */
          sm:bottom-0       /* reset to 0 on ≥sm */
          w-full px-3 py-3
          bg-card-light-secondary backdrop-blur-sm
          overflow-hidden z-[60] border-t border-primary-200
          md:px-2 md:pb-2
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="md:p-6">
          <div className="flex items-center justify-between gap-3 mb-2 md:mb-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-heading md:text-xl">
                {selectedSkip.size}YD
              </h3>
              {selectedSkip.allowedOnRoad
                ? <RoadLegalBadge />
                : <RoadIllegalBadge />
              }
            </div>

            <div className="flex flex-col items-end">
              <div className="text-lg font-bold text-accent-500 md:text-2xl">
                £{price}
              </div>
              <div className="text-xs text-primary-500">
                Includes VAT · {selectedSkip.hirePeriodDays} days hire
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 md:hidden">
            <button
              onClick={onCompare}
              className="
                px-3 py-2 bg-card-light text-text text-xs
                font-medium rounded-lg border border-border
                hover:bg-card-light-secondary transition
              "
            >
              Compare
            </button>
            <button
              onClick={onChangeSelection}
              className="px-3 py-2 text-muted hover:text-text text-xs"
            >
              Change
            </button>
            <button
              className="
                col-span-2 px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 shadow-sm shadow-primary-600/30
                text-text-secondary font-medium rounded-lg transition text-xs
              "
            >
              Continue to Booking
            </button>
          </div>

          <div className="hidden md:flex md:flex-wrap md:gap-3 md:mt-5">
            <button
              onClick={onCompare}
              className="px-5 py-2 bg-card-light text-text font-medium rounded-lg border border-border hover:bg-card-light-secondary text-sm"
            >
              Compare Sizes
            </button>
            <button
              className="px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-text-secondary font-medium rounded-lg text-sm"
            >
              Continue to Booking
            </button>
            <button
              onClick={onChangeSelection}
              className="px-5 py-2 text-muted hover:text-text text-sm"
            >
              Change Selection
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SelectedSkipSummary
