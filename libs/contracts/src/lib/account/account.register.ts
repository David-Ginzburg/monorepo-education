export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    email: string | undefined;
    password: string | undefined;
    displayName?: string;
  }

  export class Response {
    email: string | undefined;
  }
}
