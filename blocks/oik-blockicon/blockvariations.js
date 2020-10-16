
/*
 * Block variations - displays information about blocks that have variations
 *
 * @copyright (C) Copyright Bobbing Wide 2020
 * @author Herb Miller @bobbingwide
 *
 */

const { Fragment } = wp.element;
const { BlockIcon } = wp.blockEditor;
const { getBlockVariations} = wp.blocks;
const { select } = wp.data;

import { BlockListItem } from "../oik-blocklist/blocklist";

/**
 * Displays a list of block variations for the block.
 *
 * @param blockname
 * @returns {JSX.Element|null}
 * @constructor
 */

function BlockVariations( blockname ) {
    if ( blockname.variations === undefined ) {
        return null;
    }
    //const blockVariations = getBlockVariations( blockname.name, 'block');
    var blockVariations = blockname.variations;
    //console.log( blockVariations );
    return( <dl>
        { blockVariations.map(( variation ) => blockVariationLink( variation, blockname)) }
    </dl> );

}

/**
 * Displays a cloned block variation using same logic as a normal block.
 *
 * @param variation
 * @param block_type
 * @returns {*}
 */
function blockVariationLink( variation, block_type ) {
    var variationasblock = cloneVariation( variation, block_type );
    return BlockListItem( variationasblock, true );
}

/**
 * We want to return an array of variations.
 * @param block_types
 * @returns {*|[]}
 */
function getAllBlockVariations( block_types ) {
    var block_variations = [];
    block_variations = block_types.map((block_type) => getPrefixedBlockVariations(block_type ));
    console.log( block_variations );
    block_variations = block_variations.flat();
    console.log( block_variations);
    return block_variations;
}

/**
 * Get prefixed is the wrong name now. It's just a cloned block variation.
 * @param block_type
 * @returns {*}
 */

function getPrefixedBlockVariations( block_type ) {
   // var variations = getBlockVariations( block_type.name );
    var variations = block_type.variations;
    var prefixed_variations = variations.map(( variation ) => cloneVariation( variation, block_type ));
    return prefixed_variations;
}

/**
 * Clones the variation merging the block's info as required.
 *
 * @param variation
 * @param block_type
 * @returns {*}
 */

function cloneVariation( variation, block_type ) {
    var variationasblock = Object.assign({}, variation );
    if ( variationasblock.title === undefined) {
        variationasblock.title = block_type.title;
    }
    if ( variationasblock.icon === undefined ) {
        variationasblock.icon = block_type.icon;
    }
    if ( variationasblock.description === undefined ) {
        variationasblock.description = block_type.description;
    }

    variationasblock.block_name = block_type.name;
    variationasblock.block_title = block_type.title;
    return variationasblock;

}


function title_to_permalink_part( title ) {
    var blockTitle = title;
    blockTitle = blockTitle.replace(/ /g, '-');
    blockTitle = blockTitle.replace( /\//g, '' );
    blockTitle = blockTitle.replace( /--/g, '-' );
    blockTitle = blockTitle.toLowerCase();
    return blockTitle;
}


/**
 * Returns the site's home URL.
 *
 * This should be similar to the value we'd get from the WordPress home URL logic
 * returning the base URL from which to construct a link, including a trailing slash
 * e.g. https://s.b/wp56/ for the installation in the wp56 folder
 * or https://blocks.wp-a2z.org/ for a subdomain install in a WPMS network.
 *
 * @returns {*}
 */
function getHomeUrl() {
    var windowLocationHref = window.location.href;
    var originPathName = window.location.origin + window.location.pathname;
    var homeUrl = originPathName.replace( 'wp-admin/post.php', '');
    return homeUrl;
}

/**
 * Gets a link to the variation of the block
 *
 * @param block
 * @returns {string}
 */

function getVariationLink( block ) {
    var blockTitle = title_to_permalink_part( block.block_title );
    //.replace(/ /g, '-');
    //blockTitle = blockTitle.replace( /\//g, '' );
    //blockTitle = blockTitle.replace( /--/g, '-' );
    //blockTitle = blockTitle.toLowerCase();
    //var blockName = block.name.replace('/', '-');
    var blockLink = null;
    //var prefix = null;
    var prefix = getHomeUrl() + 'block/';
    //var siteurl = select('core/editor').getPermalinkParts();
    //console.log( block);
    var variationTitle = title_to_permalink_part( block.title );
    var blockName = block.block_name.replace( '/', '-' );

    /*
    if (siteurl !== null) {
    

        //console.log(siteurl);
        var postType = select('core/editor').getCurrentPostType();
        //console.log( postType );

        prefix = siteurl.prefix.replace( postType + '/', 'block/');
    } else {
        console.log("SiteURL's null");
    }
    */
    blockLink = `${prefix}${blockTitle}-${blockName}/${variationTitle}-${blockName}`;
    return blockLink;
}


export { BlockVariations, getAllBlockVariations, getVariationLink, cloneVariation };