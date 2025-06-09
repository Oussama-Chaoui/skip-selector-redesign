import React from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Truck,
  Weight,
  GaugeCircle,
  Check
} from 'lucide-react'
import type { SkipOption } from '../../../common/types/skip'

interface Props {
  skip: SkipOption
  isSelected: boolean
  onSelect: () => void
}

const GridCardDetails: React.FC<Props> = ({
  skip,
  isSelected,
  onSelect
}) => (
  <motion.div
    key={`details-${skip.id}`}
    initial={{ opacity: 0, height: 0 }}
    animate={{
      opacity: 1,
      height: 'auto',
      transition: {
        opacity: { duration: 0.1 },
        height: { duration: 0.1, ease: 'easeInOut' }
      }
    }}
    exit={{
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.1 },
        height: { duration: 0.1, ease: 'easeInOut' }
      }
    }}
    className="overflow-hidden"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="space-y-3 md:space-y-4 bg-transparent w-full"
    >
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <div className="flex items-center gap-1 md:gap-2">
          <div className="bg-primary-300/10 p-1 md:p-1.5 rounded-lg">
            <CalendarDays size={16} className="text-primary-500 md:size-[18px]" />
          </div>
          <div>
            <div className="text-[0.7rem] md:text-xs text-muted">Hire period</div>
            <div className="text-sm md:text-md text-heading font-medium">
              {skip.hirePeriodDays} days
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="bg-primary-300/10 p-1 md:p-1.5 rounded-lg">
            <Truck size={16} className="text-primary-500 md:size-[18px]" />
          </div>
          <div>
            <div className="text-[0.7rem] md:text-xs text-muted">Transport</div>
            <div className="text-sm md:text-md text-heading font-medium">
              {skip.transportCost != null
                ? `£${skip.transportCost.toFixed(2)}`
                : 'Included'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="bg-primary-300/10 p-1 md:p-1.5 rounded-lg">
            <Weight size={16} className="text-primary-500 md:size-[18px]" />
          </div>
          <div>
            <div className="text-[0.7rem] md:text-xs text-muted">Per tonne</div>
            <div className="text-sm md:text-md text-heading font-medium">
              {skip.perTonneCost != null
                ? `£${skip.perTonneCost.toFixed(2)}`
                : 'N/A'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="bg-primary-300/10 p-1 md:p-1.5 rounded-lg">
            <GaugeCircle size={16} className="text-primary-500 md:size-[18px]" />
          </div>
          <div>
            <div className="text-[0.7rem] md:text-xs text-muted">Waste type</div>
            <div className="text-sm md:text-md text-heading font-medium">
              {skip.allowsHeavyWaste ? 'Heavy allowed' : 'Standard only'}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        className={`
              mt-2 w-full py-2.5 md:py-3 font-semibold transition-all
              flex items-center justify-center gap-1 md:gap-2
              relative overflow-hidden group rounded-lg text-sm md:text-base
              cursor-pointer
              ${isSelected
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-text-secondary shadow-sm shadow-primary-500/30'
            : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-text-secondary shadow-sm shadow-primary-600/30'
          }
            `}
      >
        <span className="flex items-center gap-1">
          {isSelected && <Check size={18} className="shrink-0 md:size-5" />}
          {isSelected ? 'Selected' : 'Select Skip'}
        </span>
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      </button>
    </motion.div>
  </motion.div>
)

export default GridCardDetails
