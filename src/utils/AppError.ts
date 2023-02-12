import { AppStatus, appStatusText, HttpStatus, no, yes, YesOrNo } from 'utils';

// import { HttpStatus } from '@/utils/HttpStatusCode.ts';

// export type ErrorType = "warning" | "crash"

type Code = HttpStatus | AppStatus;

/**
 * Construct an object of this class.
 *
 * @param code - HttpStatus | AppStatus
 * @param message - (optional) The exception message.
 */
export class AppError extends Error {
	// name: string;
	// message: string;
	// stack?: string | undefined;
	// cause?: unknown;
	// private _type: ErrorType = "warning"
	code: number;

	constructor(code: Code = 0, message?: string) {
		const [statusText, err] = appStatusText(code);
		if (err !== 'nil') code = 0;
		if (!message) message = statusText;
		super(message);
		this.code = code;
		this.name = 'AppError';
	}

	toString() {
		return `${this.name}: ${this.message}\r\nstack:\r\n ${this.stack}`;
	}

	throwError(message?: string) {
		if (message) this.message = message;
		throw this;
	}

	static make(code: Code, message?: string): AppError {
		return new AppError(code, message);
	}

	static isError(value: unknown): YesOrNo {
		return isAppError(value);
	}
}

const isAppError = (value: unknown): YesOrNo => {
	if (value instanceof Error) {
		return yes;
	}
	if (value instanceof AppError) {
		return yes;
	}
	return no;
};

// export const appError = (err?: { msg?: string, type?: ErrorType }) => {
//     const msg = err?.msg || "unexpected error"
//     const type: ErrorType = err?.type || "warning"
//     const newError = new Error(msg)
//     return new AppError(newError, type)
// }

// import { STATUS_TEXT } from "../deps.ts";

/**
 * This class is for throwing errors in the request-resource-response lifecycle.
 */
// export class HttpError extends Error {
//   /**
//    * A property to hold the HTTP response code associated with this
//    * exception.
//    */
//   public code: number;

//   /**
//    * Construct an object of this class.
//    *
//    * @param code - See HttpError.code.
//    * @param message - (optional) The exception message.
//    */
//   constructor(code: number, message?: string) {
//     super(message);
//     if (!message) {
//       const statusText = STATUS_TEXT.get(code.toString());
//       if (statusText) {
//         this.message = statusText;
//       }
//     }
//     this.code = code;
//   }
// }
