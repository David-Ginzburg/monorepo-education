export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    email: string | undefined;
    password: string | undefined;
  }

  export class Response {
    access_token: string | undefined;
  }
}
