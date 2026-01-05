const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This line allows Metro to resolve the .cjs files Firebase uses
config.resolver.sourceExts.push('cjs');

module.exports = config;