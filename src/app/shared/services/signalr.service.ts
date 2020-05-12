import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@aspnet/signalr';
import { Observable } from 'rxjs';

export abstract class SignalrService {

  private connection: HubConnection;
  private connected = false;
  private connecting = false;
  private closed = false;

  protected abstract get hubUrl(): string;

  constructor() { }

  protected abstract getAuthorizationHeaderValue(): string;

  private creteConnection(): HubConnection {

    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => this.getAuthorizationHeaderValue()
    };

    const hub = new HubConnectionBuilder()
      .withUrl(this.hubUrl, options)
      .build();

    return hub;
  }

  private connect(): Promise<HubConnection> {

    return new Promise((resolve, reject) => {

      const checkConnecting = () => {
        if (this.connecting) {
          window.setTimeout(checkConnecting, 100); /* this checks the flag every 100 milliseconds*/
        } else {
          if (!this.connected) {
            console.log('Connecting...');
            this.connecting = true;
            this.connection = this.creteConnection();

            this.connection.start()
              .then(() => {
                console.log('Connected!');
                this.connecting = false;
                this.connected = true;
                resolve(this.connection);
              })
              .catch((err) => {
                console.log('Error to connect! ', err);
                this.connecting = false;
                reject(err);
              });

            this.connection.onclose(() => {
              if (!this.closed) {
                console.log('Reconnecting...');
                this.connect();
              }
            });
          } else {
            resolve(this.connection);
          }
        }
      };

      checkConnecting();
    });
  }

  disconnect(): void {
    if (this.connected) {
      this.connection.stop()
        .then(() => {
          console.log('Disconnected!');
          this.closed = true;
        })
        .catch(err => console.log('Error to disconnect.', err));
    }
  }

  protected listen<T>(event: string, handler: (...args: any[]) => T): Observable<T> {
    return new Observable<T>(observer => {
      this.connect()
        .then(() => {
          this.connection.on(event, (...args: any[]) => {
            observer.next(handler(...args));
          });
        });
    });
  }
}
