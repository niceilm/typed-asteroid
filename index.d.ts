declare module 'asteroid' {
  import EventEmitter = NodeJS.EventEmitter;

  interface AsteroidClass extends EventEmitter {
    // ddp mixin
    connect(): void;

    disconnect(): void;

    /**
     * event
     * - connected
     * - disconnected
     * - loggedIn
     * - loggedOut
     */
    ddp: EventEmitter;

    // method mixin
    call(method: string, ...params: any[]): Promise<any>;

    apply(method: string, params: any[]): Promise<any>;

    subscribe(publishName: string, ...params: any[]): SubscribeHandleEventEmitter;

    unsubscribe(id: string): void;

    // password-login mixin
    createUser(options: UserOptions): Promise<string>;

    loginWithPassword(options: UserOptions): Promise<string>;

    // login mixin
    login(params: UserOptions): Promise<string>;

    logout(): Promise<string>;
    loggedIn: boolean;
    userId: string;
  }

  interface SubscribeHandleEventEmitter extends EventEmitter {
    id: string;
    fingerprint: string;
    name: string;
    params: any[];
    stillInQueue: boolean;
  }

  interface UserOptions {
    username?: string;
    email?: string;
    password: string;
  }

  interface AsteroidOption {
    endpoint: string;
    SocketConstructor?: Function;
    autoConnect?: boolean; // default true
    autoReconnect?: boolean; // default true
    reconnectInterval?: number; // default 10000
  }

  interface AsteroidStatic {
    new(options: AsteroidOption): AsteroidClass;
  }

  function createClass(customMixins?: any[]): AsteroidStatic;
}