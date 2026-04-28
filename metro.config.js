const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    resolver: {
        ...defaultConfig.resolver,
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};

module.exports = mergeConfig(defaultConfig, config);