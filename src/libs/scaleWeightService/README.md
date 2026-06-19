# Передача ваги через Wi-Fi

## Реальний канал

У застосунку використовується TCP client через `react-native-tcp-socket`:

```text
індикатор вагів -> Wi-Fi модуль (TCP server) -> локальна Wi-Fi мережа
    -> TCP client у телефоні -> ScaleWeightService -> екран -> backend
```

Телефон і модуль вагів мають бути в одній Wi-Fi мережі. Інший поширений варіант: модуль створює власну Wi-Fi точку доступу, а телефон підключається безпосередньо до неї.

`TcpScaleWeightTransport` примусово використовує Wi-Fi interface, а не мобільний інтернет. Канал підтримує:

- TCP connect до IP і порту модуля;
- поділ TCP-потоку на окремі кадри;
- push-режим, коли ваги самі надсилають значення;
- poll-режим, коли застосунок надсилає команду запиту;
- keepalive, connection timeout і автоматичне перепідключення;
- передачу кожного готового кадру в `ScaleWeightService`.

## Підключення

```ts
import { configureTcpScaleWeightChannel } from '@/libs/scaleWeightService';

const scaleService = configureTcpScaleWeightChannel({
    host: '192.168.2.190',
    port: 9761,
    delimiter: '', // модуль формує TCP packets у режимі Flush
    reconnectDelayMs: 2000,
});

const unsubscribe = scaleService.subscribe(state => {
    console.log(state.status, state.lastReading);
});

const isConnected = await scaleService.connect();

if (!isConnected) {
    // Показати стан offline; transport продовжить спроби reconnect у фоні.
}
```

Для вагів, які віддають значення тільки після команди:

```ts
const scaleService = configureTcpScaleWeightChannel({
    host: '192.168.2.190',
    port: 9761,
    delimiter: '\r\n',
    requestCommand: 'W\r\n',
    requestIntervalMs: 500,
});
```

Команда `W\r\n` наведена лише як приклад. Її треба взяти з протоколу конкретного індикатора.

За замовчуванням TCP канал перепідключається безстроково кожні 2 секунди. Idle timeout вимкнений, тому відсутність автомобіля на вагах не закриває socket.

Доступ до інтернету не потрібен. Телефон повинен бути підключений до локальної Wi-Fi мережі вагів, навіть якщо ця мережа показує статус «без інтернету». Якщо Wi-Fi interface недоступний, `connect()` повертає `false`, а застосунок не падає.

Після стабілізації ваги:

```ts
const snapshot = scaleService.createSnapshot();

if (snapshot?.isStable) {
    // Передати snapshot.weightKg і snapshot.receivedAt у запит створення зважування.
}
```

При виході з робочого сценарію:

```ts
unsubscribe();
await scaleService.disconnect();
```

## Нативні налаштування

- Android уже має `INTERNET`; socket-бібліотека додає `ACCESS_NETWORK_STATE` і `CHANGE_NETWORK_STATE` через manifest merge.
- iOS має `NSLocalNetworkUsageDescription`, тому система покаже запит доступу до локальної мережі при першому підключенні.
- Для iOS після встановлення залежності потрібен `pod install`.

## Налаштування поточного Wi-Fi RS232/RS485 модуля

- socket type: `Server`;
- STA IP: `192.168.2.190`;
- subnet mask: `255.255.255.0`;
- socket port: `9761`;
- TCP keepalive: enabled;
- TCP/IP packets: `Flush`;
- buffer delay: `10 ms`;
- UART baud rate: `9600`;
- parity: `None`.

Телефон повинен бути підключений до тієї самої Wi-Fi мережі та мати адресу `192.168.2.x`. Поле `Server IP Address: 192.168.0.192` не використовується, поки модуль працює в режимі `Server`.

## Дані, без яких неможливо підключитися до конкретних вагів

Wi-Fi описує лише мережу, але не протокол даних. Від виробника або монтажника потрібні:

1. IP-адреса модуля вагів.
2. TCP-порт.
3. Роль модуля: зазвичай TCP server.
4. Один приклад сирого повідомлення з вагою.
5. Роздільник кадру: `CRLF`, `LF`, фіксована довжина або інший.
6. Push чи poll режим; для poll потрібна команда запиту.
7. Ознаки стабільності, перевантаження і від'ємної ваги в протоколі.

Без IP і порту телефон не знає, куди відкривати socket. Без прикладу кадру неможливо гарантувати правильне виділення числа ваги.
