import {ProcessedMessage} from '@/Core/MessageHandler';

export interface ProcessorInterface {
  getCommandName: ()=> string,
  getCommandDescription: ()=> string,
  respondToCommand: (body: string, extra: any)=> Promise<ProcessedMessage>,
}
