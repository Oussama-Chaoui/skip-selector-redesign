import { useState, type JSX } from 'react'
import Chatbot, { createChatBotMessage } from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import {
  MessageCircle,
  X,
  Leaf,
  TreePine,
  LandPlot,
  Trash2,
  Weight,
  Hammer,
  RotateCcw,
  CalendarDays,
  Check,
  XIcon,
  Waypoints,
  AlertTriangle,
} from 'lucide-react'
import type { SkipOption } from '../types/skip'
import type { BotState } from '../types/BotState'
import '../styles/bot.css'

const volumeMap: Record<string, number> = {
  '1 – 5 bags': 4,
  '6 – 10 bags': 6,
  '11 – 15 bags': 8,
  '16+ bags': 10,
}

const wasteIcons: Record<string, JSX.Element> = {
  Leaves: <Leaf size={16} className="mr-1.5" />,
  Grass: <Leaf size={16} className="mr-1.5" />,
  Branches: <TreePine size={16} className="mr-1.5" />,
  Soil: <LandPlot size={16} className="mr-1.5" />,
}

interface Props { skips: SkipOption[] }

interface RecommendationPayload {
  pick: SkipOption;
  note: string;
}

const RecommendationWidget = ({ payload }: { payload: RecommendationPayload }) => {
  const { pick, note } = payload;
  const price = (pick.priceBeforeVat * (1 + pick.vat / 100)).toFixed(2);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-heading leading-tight">
            {pick.size}-Yard Skip
          </h3>
          <p className="text-muted text-xs">Recommended for you</p>
        </div>
        <span className="text-text font-medium text-center bg-primary-300/50 -mr-2 ml-2 p-1 rounded-md text-xs">
          £{price} incl VAT
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Size:</span>
          <span>{pick.size} yd</span>
        </div>
        <div className="flex justify-between">
          <span>Hire:</span>
          <span>{pick.hirePeriodDays} days</span>
        </div>
        <div className="flex justify-between">
          <span>Heavy waste:</span>
          <span>{pick.allowsHeavyWaste ? '✔' : '✖'}</span>
        </div>
        <div className="flex justify-between">
          <span>Road-legal:</span>
          <span>{pick.allowedOnRoad ? '✔' : '✖'}</span>
        </div>
      </div>

      {/* Warning */}
      {note && (
        <div className="bg-alert-500/30 border border-alert-500/30 rounded-md p-1 flex items-start gap-1 text-[0.6rem]">
          <AlertTriangle size={14} className="text-alert-600 mt-0.5" strokeWidth={2} />
          <div>
            <div className="font-medium text-alert-700">Permit required</div>
            <p className="text-alert-700/80">{note.replace(/\*/g, '')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HelpChatBot({ skips }: Props) {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(0)

  /* widgets (buttons) */
  const WasteOptions = ({ actionProvider }: any) => (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {Object.entries(wasteIcons).map(([label, icon]) => (
        <button
          key={label}
          onClick={() => actionProvider.qWaste(label)}
          className="px-3 py-2 bg-card-light dark:bg-card-dark border
                     border-border dark:border-border-dark rounded-lg
                     hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary
                     flex items-center justify-center">
          {icon}{label}
        </button>
      ))}
    </div>
  )

  const VolumeOptions = ({ actionProvider }: any) => (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {Object.keys(volumeMap).map(range => (
        <button
          key={range}
          onClick={() => actionProvider.qVolume(range)}
          className="px-3 py-2 bg-card-light dark:bg-card-dark border
                     border-border dark:border-border-dark rounded-lg
                     hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary
                     flex items-center justify-center">
          <Trash2 size={16} className="mr-1.5" />{range}
        </button>
      ))}
    </div>
  )

  const HeavyOptions = ({ actionProvider }: any) => (
    <div className="flex flex-col gap-2 mt-3">
      <p className="text-xs text-muted">
        Heavy waste = bricks, concrete, soil. Mixed loads cost more and need a skip that supports the weight.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => actionProvider.qHeavy(true)}
          className="flex-1 px-3 py-2 bg-card-light dark:bg-card-dark border
                     border-border dark:border-border-dark rounded-lg
                     hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary
                     flex items-center justify-center">
          <Weight size={16} className="mr-1.5" />Yes
        </button>
        <button
          onClick={() => actionProvider.qHeavy(false)}
          className="flex-1 px-3 py-2 bg-card-light dark:bg-card-dark border
                     border-border dark:border-border-dark rounded-lg
                     hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary
                     flex items-center justify-center">
          <Hammer size={16} className="mr-1.5" />No
        </button>
      </div>
    </div>
  )

  const RoadOptions = ({ actionProvider }: any) => (
    <div className="flex flex-col gap-2 mt-3">
      <p className="text-xs text-muted">
        Skips on public roads need a council permit (≈ £30-£80) and must be road-legal sizes (4-8 yd).
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => actionProvider.qRoad(true)}
          className="flex-1 px-3 py-2 bg-card-light dark:bg-card-dark border
                     border-border dark:border-border-dark rounded-lg
                     hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary">
          On the road
        </button>
        <button
          onClick={() => actionProvider.qRoad(false)}
          className="flex-1 px-3 py-2 bg-card-light dark:bg-card-dark border
                     border-border dark:border-border-dark rounded-lg
                     hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary">
          Private land
        </button>
      </div>
    </div>
  )

  /* chatbot config */
  const config = {
    botName: 'SkipBuddy',
    initialMessages: [
      createChatBotMessage('Hi 👋 I’m SkipBuddy. Let’s find the right skip! What garden waste do you have?', { widget: 'wasteOptions' }),
    ],
    widgets: [
      {
        widgetName: 'wasteOptions',
        widgetFunc: WasteOptions,
        props: {},
        mapStateToProps: []
      },
      {
        widgetName: 'volumeOptions',
        widgetFunc: VolumeOptions,
        props: {},
        mapStateToProps: []
      },
      {
        widgetName: 'heavyOptions',
        widgetFunc: HeavyOptions,
        props: {},
        mapStateToProps: []
      },
      {
        widgetName: 'roadOptions',
        widgetFunc: RoadOptions,
        props: {},
        mapStateToProps: []
      },
      {
        widgetName: 'recommendation',
        widgetFunc: RecommendationWidget,
        props: {},
        mapStateToProps: ['skipList']
      },
    ],
    customComponents: {
      header: () => (
        <div className="flex justify-between items-center p-4 border-b
                        border-border dark:border-border-dark bg-card-light dark:bg-card-dark">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <MessageCircle size={16} className="text-text-secondary" />
            </div>
            <h3 className="font-bold text-heading">SkipBuddy</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setKey(k => k + 1)} title="Restart" className="p-1 rounded-full hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary">
              <RotateCcw size={18} className="text-muted" />
            </button>
            <button onClick={() => setOpen(false)} title="Close" className="p-1 rounded-full hover:bg-card-light-secondary dark:hover:bg-card-dark-secondary">
              <X size={18} className="text-muted" />
            </button>
          </div>
        </div>
      ),
    },
  }

  /* provider / parser */
  class MessageParser { parse() { } }

  class ActionProvider {
    private createMsg: typeof createChatBotMessage
    private setState: React.Dispatch<React.SetStateAction<BotState>>
    private skips: SkipOption[]

    constructor(
      createBotMessage: typeof createChatBotMessage,
      setStateFunc: React.Dispatch<React.SetStateAction<BotState>>
    ) {
      this.createMsg = createBotMessage
      this.setState = setStateFunc
      this.skips = skips
    }

    qWaste(label: string) {
      const msg = this.createMsg(
        `Great – ${label}. About how many bags or barrow loads?`,
        { widget: 'volumeOptions' }
      )
      this.setState(prev => ({
        ...prev,
        wasteType: label,
        messages: [...prev.messages, msg]
      }))
    }


    qVolume(range: string) {
      const nums = range.match(/\d+/g)
      const count = nums ? Number(nums.pop()) : 0

      const msg = this.createMsg(
        `Got it – ${range}. Any heavy waste?`,
        { widget: 'heavyOptions' }
      )
      this.setState(prev => ({
        ...prev,
        bagCount: count,
        messages: [...prev.messages, msg]
      }))
    }

    qHeavy(isHeavy: boolean) {
      const msg = this.createMsg(
        `Understood. Where will you place the skip?`,
        { widget: 'roadOptions' }
      )
      this.setState(prev => ({
        ...prev,
        heavy: isHeavy,
        messages: [...prev.messages, msg]
      }))
    }

    qRoad(onRoad: boolean) {
      this.setState(prev => {
        const bagCount = prev.bagCount ?? 0
        const heavy = prev.heavy ?? false

        // needed size from bagCount
        const needed =
          bagCount <= 5 ? 4 :
            bagCount <= 10 ? 6 :
              bagCount <= 15 ? 8 : 10

        // filter by heavy & road
        let pool = this.skips.filter(s =>
          (!heavy || s.allowsHeavyWaste) &&
          (!onRoad || s.allowedOnRoad)
        )

        let note = ''
        if (pool.length === 0 && onRoad) {
          note = ' *(permit required – none of those sizes are road-legal)*'
          pool = this.skips.filter(s => !heavy || s.allowsHeavyWaste)
        }

        // pick smallest >= needed, else largest
        pool.sort((a, b) => a.size - b.size)
        let pick = pool.find(s => s.size >= needed) ?? pool[pool.length - 1]

        if (onRoad && pick.size < needed) {
          note = ' *(permit likely required – larger skip needs private land)*'
          const fallback = this.skips
            .filter(s => !heavy || s.allowsHeavyWaste)
            .find(s => s.size >= needed)
          if (fallback) pick = fallback
        }

        const price = (pick.priceBeforeVat * (1 + pick.vat / 100)).toFixed(2);

        const recommendation = (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-heading leading-tight">
                  {pick.size}-Yard Skip
                </h3>
                <p className="text-muted text-xs">Recommended for you</p>
              </div>
              <span className="text-text font-medium text-center bg-primary-300/50 -mr-2 ml-2 p-1 rounded-md text-xs">
                £{price} incl VAT
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Trash2 size={14} className="text-primary-700" />
                  <span className="text-xs text-muted">Size</span>
                </div>
                <span className="font-medium text-sm">{pick.size} yd</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-primary-700" />
                  <span className="text-xs text-muted">Hire Period</span>
                </div>
                <span className="font-medium text-sm">{pick.hirePeriodDays} days</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Weight size={14} className="text-primary-700" />
                  <span className="text-xs text-muted">Heavy Waste</span>
                </div>
                <span className="font-medium text-sm flex items-center gap-1">
                  {pick.allowsHeavyWaste ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <XIcon size={14} className="text-red-500" />
                  )}
                  {pick.allowsHeavyWaste ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Waypoints size={14} className="text-primary-700" />
                  <span className="text-xs text-muted">Road Legal</span>
                </div>
                <span className="font-medium text-sm flex items-center gap-1">
                  {pick.allowedOnRoad ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <XIcon size={14} className="text-red-500" />
                  )}
                  {pick.allowedOnRoad ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {note && (
              <div className="bg-alert-500/30 border border-alert-500/30 rounded-md p-1 flex items-start gap-1">
                <AlertTriangle
                  size={14}
                  className="text-alert-600 mt-0.5 flex-shrink-0"
                  strokeWidth={2}
                />
                <div>
                  <div className="text-xs font-medium text-alert-700">
                    Permit required
                  </div>
                  <p className="text-[0.6rem] text-alert-700/80 mt-0.5">
                    {note.replace(/\*/g, "")}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

        const msg = this.createMsg(recommendation as any, {})

        return {
          ...prev,
          messages: [...prev.messages, msg]
        }
      })
    }
  }

  /* render */
  return (
    <div className="fixed bottom-2 right-4 z-[1000] flex flex-col items-end sm:top-16">
      {open && (
        <div className="w-full max-w-sm h-[70vh] max-h-[429px] 
                      bg-card-light dark:bg-card-dark rounded-xl shadow-lg 
                      overflow-hidden border border-border dark:border-border-dark 
                      flex flex-col mb-2">
          <Chatbot key={key} config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className="p-3 rounded-full shadow-lg bg-card-light dark:bg-card-dark
                  hover:opacity-90"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  )
}
