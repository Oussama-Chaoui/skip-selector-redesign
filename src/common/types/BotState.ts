import type { createChatBotMessage } from "react-chatbot-kit"

type ChatbotMessage = ReturnType<typeof createChatBotMessage>

export interface BotState {
  messages: ChatbotMessage[]
  wasteType?: string
  bagCount?: number
  heavy?: boolean
}