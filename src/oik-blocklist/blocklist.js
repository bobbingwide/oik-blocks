/*
 * Block list renderer - displays the Block list for the selected namespace prefix
 *
 * @copyright (C) Copyright Bobbing Wide 2019,2021,2022
 * @author Herb Miller @bobbingwide
 *
 */

import { getBlockType, getBlockTypes, getBlockContent, serialize } from '@wordpress/blocks';
import { BlockIcon } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { Fragment, renderToString } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';

import { BlockiconStyled, BlockSupportsInserter } from '../oik-blockicon/blockicons.js';
import { getNameSpace} from './blockprefix.js';
import { getAllBlockVariations, getVariationLink } from '../oik-blockicon/blockvariations';

/**
 * Returns the block list showing blocks and variations.
 *
 * @param prefix
 * @param showBlockLink
 * @param showVariations
 * @param showBatch
 * @param component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BlockListStyled( prefix, showBlockLink, showVariations, showBatch, component, ...props ) {
    var prefix_array = prefix.split( '/' );
    const namespace = prefix_array[0];

    var block_types = getBlockTypes();
    block_types = block_types.filter( namespaceFilter, namespace );
    //console.log( block_types );
    block_types = block_types.sort( (a, b) => a.title.localeCompare(b.title));
    var count_blocks = block_types.length;
    var block_variations = getAllBlockVariations(block_types);
    var variationsList = null;
    if ( showVariations && showBatch ) {
        //block_variations = block_variations.sort((a, b) => a.title.localeCompare(b.title));
        if (showBlockLink) {
            variationsList = block_variations.map((block) => BlockCreateBlockLink(block, component));
        } else {
            variationsList = block_variations.map((block) => BlockNoLink(block, component));
        }
    }

    var blocklist = null;

    if ( showBatch ) {
        if ( showBlockLink ) {

            blocklist = <pre>
                rem Blocks {count_blocks}
                <br />
                rem Variations { block_variations.length }
                <br/>
                {block_types.map((block) => BlockCreateBlockLink(block, component))}
                {variationsList}
                </pre>
        } else {
            block_types = block_types.sort((a, b) => a.name.localeCompare(b.name));
            blocklist = <pre>
                rem Block {count_blocks }
                <br />
                rem Variations { block_variations.length }
                <br/>
                {block_types.map( (block) => BlockNoLink( block, component ))}
                {variationsList}
            </pre>
        }
    } else {
        blocklist =
        <dl>
            {block_types.map((block) => BlockListItem(block, showBlockLink))}
        </dl>
        if ( showVariations) {
            var variationList =
               
                <dl>
                    {block_variations.map((block ) => BlockListItem( block, showBlockLink )) }
                </dl>
            blocklist = <Fragment>{blocklist}<h3>Variations</h3>{variationList}</Fragment>
        }
    }
    return( blocklist  );
}

function namespaceFilter( element, index, array ) {

    var element_namespace = getNameSpace(element);
    var filter_result = ( this == element_namespace);
    return filter_result;
}

function getBlockLink( block ) {
    //console.log( 'getBlockLink');
    //console.log( block);
        var blockTitle = block.title.replace( / /g, '-' );
        blockTitle = blockTitle.replace( '/', '-' );
        blockTitle = blockTitle.toLowerCase();
        var blockName = block.name.replace( '/', '-' );
        var blockLink = null;
        var prefix = null;
        var siteurl = select('core/editor').getPermalinkParts();

        if ( siteurl !== null ) {

            //console.log(siteurl);
            var postType = select( 'core/editor').getCurrentPostType();
            //console.log( postType );

            prefix = siteurl.prefix.replace( postType, 'block');
        } else {
            console.log( "SiteURL's null");
        }
        blockLink = `${prefix}${blockTitle}-${blockName}`;
        return blockLink;
    }


/**
 * Returns a formatted block list item.
 *
  * @param block
 * @param showBlockLink
 * @returns {JSX.Element}
 * @constructor
 */
