import { AppError } from 'utils';

export type Yes = 'yes';
export type No = 'no';
export type YesOrNo = Yes | No;
export type Ok = 'ok';
export type Err = 'error';
export type Crash = 'crash';
export type Nil = 'nil';
export type TypeOrNil<T> = T | Nil;

export const yes: Yes = 'yes';
export const no: No = 'no';
export const ok: Ok = 'ok';
export const error: Err = 'error';
export const crash: Crash = 'crash';
export const nil: Nil = 'nil';

// 0n = Bigint{} | "NaN"?
export type Falsy = false | 0 | 0n | '' | null | undefined;

export type AppResult<T = Nil> = [T | Nil, AppError | Nil];

export type Return<T = undefined> = [T | undefined, AppError | undefined];

export const isAppError = (value: unknown): YesOrNo => {
	if (value instanceof Error) {
		return yes;
	}
	if (value instanceof AppError) {
		return yes;
	}
	return no;
};

export const isNilOrAppError = (value: unknown): YesOrNo => {
	if (value === 'nil') return yes;
	if (isAppError(value)) return yes;
	return no;
};

export const falsy: Falsy[] = [false, 0, 0n, '', null, undefined];
export const isFalse = (value: unknown): YesOrNo => {
	if (falsy.includes(value as Falsy)) {
		return yes;
	}
	return no;
};
