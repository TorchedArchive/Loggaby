declare module 'loggaby' {
  interface LoggabyLevel {
    /** Whether to make the level name and message bold and underline (to be noticeable). */
    fatal?: boolean;

    /** Whether this level will be hidden when <code>options.debug</code> is false. */
    debug?: boolean;

    /** Color of the level name. Accepted values are hex or {@link https://github.com/Luvella/AnsiKit#colors named colors}. */
    color: string;

    /** Name to use as the function call. */
    call?: string;

    /** Name of the level that appears in the logs. */
    name: string;
  }

  interface Options {
    /** Transports to post logs to. */
    transports?: Transport[];

    /** Logging levels to provide. */
    levels?: LoggabyLevel[];

    /** Format for how logs should look */
    format?: string;

    /** Whether to post debug logs. Can be a boolean or `'auto'` */
    debug?: boolean | 'auto';
  }

  export const levels: {
    [x in 'log' | 'debug' | 'error' | 'fatal' | 'warn']: LoggabyLevel;
  };

  /** The base transport class. */
  export abstract class Transport {
    /**
     * Creates a new transport.
     * @param options Options for the Transport
     */
    constructor(options?: { color?: boolean; });

    /**
     * Posts content to the transport.
     * @param args Any additional arguments to pass in
     */
    public abstract transmit(...args: any[]): void;
  }

  /** A terminal Transport, to post logs to your terminal. */
  export const TerminalTransport: new (options?: { color?: boolean; }) => Transport;

  class LoggabyInstance {
    constructor(options?: Options);

    public transports: Transport[];
    public options: Options;
    public format: string;
  }

  type LogFunction = (...message: unknown[]) => void;
  type LoggabyConstructor = new <L extends string = keyof typeof levels>(options?: Options) => LoggabyInstance & Record<L, LogFunction> & Record<keyof typeof levels, LogFunction>;

  const Loggaby: LoggabyConstructor;
  export default Loggaby;
}
