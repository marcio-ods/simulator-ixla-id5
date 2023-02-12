//  const status =new Map<string,number>[["Continue",100]]

export enum HttpStatus {
	Continue = 100, // RFC 9110, 15.2.1
	SwitchingProtocols = 101, // RFC 9110, 15.2.2
	Processing = 102, // RFC 2518, 10.1
	EarlyHints = 103, // RFC 8297

	OK = 200, // RFC 9110, 15.3.1
	Created = 201, // RFC 9110, 15.3.2
	Accepted = 202, // RFC 9110, 15.3.3
	NonAuthoritativeInfo = 203, // RFC 9110, 15.3.4
	NoContent = 204, // RFC 9110, 15.3.5
	ResetContent = 205, // RFC 9110, 15.3.6
	PartialContent = 206, // RFC 9110, 15.3.7
	MultiStatus = 207, // RFC 4918, 11.1
	AlreadyReported = 208, // RFC 5842, 7.1
	IMUsed = 226, // RFC 3229, 10.4.1

	MultipleChoices = 300, // RFC 9110, 15.4.1
	MovedPermanently = 301, // RFC 9110, 15.4.2
	Found = 302, // RFC 9110, 15.4.3
	SeeOther = 303, // RFC 9110, 15.4.4
	NotModified = 304, // RFC 9110, 15.4.5
	UseProxy = 305, // RFC 9110, 15.4.6
	_ = 306, // RFC 9110, 15.4.7 (Unused)
	TemporaryRedirect = 307, // RFC 9110, 15.4.8
	PermanentRedirect = 308, // RFC 9110, 15.4.9

	BadRequest = 400, // RFC 9110, 15.5.1
	Unauthorized = 401, // RFC 9110, 15.5.2
	PaymentRequired = 402, // RFC 9110, 15.5.3
	Forbidden = 403, // RFC 9110, 15.5.4
	NotFound = 404, // RFC 9110, 15.5.5
	MethodNotAllowed = 405, // RFC 9110, 15.5.6
	NotAcceptable = 406, // RFC 9110, 15.5.7
	ProxyAuthRequired = 407, // RFC 9110, 15.5.8
	RequestTimeout = 408, // RFC 9110, 15.5.9
	Conflict = 409, // RFC 9110, 15.5.10
	Gone = 410, // RFC 9110, 15.5.11
	LengthRequired = 411, // RFC 9110, 15.5.12
	PreconditionFailed = 412, // RFC 9110, 15.5.13
	RequestEntityTooLarge = 413, // RFC 9110, 15.5.14
	RequestURITooLong = 414, // RFC 9110, 15.5.15
	UnsupportedMediaType = 415, // RFC 9110, 15.5.16
	RequestedRangeNotSatisfiable = 416, // RFC 9110, 15.5.17
	ExpectationFailed = 417, // RFC 9110, 15.5.18
	Teapot = 418, // RFC 9110, 15.5.19 (Unused)
	MisdirectedRequest = 421, // RFC 9110, 15.5.20
	UnprocessableEntity = 422, // RFC 9110, 15.5.21
	Locked = 423, // RFC 4918, 11.3
	FailedDependency = 424, // RFC 4918, 11.4
	TooEarly = 425, // RFC 8470, 5.2.
	UpgradeRequired = 426, // RFC 9110, 15.5.22
	PreconditionRequired = 428, // RFC 6585, 3
	TooManyRequests = 429, // RFC 6585, 4
	RequestHeaderFieldsTooLarge = 431, // RFC 6585, 5
	UnavailableForLegalReasons = 451, // RFC 7725, 3

	InternalServerError = 500, // RFC 9110, 15.6.1
	NotImplemented = 501, // RFC 9110, 15.6.2
	BadGateway = 502, // RFC 9110, 15.6.3
	ServiceUnavailable = 503, // RFC 9110, 15.6.4
	GatewayTimeout = 504, // RFC 9110, 15.6.5
	HTTPVersionNotSupported = 505, // RFC 9110, 15.6.6
	VariantAlsoNegotiates = 506, // RFC 2295, 8.1
	InsufficientStorage = 507, // RFC 4918, 11.5
	LoopDetected = 508, // RFC 5842, 7.2
	NotExtended = 510, // RFC 2774, 7
	NetworkAuthenticationRequired = 511, // RFC 6585, 6
}

// function b(t: HttpStatus) {
//     console.log(typeof t)
//     console.log(typeof HttpStatus[t])
//     const s: string = HttpStatus[t]
//     // const a = `${HttpStatus[t]}`.replaceAll(/([A-Z])/, " $&").trim()
//     // const a = s.replaceAll(/[A-Z])/, " $&").trim()
//     const a = `${HttpStatus[t]}`.replace(/[A-Z]/g, " $&").trim().toLocaleLowerCase()
//     // const a = s.replaceAll("a", " $&").trim()
//     console.log(s)
//     console.log(a)
// }

// b(HttpStatus.Accepted)
// b(HttpStatus.BadRequest)
// b(HttpStatus.Conflict)

// const status = new Map<string, number>([["Continue", 100]])
// status.get("Co")
// export default HttpStatus

// export const STATUS_TEXT = new Map<string, string>(
//     Object.entries(StdStatusText),
//   );
