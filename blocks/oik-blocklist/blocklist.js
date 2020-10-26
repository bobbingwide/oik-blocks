/*
 * Block list renderer - displays the Block list for the selected namespace prefix
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { getBlockType, getBlockTypes, getBlockContent, serialize } = wp.blocks;
const { BlockIcon } = wp.blockEditor;
const { Fragment, renderToString } = wp.element;
// Get just the __() localization function from wp.i18n
//const { renderToString } = wp.element.renderToString;
const { __ } = wp.i18n;
const { select } = wp.data;
const { addQueryArgs} = wp.url;

import { BlockiconStyled, BlockSupportsInserter } from '../oik-blockicon/blockicons.js';
import { getNameSpace} from './blockprefix.js';
import { getAllBlockVariations, getVariationLink } from '../oik-blockicon/blockvariations';

/**
 * Returns the block list showing blocks and variations.
 *
 * @param prefix
 * @param showBlockLink
 * @param showDescription
 * @param showBatch
 * @param component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BlockListStyled( prefix, showBlockLink, showDescription, showBatch, component, ...props ) {
    var prefix_array = prefix.split( '/' );
    const namespace = prefix_array[0];

    var block_types = getBlockTypes();
    block_types = block_types.filter( namespaceFilter, namespace );
    //console.log( block_types );
    block_types = block_types.sort( (a, b) => a.title.localeCompare(b.title));

    var block_variations = getAllBlockVariations( block_types );
    block_variations = block_variations.sort( (a, b) => a.title.localeCompare(b.title));

    block_types = block_types.concat( block_variations );
    //console.log( block_types );

    var count_blocks = block_types.length;
    //var blocklist = null;

    if ( showBatch ) {

        var blocklist = <pre>
        rem Blocks {count_blocks}
        <br />
        {block_types.map((block ) => BlockCreateBlockLink( block, component )) }
        </pre>
    } else {
        var blocklist =
        <dl>
            {block_types.map((block) => BlockListItem(block, showBlockLink))}
        </dl>
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


function BlockListItem( block, showBlockLink ) {
/* { block.icon */

 //console.log( block );
    var blockLink = null;

    if ( showBlockLink ) {
        if ( undefined === block.block_name || '' === block.block_name ) {
            blockLink = getBlockLink(block);
        } else {
            blockLink = getVariationLink( block );
        }
    }

    var blockSupportsInserter = null;
    blockSupportsInserter = BlockSupportsInserter( block) ;


    return( <Fragment key={block.block_name + '|' + block.name}>

            <dt >
                <BlockIcon icon={block.icon} />
            </dt>

            <dd>
                { showBlockLink && (
                    <a
                        href={ blockLink }
                        title={ __( 'View block', 'oik-blocks' ) }
                    >

                {block.title } - {block.name }
                    </a> ) }


                {!showBlockLink && (
                    <span>
                        {block.title} - {block.name} </span>)
                }
                {blockSupportsInserter}
                <br />
                {block.description}<br />



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
    var keywords = block.keywords ? block.keywords.join() : null;
    url = addQueryArgs( url, { action: 'oiksc_create_or_update_block' });
    url = addQueryArgs( url, { title: block.title });
    url = addQueryArgs( url, { name: block.name });
    url = addQueryArgs( url, { description: block.description });
    url = addQueryArgs( url, { component: component});
    url = addQueryArgs( url, { keywords: keywords});
    url = addQueryArgs( url, { category: block.category});
    url = addQueryArgs( url, { variation: block.block_name});
    var blockIcon = renderToString( <BlockIcon icon={block.icon } /> );
    url = addQueryArgs( url, { icon: blockIcon });
    //console.log( url );
    return( <a key={block.name} href={ url }>
        Create/Update: {block.title} - {block.name}<br />
    </a>
    );
}

export  { BlockListStyled, BlockListItem };