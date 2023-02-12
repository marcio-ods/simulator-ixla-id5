// import { CMDName, No, no } from 'utils';

export enum TOPICS { // enviar somente texto
	WriteTheMessage = 'topic-write-the-message',
	receivedCmd = 'topic-received-cmd',
}

type Topic = TOPICS;

export type SubscribeBus = (msg: string) => void;

type Subscribed = {
	key: string;
	fn: SubscribeBus;
};

interface PubSubMessage {
	subscribe: (topic: Topic, fn: SubscribeBus) => string;
	publish: (topic: Topic, msg: string) => void;
	unsubscribe: (key: string) => void;
	broadcast: (msg: string) => void;
	clean(): void;
}

type Channel = {
	topic: Topic;
	subscribed: Subscribed[];
};

export class Bus implements PubSubMessage {
	private _channel: Channel[] = [];

	public get channel(): Channel[] {
		return this._channel;
	}

	subscribe(topic: Topic, fn: SubscribeBus): string {
		const key = crypto.randomUUID();

		const idx = this._channel.findIndex((f) => f.topic === topic);
		if (idx > -1) {
			this._channel[idx].subscribed.push({ key, fn });
			return key;
		}
		this._channel.push({ topic, subscribed: [{ key, fn }] });
		return key;
	}

	unsubscribe(key: string): void {
		for (const [idxC, c] of this._channel.entries()) {
			const idxS = c.subscribed.findIndex((f) => f.key === key);
			if (idxS > -1) {
				this._channel[idxC].subscribed.splice(idxS, 1);
				return;
			}
		}
	}

	publish(topic: Topic, msg: string): void {
		const idx = this._channel.findIndex((f) => f.topic === topic);
		if (idx > -1) this._channel[idx]?.subscribed.forEach((t) => t.fn(msg));
	}

	broadcast(msg: string): void {
		this._channel.forEach((a) => a.subscribed.forEach((b) => b.fn(msg)));
	}

	clean(): void {
		this._channel = [];
	}

	static itIsForMe(startKey: string, msg: string): string | 'No' {
		// send:
		if (msg.startsWith(startKey)) return msg.replace(startKey, '');
		return 'no';
	}

	static makeUnique(): Bus {
		if (!UNIQUE_INSTANCE) UNIQUE_INSTANCE = new Bus();
		return UNIQUE_INSTANCE;
	}
}
let UNIQUE_INSTANCE: Bus | undefined = undefined;
