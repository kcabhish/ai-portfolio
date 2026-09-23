import { chatConfig } from './config.ts';

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) return false;
  const { role, content } = value as Record<string, unknown>;
  return (role === 'user' || role === 'assistant') && typeof content === 'string';
}

/**
 * Normalizes untrusted conversation history: keeps only user/assistant turns, trims and caps
 * each message, keeps the most recent turns, and requires the conversation to end with a
 * question. Returns `null` when nothing usable remains.
 */
export function sanitizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;

  const messages = input
    .filter(isChatMessage)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, chatConfig.maxMessageLength),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-chatConfig.maxHistory);

  while (messages[0]?.role === 'assistant') messages.shift();

  return messages.at(-1)?.role === 'user' ? messages : null;
}
