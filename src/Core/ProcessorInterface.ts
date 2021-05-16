export interface ProcessorInterface {
  getCommandName: ()=> string,
  getCommandDescription: ()=> string,
  respondToCommand: (body: string)=> Promise<string>,
}