function BlockListItem( block, showBlockLink ) {
    var blockLink = null;

    if ( showBlockLink ) {
        if ( undefined === block.block_name || '' === block.block_name ) {
            blockLink = getBlockLink(block);
        } else {
            blockLink = getVariationLink( block );
        }
    }

    var variationSep = null;
    if  ( undefined === block.block_name || '' === block.block_name ) {
        variationSep = '';
    } else {
        variationSep = ' : ';
    }

    var blockSupportsInserter = null;
    blockSupportsInserter = BlockSupportsInserter( block) ;
    var blockDescription = null;
    //console.log( block.description );
    blockDescription = BlockDescription( block.description );
    //    ( typeof block.description === 'string' ) ? block.description : <span>{block.description}</span>;
    //blockDescription = <Fragment>{block.description}</Fragment>;

    //console.log( block.block_name + '|' + block.name );
    //console.log( blockDescription );

    return( <Fragment key={block.block_name + '|' + block.name}>

            <dt >
                <Icon icon={ block.icon && block.icon.src ? block.icon.src : block.icon } />
            </dt>

            <dd>
                { showBlockLink && (
                    <a
                        href={ blockLink }
                        title={ __( 'View block', 'oik-blocks' ) }
                    >
                        {block.block_title}{variationSep}{block.title } - {block.block_name} {block.name }
                    </a> ) }


                {!showBlockLink && (
                    <span>
                        {block.block_title}{variationSep}{block.title } - {block.block_name} {block.name }
                    </span>)
                }
                {blockSupportsInserter}
                <br />
                {blockDescription}<br />

            </dd>
        </Fragment>
        );
}

/**
 * Removed BlockCreateItem - replaced by BlockCreateBlockLink
 */

/**
 * Note that the variation parameter is the parent name for a variation.
 * If this parameter is not set then we're creating a normal block.
 *
 * @param block
 * @param component
 * @returns {JSX.Element}
 * @constructor
 */
function BlockCreateBlockLink( block, component ) {
    var url = ajaxurl;
    //var blockDescription = ( typeof block.description === 'string') ? block.description : 'TBC';
    //var blockDescription = renderToString( <Fragment>{block.description}</Fragment> );
    var blockDescription = BlockDescription( block.description );
    var keywords = block.keywords ? block.keywords.join() : null;
    url = addQueryArgs( url, { action: 'oiksc_create_or_update_block' });
    url = addQueryArgs( url, { title: block.title });
    url = addQueryArgs( url, { name: block.name });
    url = addQueryArgs( url, { description:  blockDescription } );
    url = addQueryArgs( url, { component: component});
    url = addQueryArgs( url, { keywords: keywords});
    url = addQueryArgs( url, { category: block.category});
    url = addQueryArgs( url, { variation: block.block_name});
    // This doesn't seem to work anymore! We should probably be referencing block.icon.src
    // Never mind, the icon was sometimes too large to pass on the URL
    // So let's forget about it for now.
    //console.log( block.icon );
    //var blockIcon = renderToString( <BlockIcon icon={block.icon } /> );
    //url = addQueryArgs( url, { icon: blockIcon });
    //console.log( url );
    return( <a key={block.name} href={ url }>
        Create/Update: {block.title} - {block.name}<br />
    </a>
    );
}

function BlockNoLink( block, component ) {
    var block_name = '';
    if ( undefined !== block.block_name ) {
        block_name = block_name.concat( block.block_name, ' ' );
    }
    block_name = block_name.concat( block.name);

    var block_title = '';
    if ( undefined !== block.block_title ) {
        block_title = block_title.concat( block.block_title, ' ' );
    }
    block_title = block_title.concat( block.title );

    return(
        <Fragment>{block_name },{block_title}<br /></Fragment>
    );
}

/**
 * Returns a string for the block description.
 *
 * The renderToString() function doesn't work during save().
 *
 * This function is a hacky workaround for those blocks that
 * don't simply provide a string.
 * We assume we can use the content of the first inner block
 * since it's expected to be a paragraph.
 * If the first inner block is not a paragraph the description will be TBC.
 *
 * @param description
 * @returns {string}
 * @constructor
 */
function BlockDescription( description ) {
    //console.log( description );
    if ( typeof description === 'boolean') {
        return( '' );
    }
    if ( typeof description === 'string' ) {
        return(description);
    } else {

        var descFromFirstPara = 'TBC';
        //descFromFirstPara = renderToString( <Fragment> {description} </Fragment>);
        //console.log( descFromFirstPara);
        var children = description.props.children;
        if ( children[0].type === 'p' ) {
            descFromFirstPara = children[0].props.children;
        }
        return( descFromFirstPara );
    }
}

export  { BlockListStyled, BlockListItem, BlockDescription };