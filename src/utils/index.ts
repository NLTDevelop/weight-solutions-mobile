import { Dimensions, PixelRatio, Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const onNoOperation = () => { };

export const declOfWord = (num: number, word: Array<string>): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    if (Array.isArray(word)) {
        return `${num} ${
            // @ts-ignore
            word[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]] || word[2]
            }`;
    }
    return '';
};

export const declOfWordWithoutNum = (num: number, word: Array<string>): string => {
    const cases = [2, 0, 1, 1, 1, 2];

    return `${word[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]]}`;
};

const idealWidth: number = 375;
const idealHeight: number = 812;
export const size: { width: number; height: number } = Dimensions.get('window');
const ratio: number = PixelRatio.getFontScale();

export const scaleHorizontal = (inWidth: number = 1): number => {
    const delimiter: number = idealWidth / inWidth;
    return size.width / delimiter;
};

export const scaleVertical = (inHeight: number = 1) => {
    const delimiter: number = idealHeight / inHeight;
    return size.height / delimiter;
};

export const scaleFontSize = (fontSize: number = 1): number => {
    const divisionRatio: number = idealWidth / (fontSize / ratio);
    return size.width / divisionRatio;
};

export const scaleLineHeight = (lineHeight: number = 1): number => {
    const divisionRatio = idealHeight / (lineHeight / ratio);
    let result = size.height / divisionRatio;

    // Корректировка для маленьких экранов (например, <700px высоты)
    if (size.height < 700) {
        result += 4;
    }

    return result;
};

export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA');
};

export const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const shuffleArray = <T>(array: T[]): T[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i]!;
        result[i] = result[j]!;
        result[j] = temp;
    }
    return result;
};

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const _size = bytes / Math.pow(1024, index);
    return `${_size.toFixed(2)} ${units[index]}`;
};

//TODO: Ask to start using i18next
export const getPluralSuffix = (count: number = 0, forms: [string, string, string]): string => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return `${count} ${forms[0]}`;
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return `${count} ${forms[1]}`;
    } else {
        return `${count} ${forms[2]}`;
    }
};

export const formatBytes = (bytes: number): string => {
    if (!bytes || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const _size = bytes / Math.pow(1024, index);
    return `${_size < 10 ? _size.toFixed(1) : _size.toFixed(0)} ${units[index]}`;
};
