import React from 'react'
import { Check } from 'lucide-react'

const RoadLegalBadge: React.FC = () => (
  <span
    className="
      inline-flex items-center gap-1
      bg-accent-500/10 border border-accent-500/30
      px-2 py-1 rounded-full
    "
  >
    <Check
      className="h-3 w-3 text-accent-500 mt-0.5 flex-shrink-0"
      strokeWidth={2}
    />
    <span className="text-xs text-accent-600">
      Road Legal
    </span>
  </span>
)

export default RoadLegalBadge
