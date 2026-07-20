import { PERMISSIONS, check, request, RESULTS, openSettings, } from 'react-native-permissions';
import { IFileSystem } from './IFileSystem';
import { DocumentDirectoryPath, DownloadFileOptions, ExternalDirectoryPath, downloadFile, exists, unlink, writeFile } from 'react-native-fs';
import { isIOS } from '../../utils';

class FileSystem implements IFileSystem {
    private directory = isIOS ? `${DocumentDirectoryPath}` : ExternalDirectoryPath;

    private getFileName = async (fileName: string) => {
        const lastDot = fileName.lastIndexOf('.');
        const name = fileName.slice(0, lastDot);
        const end = fileName.slice(lastDot, fileName.length);
        let counter = 0;
        let currentName = `${name}${end}`;
        let isExistsGlob = await exists(`${this.directory}/${fileName}`);
        if (isExistsGlob) {
            for (let index = 1; index < 20; index++) {
                counter = index;
                let isExists = await exists(`${this.directory}/${currentName}`);
                if (isExists) {
                    currentName = `${name}(${counter})${end}`;
                } else {
                    break;
                }
            }
        }
        return currentName;
    }

    private getPermission = async () => {
        if (isIOS) {
            return;
        }
        const permissionsStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        switch (permissionsStatus) {
            case RESULTS.BLOCKED:
                await openSettings();
                break;
            case RESULTS.LIMITED:
            case RESULTS.DENIED:
                await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                break;
        }

        const permissionsStatusWrite = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        switch (permissionsStatusWrite) {
            case RESULTS.BLOCKED:
                await openSettings();
                break;
            case RESULTS.LIMITED:
            case RESULTS.DENIED:
                await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
                break;
        }
    };

    public download = async (path: string, fileName: string,): Promise<any> => {
        try {
            await this.getPermission();
            const newFileName = await this.getFileName(fileName);
            const options: DownloadFileOptions = {
                fromUrl: path,
                toFile: `${this.directory}/${newFileName}`,
                connectionTimeout: 30000,
                backgroundTimeout: 30000,
                readTimeout: 120000,
            };
            const response = await downloadFile(options).promise;
            return { ...response, path: `${this.directory}/${newFileName}` };
        } catch (error) {
            console.warn('FileSystem -> download: ', error);
            return null;
        }
    }

    public deleteFile = async (path: string): Promise<any> => {
        try {
            const isExist = await this.exist(path);
            if (isExist) {
                await unlink(path);
            }
        } catch (error) {
            console.warn('FileSystem -> deleteFile: ', error);
        }
    }

    public exist = async (path: string) => {
        try {
            await this.getPermission();
            const isExists = await exists(path);
            return isExists;
        } catch (error) {
            console.warn('FileSystem -> exist', error);
            return false;
        }
    }

    public readFile = async (path: string, encoding: 'utf8' | 'base64') => {
        try {
            const fs = require('react-native-fs');
            const data = await fs.readFile(path, encoding);
            return data;
        } catch (error) {
            console.warn('FileSystem -> readFile', error);
            return null;
        }
    }

    public writeFile = async (path: string, data: string, encoding: 'utf8' | 'base64') => {
        try {
            await writeFile(path, data, encoding);
        } catch (error) {
            console.warn('FileSystem -> writeFile', error);
        }
    }

}

export const fileSystem = new FileSystem();
