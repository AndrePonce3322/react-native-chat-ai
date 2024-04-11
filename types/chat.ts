export interface ChatAI {
  response_id:  string;
  text:         string;
  generationId: string;
  chatHistory:  ChatHistory[];
  finishReason: string;
  meta:         Meta;
  documents:    any[];
}

export interface ChatHistory {
  role:    Role;
  message: string;
}

export enum Role {
  Chatbot = "CHATBOT",
  User = "USER",
}

export interface Meta {
  apiVersion:  APIVersion;
  billedUnits: BilledUnits;
  tokens:      BilledUnits;
}

export interface APIVersion {
  version: string;
}

export interface BilledUnits {
  inputTokens:  number;
  outputTokens: number;
}