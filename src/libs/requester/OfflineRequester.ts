// import { AxiosRequestConfig } from 'axios';
// import NetInfo from '@react-native-community/netinfo';
// import { IRequester } from './IRequester/IRequester';
// import { IResponse } from './IRequester/IResponse';
// import { localization } from '../../UIProvider/localization/Localization';
// // import { CacheService } from '../cache/CacheService';

// export class OfflineRequester {
//     private isConnected: boolean = true;

//     constructor(private requester: IRequester, private cacheService: CacheService) {
//         this.subscribeToConnection();
//     }

//     private subscribeToConnection() {
//         NetInfo.addEventListener(state => {
//             this.isConnected = state.isConnected ?? true;
//         });
//     }

//     request: IRequester['request'] = async (config: AxiosRequestConfig<object>): Promise<IResponse<any>> => {
//         const method = (config.method?.toUpperCase() || 'GET') as 'GET' | 'POST' | 'PUT' | 'DELETE';

//         if (this.isConnected) {
//             try {
//                 const response = await this.requester.request(config);

//                 // ❗ Если ошибка вызвана отсутствием сети — сохраняем запрос на ту же позицию
//                 if (response.isError && !response.status) {
//                     console.log('📦 Network error (online but lost), reinserting to queue:', config.url);
//                     if (method !== 'GET') {
//                         await this.cacheService.reinsertToQueue(config);
//                     }
//                     return {
//                         isError: true,
//                         message: localization.t('cache.offlineQueuedForRetry'),
//                         data: null,
//                     };
//                 }

//                 this.cacheService.processQueue().catch(error => {
//                     console.warn('OfflineRequester -> processQueue failed', error);
//                 });

//                 return response;
//             } catch (err) {
//                 // ❗ Если во время выполнения сети не оказалось — кладем запрос в начало очереди
//                 console.log('⚠️ Request failed abruptly, pushing to front of queue:', config.url);
//                 if (method !== 'GET') {
//                     await this.cacheService.addToFront(config);
//                 }
//                 return {
//                     isError: true,
//                     message: localization.t('cache.offlineQueuedForRetry'),
//                     data: null,
//                 };
//             }
//         } else {
//             if (method === 'GET') {
//                 console.log('📴 Offline GET request, not queueing:', config.url);
//                 return { isError: true, message: localization.t('cache.noCacheData'), data: null };
//             }

//             console.log('📦 Offline, adding to queue:', config.url);
//             return await this.cacheService.addToQueue(config);
//         }
//     };
// }
