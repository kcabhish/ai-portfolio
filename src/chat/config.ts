/** Shared by the browser client and the dev/preview server proxy, so it must stay Node-safe. */
export const chatConfig = {
  assistantName: 'Virtual KC',
  model: 'gpt-5.6-luna',
  /** Path under the site base where the local server proxy listens. */
  proxyPath: 'api/virtual-kc',
  openAiUrl: 'https://api.openai.com/v1/chat/completions',
  openAiModelsUrl: 'https://api.openai.com/v1/models',
  /** Conversation turns sent per request; older turns are dropped. */
  maxHistory: 12,
  maxMessageLength: 1000,
  maxOutputTokens: 700,
} as const;
