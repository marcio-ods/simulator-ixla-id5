import { Bus, TOPICS } from '../Bus/Bus.Entity.ts';

// deno-lint-ignore no-explicit-any
type Send = (msg: string | any) => Promise<number>;

interface ICore {
	exec: (
		send: Send,
		msg: string,
	) => Promise<void>;
}

export class Core implements ICore {
	private bus: Bus;

	constructor() {
		this.bus = Bus.makeUnique();
	}

	on() {
		this.bus.subscribe(TOPICS.receivedCmd, () => {
			this.bus.publish(TOPICS.WriteTheMessage, 'BCDF');
		});
	}

	async exec(send: Send, msg: string) {
		console.log(await send(msg));

		// send('msg');
	}
	static makeUnique(): Core {
		if (!UNIQUE_INSTANCE) {
			UNIQUE_INSTANCE = new Core();
			UNIQUE_INSTANCE.on();
		}
		return UNIQUE_INSTANCE;
	}
}

let UNIQUE_INSTANCE: Core | undefined = undefined;
