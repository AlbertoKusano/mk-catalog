export interface SqsMessageReceived {
  Body: string;
  MessageId: string;
  ReceiptHandle: string;
}
