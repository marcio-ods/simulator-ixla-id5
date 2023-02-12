import { initSetup } from 'config/setup.ts';

import { Core } from '../domain/core/Core.Entity.ts';
import { TcpSocketServer } from '../drivers/tcp_socket/TcpSocket.Server.ts';

(async function main() {
	await initSetup();
	Core.makeUnique();
	await TcpSocketServer.makeUnique();
})();
