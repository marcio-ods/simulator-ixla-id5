import { format } from 'datetime';

// import { setup } from '@/utils/config.ts';

// const _log: string[] = [];
// const _console: boolean = SETUP.IXLA_LOG_MESSAGES();

// deno-lint-ignore no-explicit-any
export const appLogger = (msg: string, ...args: any[]) => {
	const t = format(new Date(), 'dd-MM-yy HH:mm:ss');

	msg = `[${t}] ${msg}`;

	// _log.push(msg);

	// if (_console) {
	console.log(msg, ...args);
	// }
};

// export class AppLogger {
// 	// constructor(private readonly console: boolean) {}

// 	static error(msg: string) {
// 		// current date & time in YYYY-MM-DD hh:mm:ss format
// 		// console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
// 	}

// 	// static makeUnique(): AppLogger {
// 	// 	if (!UNIQUE_INSTANCE) {
// 	// 		UNIQUE_INSTANCE = new AppLogger(true);
// 	// 	}
// 	// 	return UNIQUE_INSTANCE;
// 	// }
// }

// let UNIQUE_INSTANCE: AppLogger | undefined = undefined;

// Os símbolos a seguir são permitidos no método format() ao criar uma string de data e hora.

// yyyy : ano de 4 dígitos
// yy : ano de 2 dígitos
// M : mês numérico (1-12)
// MM : mês numérico de 2 dígitos (01-12)
// d : dia numérico (1-31)
// dd : dia numérico de 2 dígitos (01-31)
// H : hora numérica, formato de 24 horas (0-23)
// HH : hora numérica de 2 dígitos, formato de 24 horas (00-23)
// h : hora numérica, formato de 12 horas (0-11)
// hh : hora numérica de 2 dígitos, formato de 12 horas (00-11)
// m : minuto numérico (0-59)
// mm : minuto numérico de 2 dígitos (00-59)
// s : segundo numérico (0-59)
// ss : segundo numérico de 2 dígitos (00-59)
// a : AM ou PM
