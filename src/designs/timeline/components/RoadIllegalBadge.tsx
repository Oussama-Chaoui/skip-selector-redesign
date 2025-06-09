import React from 'react'
import { AlertTriangle } from 'lucide-react'

const RoadIllegalBadge: React.FC = () => (
  <span
    className="
      inline-flex items-center gap-1
      bg-alert-500/10 border border-alert-500/30
      px-2 py-1 rounded-full
    "
  >
    <AlertTriangle className="h-3 w-3 text-alert-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
    <span className='text-xs text-alert-600'>
      Road Illegal
    </span>
  </span>
)



export default RoadIllegalBadge
