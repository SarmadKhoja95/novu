import { Injectable } from '@nestjs/common';
import { LogEntity, LogRepository } from '@novu/dal';
import { CreateLogCommand } from './create-log.command';

@Injectable()
export class CreateLog {
  constructor(private logRepository: LogRepository) {}

  async execute(command: CreateLogCommand): Promise<LogEntity> {
    let rawData: string | null = null;
    if (command.raw) {
      try {
        rawData = JSON.stringify(command.raw);
      } catch (error) {
        console.error('Parsing raw data when creating a log failed', error);
      }
    }

    //
    return await this.logRepository.create({
      _environmentId: command.environmentId,
      transactionId: command.transactionId,
      _organizationId: command.organizationId,
      _notificationId: command.notificationId,
      _messageId: command.messageId,
      _subscriberId: command.subscriberId,
      status: command.status,
      text: command.text,
      code: command.code,
      raw: rawData,
    });
  }
}
