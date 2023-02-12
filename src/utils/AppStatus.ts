import { AppError, AppResult, HttpStatus, Nil, nil } from 'utils';

export enum AppStatus {
	UnexpectedError = 0,
	// UnexpectedError = 1000
}

export const STATUS = () => ({
	...AppStatus,
	...HttpStatus,
});

/**
 * @param code: number
 * @returns string | Nil
 */
export const appStatusText = (code: number): AppResult<string> => {
	let err: Nil | AppError = 'nil';

	let status = STATUS()[code] || 'nil';
	if (status === nil) {
		status = STATUS()[0] || 'nil';
		err = AppError.make(0, 'código de status não encontrado');
	}
	if (status !== nil) {
		status = `${status}`.replace(/[A-Z]/g, ' $&').trim()
			.toLocaleLowerCase();
	}
	return [status, err];
};
