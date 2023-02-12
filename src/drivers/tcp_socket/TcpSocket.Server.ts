import SETUP from 'config/setup.ts';
import { Bus, TOPICS } from 'domain/Bus/Bus.Entity.ts';
import { bgRed, blue, green, yellow } from 'fmt/colors.ts';
import { Client, Event, Packet, Server } from 'tcp_socket';
import { appLogger } from 'utils/AppLogger.ts';

let _server: Server;

export class TcpSocketServer {
	private readonly _hostname: string;
	private readonly _port: number;
	private bus: Bus;

	constructor() {
		this._hostname = SETUP.IXLA_HOSTNAME;
		this._port = Number(SETUP.IXLA_PORT);
		this.bus = Bus.makeUnique();
		_server = new Server({
			hostname: this._hostname,
			port: this._port,
		});
	}

	async on() {
		this.bus.subscribe(TOPICS.WriteTheMessage, function (msg: string) {
			msg = msg.trim() + '\n';
			_server.broadcast(msg);
		});
		await this.handleConnect();
	}

	private handleListen(server: Server) {
		server.on(Event.listen, (server: Deno.Listener) => {
			const addr = server.addr as Deno.NetAddr;
			console.log(
				`${green('tcp server listen')} ${addr.hostname}:${addr.port}`,
			);
		});
	}

	private handleClientConnect(server: Server) {
		server.on(Event.connect, (client: Client) => {
			appLogger(
				`${yellow('*')} new client connected`,
				client.info(),
			);
		});
	}

	private handleMessage(server: Server) {
		server.on(
			Event.receive,
			(_client: Client, data: Packet, _length: number) => {
				let msg = data.toString();
				// server.broadcast('oi');

				if (msg.endsWith('\n')) {
					msg = msg.trim();
					this.bus.publish(TOPICS.receivedCmd, msg);
					appLogger(
						`${yellow('->')} ${
							green(msg.slice(0, SETUP.IXLA_LOG_MESSAGES_LENGTH))
						}`,
					);
				}
			},
		);
	}

	handleClientClose(server: Server) {
		server.on(Event.close, (client: Client) => {
			appLogger(
				`${yellow('*')} client close`,
				client.info(),
			);
		});
	}

	handleShutdown(server: Server) {
		server.on(Event.shutdown, () => {
			appLogger(
				`${yellow('*')} sever is shutdown`,
			);
		});
	}

	handleError(server: Server) {
		server.on(Event.error, (e) => {
			appLogger(
				`${bgRed('*')} error`,
				e,
			);
			this.handleConnect();
		});
	}

	async handleConnect() {
		// console.log(_server.listenerCount(Event.receive));
		_server.removeAllListeners();
		// _server.setMaxListeners(1);
		// _server.off(Event.receive, this.handleClose);
		// console.log(_server.listenerCount(Event.receive));

		this.handleListen(_server);
		this.handleShutdown(_server);
		this.handleClientConnect(_server);
		this.handleMessage(_server);
		this.handleError(_server);
		// this.handleClose(_server);
		if (!_server.isOpen) {
			await _server.listen();

			console.log(
				blue(
					`conectado a ixla - ${SETUP.IXLA_HOSTNAME}:${SETUP.IXLA_PORT}`,
				),
			);
		}
	}

	static async makeUnique(): Promise<TcpSocketServer> {
		if (!UNIQUE_INSTANCE) {
			UNIQUE_INSTANCE = new TcpSocketServer();
			await UNIQUE_INSTANCE.on();
		}
		return UNIQUE_INSTANCE;
	}
}

let UNIQUE_INSTANCE: TcpSocketServer | undefined = undefined;
