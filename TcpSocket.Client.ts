import {
	Bus,
	TOPICS,
} from 'domain/Bus/Bus.Entity.ts';
import { cleanMSG } from 'driven/tcp_socket/cleanMSG.ts';
import {
	bgRed,
	blue,
	brightCyan,
	green,
	red,
	yellow,
} from 'fmt/colors.ts';
// ..import { Client, Event, Packet } from "tcp_socket"
import {
	Client,
	Event,
	Packet,
} from 'tcp_socket';
import {
	appLogger,
	setup,
	sleep,
} from 'utils';

let _client: Client;
let contSend = 0
let contReceive = 0
export class TcpSocketClient {
	private readonly _hostname: string;
	private readonly _port: number;
	// private _client: Client;
	private bus: Bus;
	private buffer: string[] = [];

	constructor() {
		this.bus = Bus.makeUnique();
		this._hostname = setup.IXLA_HOSTNAME();
		this._port = setup.IXLA_PORT();
		_client = new Client({
			hostname: this._hostname,
			port: this._port,
		});
		this.on();
	}

	private prepareMsg(msg: string) {
		// await this.connect();
		msg = msg.trim();
		this.buffer.push(msg);
		// _client.removeAllListeners();
		// console.log(_client.getMaxListeners());
		// await _client.connect();
		// this.buffer.shift() || msg;

		return (this.buffer.shift() || msg) + '\r\n';
	}

	private async send(msg: string) {
		if (Bus.itIsForMe('<command', msg) === 'no') return;
		msg = this.prepareMsg(msg);
		if (!_client.isOpen) {
			await this.handleConnect();
		}

		// if (!_client.isOpen) return;

		try {
			console.log(await _client.write(msg));
			contSend++
			console.log("contSend: " + blue(contSend.toString()));
			console.log("ouvinte: " + _client.listenerCount(Event.receive));

			appLogger(
				`${yellow('->')} ${blue(msg.slice(0, setup.IXLA_LOG_MESSAGES_LENGTH()))
				}`,
			);
		} catch (error) {
			appLogger(
				`${red('->')} ${bgRed(msg.slice(0, setup.IXLA_LOG_MESSAGES_LENGTH()))
				}`,
			);
			appLogger(red('erro ao enviar comando tcp !'), error);
		}
	}

	async on() {
		await this.handleConnect()
		this.bus.subscribe(
			TOPICS.WriteTheMessage,
			this.send.bind(this),
		);
	}

	private handleMessage(client: Client) {
		client.on(Event.receive, (_client: Client, data: Packet) => {
			const msg = data.toString();
			contReceive++
			console.log("contReceive: " + green(contReceive.toString()));

			const clean_msg = cleanMSG(msg);
			// console.log(blue(`client.on=${clean}`));

			this.bus.publish(TOPICS.MsgFromId5, data.toString());
			this.bus.publish(TOPICS.CleanMSGFromId5, clean_msg);
			appLogger(
				`${yellow('<-')} ${green(clean_msg.slice(0, setup.IXLA_LOG_MESSAGES_LENGTH()))
				}`,
			);
		});
	}

	private handleClose(client: Client) {
		client.on(Event.close, (_client: Client) => {
			appLogger('conexão tcp com a ixla encerrada!');
			// _client.removeAllListeners()
		});
	}

	private handleError(client: Client) {
		client.on(Event.error, async (e) => {
			appLogger(red('erro de  conexão tcp com a ixla!'), e);
			appLogger(
				brightCyan(
					`nova tentativa em ${setup.IXLA_RECONNECT()} ms | .env=IXLA_RECONNECT`,
				),
			);

			_client.close();

			// _client.removeAllListeners();
			await sleep(setup.IXLA_RECONNECT());
			// this.connect();
			await _client.connect();
		});
	}

	async handleConnect() {
		// console.log(_client.listenerCount(Event.receive));
		_client.removeAllListeners();
		// _client.setMaxListeners(1);
		// _client.off(Event.receive, this.handleClose);
		// console.log(_client.listenerCount(Event.receive));

		this.handleMessage(_client);
		this.handleClose(_client);
		this.handleError(_client);
		if (!_client.isOpen) {
			await _client.connect();
			console.log(
				blue(
					`conectado a ixla - ${setup.IXLA_HOSTNAME()}:${setup.IXLA_PORT()}`,
				),
			);
		}
	}

	// async connect() {
	// 	this.handleMessage(_client);
	// 	this.handleClose(_client);
	// 	this.handleError(_client);

	// 	await _client.connect();

	// 	// await this.send('<command name="reset" />' + '\r\n');
	// 	// await _client.write('<command name="reset" />' + '\r\n');

	// 	// this.bus.publish(TOPICS.SendCmd, "Hello World!")
	// 	// this.bus.publish(TOPICS.WriteTheMessage, '<command name=reset />');
	// }

	static async makeUnique(): Promise<TcpSocketClient> {
		if (!UNIQUE_INSTANCE) {
			UNIQUE_INSTANCE = new TcpSocketClient();
			await UNIQUE_INSTANCE.on();
		}
		return UNIQUE_INSTANCE;
	}
}

let UNIQUE_INSTANCE: TcpSocketClient | undefined = undefined;
