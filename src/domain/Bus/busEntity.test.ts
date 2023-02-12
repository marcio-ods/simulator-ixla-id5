import { assertArrayIncludes, assertEquals } from 'assert';
import { Bus, TOPICS } from 'domain/Bus/Bus.Entity.ts';
import { CMDName } from 'utils';

// const MSG = ["test1", "kkk", "deu ruim", "ok", "broadcast teste"]
const arr = [
	'topic-msg-from-id5',
	'topic-id5-send-message',
	'autoposition',
	'topic-test',
	'reset',
];
const MSG = [
	...arr,
	TOPICS.MsgFromId5,
	TOPICS['id5-send-message'],
	CMDName.Autoposition,
	TOPICS.test,
	CMDName.Reset,
];

const testMsg = (msg: string) => {
	assertEquals(msg, 'test1');
	// console.log("1" + " " + msg)
};
const onBus = (msg: string) => {
	assertArrayIncludes(MSG, [msg]);
};
const onBus2 = (msg: string) => {
	assertArrayIncludes(MSG, [msg]);
};
const onBus3 = (msg: string) => assertArrayIncludes(MSG, [msg]);
const onBus4 = (msg: string) => assertArrayIncludes(MSG, [msg]);

Deno.test('Test bus', () => {
	const bus = Bus.makeUnique();

	const ID_test1 = bus.subscribe(TOPICS.MsgFromId5, onBus);

	assertEquals(bus.channel.length, 1);
	assertEquals(bus.channel[0].topic, 'topic-msg-from-id5');
	assertEquals(bus.channel[0].subscribed.length, 1);

	const ID_test2 = bus.subscribe(TOPICS['id5-send-message'], testMsg);
	bus.publish(TOPICS['id5-send-message'], 'test1');

	bus.publish(TOPICS.MsgFromId5, 'topic-msg-from-id5');

	bus.unsubscribe(ID_test2);
	bus.unsubscribe(ID_test1);

	assertEquals(bus.channel.length, 2);
	assertEquals(bus.channel[0].subscribed.length, 0);
	assertEquals(bus.channel[1].subscribed.length, 0);

	const Id1 = bus.subscribe(TOPICS['id5-send-message'], onBus);
	const Id2 = bus.subscribe(TOPICS['id5-send-message'], onBus2);
	const Id3 = bus.subscribe(CMDName.Autoposition, onBus3);
	const Id4 = bus.subscribe(TOPICS.MsgFromId5, onBus4);

	bus.publish(CMDName.Reset, MSG[0]);
	bus.publish(CMDName.Reset, MSG[1]);

	bus.unsubscribe(ID_test1);

	bus.publish(TOPICS['id5-send-message'], MSG[2]);

	bus.unsubscribe(Id1);
	bus.publish(TOPICS['id5-send-message'], MSG[3]);
	bus.publish(TOPICS['id5-send-message'], MSG[2]);
	bus.publish(CMDName.Autoposition, MSG[0]);
	bus.unsubscribe(Id3);
	bus.broadcast('topic-test');
	bus.unsubscribe(Id2);
	bus.unsubscribe(Id4);
	assertEquals(bus.channel.length, 3);
	bus.clean();
	assertEquals(bus.channel.length, 0);
	assertEquals(
		Bus.itIsForMe('send:', 'send:<command />'),
		'<command />',
	);
	assertEquals(Bus.itIsForMe('send:', '<command />'), 'no');
});
