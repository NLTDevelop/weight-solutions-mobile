module.exports = {
    root: true,
    extends: '@react-native',
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                paths: ['src'],
            },
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
};