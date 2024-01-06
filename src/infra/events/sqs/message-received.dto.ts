import { SqsMessageReceived } from '../../../domain/contracts/infra-layer/events/sqs-message-received';

export class MessageReceivedDto<T> implements SqsMessageReceived {
  Body: string;
  MessageId: string;
  ReceiptHandle: string;

  constructor(message: SqsMessageReceived) {
    this.Body = message.Body;
    this.MessageId = message.MessageId;
    this.ReceiptHandle = message.ReceiptHandle;
  }

  toDto(): T {
    const parsedBody = JSON.parse(this.Body) as T;

    return parsedBody;
  }
}
