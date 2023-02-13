import SETUP, { CMD_SETUP } from 'config/setup.ts';
import { Bus, TOPICS } from 'domain/Bus/Bus.Entity.ts';

export class Core {
	private _bus: Bus;
	private _cmd: CMD_SETUP[];

	constructor() {
		this._bus = Bus.makeUnique();
		this._cmd = SETUP.commands;
		this._bus.subscribe(
			TOPICS.receivedCmd,
			(msg: string) => this.exec(msg),
		);
	}

	exec(msg: string) {
		//verificar comando e publicar resposta
		const cmd = this._cmd.find((f) => f.cmd === msg);

		if (cmd) {
			this._bus.publish(TOPICS.WriteTheMessage, cmd.resp_1);
			if (cmd.resp_2?.trim()) {
				setTimeout(() => {
					this._bus.publish(TOPICS.WriteTheMessage, cmd.resp_2!);
				}, cmd.time);
			}
		}
	}

	static makeUnique(): Core {
		if (!UNIQUE_INSTANCE) {
			UNIQUE_INSTANCE = new Core();
		}
		return UNIQUE_INSTANCE;
	}
}

let UNIQUE_INSTANCE: Core | undefined = undefined;
