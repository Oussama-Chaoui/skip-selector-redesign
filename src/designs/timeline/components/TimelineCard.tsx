import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SkipOption } from '../../../common/types/skip';
import {
  ArrowRight,
  AlertTriangle,
  Recycle
} from 'lucide-react';
import TimelineCardDetails from './TimelineCardDetails';

interface TimelineCardProps {
  skip: SkipOption;
  position: 'left' | 'right';
  isActive: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  skip,
  position,
  isActive,
  isSelected,
  onSelect,
  onHover,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const grossPrice = skip.priceBeforeVat * (1 + skip.vat / 100);

  return (
    <motion.div
      layout
      className={`w-full md:w-[480px] relative ${position === 'right' ? 'md:pr-8' : 'md:pl-8'}`}
      onMouseEnter={onHover}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* timeline connector */}
      <div
        className={`absolute top-10 bottom-10 w-0.5 bg-gradient-to-b 
          from-primary-500 to-primary-400
          ${position === 'right' ? 'md:right-0' : 'md:left-0'}`}
      />

      <div
        className={`
          border transition-colors duration-100 overflow-hidden
          relative bg-gradient-to-br from-primary-100 to-primary-200
          ${isSelected
            ? 'border-primary-400 shadow-md shadow-primary-500/30 ring-1 ring-primary-400/50'
            : isActive
              ? 'border-primary-400/60 shadow-md shadow-primary-500/20'
              : 'border-primary-300 shadow-md shadow-primary-500/10 '
          }
        `}
      >
        {/* eco-glow effect */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 via-primary-400/5 to-transparent pointer-events-none" />
        )}

        {/* Waste pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMSIgZmlsbD0iIzM4YjJhYyIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0iIzM4YjJhYyIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iOCIgcj0iMiIgZmlsbD0iIzM4YjJhYyIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMzAiIHI9IjEuMiIgZmlsbD0iIzM4YjJhYyIvPjwvc3ZnPg==')]" />

        {/* Header */}
        <div
          className={`
            p-4 md:p-5 flex items-center gap-3 md:gap-4 cursor-pointer relative
            ${position === 'right' ? 'flex-row-reverse text-right' : ''}
            ${isSelected
              ? 'bg-gradient-to-r from-primary-200/20 to-primary-200/20'
              : 'bg-background'
            }
          `}
          onClick={() => setShowDetails((v) => !v)}
        >
          {/* waste bubble */}
          <div className="relative">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-primary-500/50 rounded-lg">
              <span className="text-xl md:text-2xl font-bold text-text-secondary">{skip.size}</span>
              <span className="text-[10px] md:text-xs text-text-secondary ml-0.5">
                YD
              </span>

              <Recycle
                size={10}
                className="absolute bottom-1 right-1 text-text-secondary"
                strokeWidth={2.5}
              />
            </div>

            {!skip.allowedOnRoad && (
              <div
                className="absolute -top-2 -right-2 z-20 bg-alert-500 text-gray-900 rounded-full p-0.5 md:p-1 shadow-lg shadow-alert-500/30"
                title="Not allowed on road"
              >
                <AlertTriangle size={12} strokeWidth={2.5} />
              </div>
            )}
          </div>

          {/* Skip size and price details */}
          <div className={`flex-1 ${position === 'right' ? 'pr-1 md:pr-2' : 'pl-1 md:pl-2'}`}>
            <div className="flex items-start justify-between">
              <h3 className="text-base md:text-lg font-bold text-heading">
                {skip.size} Yard Skip
              </h3>
            </div>

            <div className="flex items-baseline gap-1 md:gap-2">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                £{grossPrice.toFixed(2)}
              </span>
              <span className="text-xs md:text-sm text-muted">
                (+VAT)
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 md:gap-2">
              <span className="text-[0.65rem] md:text-xs bg-gradient-to-r from-primary-300/20 to-primary-400/20 text-text border border-primary-400/30 px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                {skip.hirePeriodDays} day hire
              </span>

              {skip.allowsHeavyWaste && (
                <span className="text-[0.65rem] md:text-xs bg-gradient-to-r from-accent-600/30 to-accent-500/30 text-text border border-accent-500/30 px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                  Heavy waste
                </span>
              )}
            </div>
          </div>

          <motion.div
            className="shrink-0 text-primary-500"
            animate={{
              rotate: position === 'right'
                ? (showDetails ? -90 : 90)
                : (showDetails ? -90 : 90)
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight size={18} strokeWidth={2.5} className="md:hidden" />
            <ArrowRight size={22} strokeWidth={2.5} className="hidden md:block" />
          </motion.div>
        </div>

        {/* Details section */}
        <TimelineCardDetails
          skip={skip}
          isSelected={isSelected}
          show={showDetails}
          onSelect={onSelect}
        />
      </div>
    </motion.div>
  );
};

export default TimelineCard;