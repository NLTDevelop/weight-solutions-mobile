const fs = require('fs');
const path = require('path');

const modulePath = path.join(
    __dirname,
    '..',
    'node_modules',
    'react-native-tcp-socket',
    'android',
    'src',
    'main',
    'java',
    'com',
    'asterinet',
    'react',
    'tcpsocket',
    'TcpSocketModule.java',
);

const unsafeImplementation = `                TcpSocketClient socketClient = getTcpClient(cId);
                socketClient.destroy();`;
const safeImplementation = `                TcpSocket socket = socketMap.remove(cId);
                if (socket instanceof TcpSocketClient) {
                    ((TcpSocketClient) socket).destroy();
                }`;

if (!fs.existsSync(modulePath)) {
    throw new Error(`Cannot patch react-native-tcp-socket: ${modulePath} does not exist`);
}

const source = fs.readFileSync(modulePath, 'utf8');

if (source.includes(safeImplementation)) {
    process.exit(0);
}

if (!source.includes(unsafeImplementation)) {
    throw new Error('Cannot patch react-native-tcp-socket: expected Android implementation was not found');
}

fs.writeFileSync(
    modulePath,
    source.replace(unsafeImplementation, safeImplementation),
    'utf8',
);

console.log('Patched react-native-tcp-socket Android destroy race');
