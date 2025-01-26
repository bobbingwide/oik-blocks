const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
    ...defaultConfig,
    entry: {
        'blockicon': './src/oik-blockicon',
        'blockinfo': './src/oik-blockinfo',
        'blocklist': './src/oik-blocklist',
        'fields': './src/oik-fields',
        'person': './src/oik-person',
        'nivo': './src/oik-nivo'
    },
};