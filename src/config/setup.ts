import { bgRed } from 'fmt/colors.ts';
import { format } from 'path';

export type CMD_SETUP = {
	time: number;
	cmd: string;
	erro: string;
	resp_1: string;
	resp_2: string | undefined;
};

type Config = {
	IXLA_LOG_MESSAGES_LENGTH: number;
	IXLA_PORT: string;
	IXLA_HOSTNAME: string;
	commands: CMD_SETUP[];
};

const SETUP = {} as Config;

const CONFIG_PATH = format({
	root: Deno.cwd(),
	name: '/config',
	ext: '.txt',
});

const txtToJson = (txt: string) => {
	const arrTxt = txt.split('\n')
		.map((l) => l.trim())
		.filter((line) => line && !line.startsWith('#'));

	SETUP.IXLA_LOG_MESSAGES_LENGTH =
		Number(arrTxt.find((f) => f.includes('IXLA_LOG_MESSAGES_LENGTH'))) ||
		100;

	SETUP.IXLA_PORT =
		(arrTxt.find((f) => f.includes('IXLA_PORT'))?.split('=') ||
			['', '5555'])[1];

	SETUP.IXLA_HOSTNAME =
		(arrTxt.find((f) => f.includes('IXLA_HOSTNAME'))?.split('=') ||
			['', 'localhost'])[1];

	SETUP.commands = arrTxt
		.filter((f) => f.includes('<command'))
		.map((m) => m.split('|').map((m2) => m2.trim()))
		.map((m) => {
			const resp: CMD_SETUP = {
				time: Number(m[0]),
				cmd: m[1],
				erro: m[2],
				resp_1: m[3],
				resp_2: m[4],
			};
			return resp;
		});

	console.log(SETUP);
};

const setConfig = async (CONFIG_FILE: string) => {
	try {
		CONFIG_FILE = await Deno.readTextFile(CONFIG_PATH);
		txtToJson(CONFIG_FILE);
	} catch (error) {
		throw new Error(error);
	}
};

export const initSetup = async () => {
	try {
		await Deno.realPath(CONFIG_PATH);
		await setConfig(await Deno.realPath(await Deno.realPath(CONFIG_PATH)));
	} catch (error) {
		console.log(
			bgRed(
				`* arquivo ( config.txt ) não encontrado -> ( ${CONFIG_PATH} )`,
			),
			error,
		);
		throw new Error(error);
	}
};

export default SETUP;

// const __dirname = new URL('.', import.meta.url).pathname;
// console.log(basename('.'));
// console.log(__dirname);
// console.log(Deno.cwd());
// console.log(await Deno.realPath(Deno.cwd()));
// console.log(Deno.execPath());
// console.log(new URL('.', import.meta.url));
