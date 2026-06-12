export interface MessageRecord {
  _id: string;
  sender: string;
  receiver: string;
  msgType: string;
  content: string;
  body: Record<string, unknown>;
  createdAt: string;
}

export { getMessages as fetchMessages } from '@/lib/get-messages';

export function formatMessageDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleString();
}
