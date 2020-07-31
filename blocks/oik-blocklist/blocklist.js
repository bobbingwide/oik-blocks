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


function BlockListStyled( prefix, showBlockLink, showCreateBlockLink, showDescription, showBatch, component, ...props ) {
    //var block = getBlockType( blockname ) ;
    //var blockicon =  BlockiconStyled( blockname, props  );
    //var BlockLink =  showBlockLink ? <div>{ blockname }</div> : null;
    //var blockTitle = showCreateBlockLink ? <div> {block.title } </div> : null;
    //var blockDescription = showDescription ? <div> { block.description } </div> : null;

    var prefix_array = prefix.split( '/' );
    const namespace = prefix_array[0];

    var block_types = getBlockTypes();
    block_types = block_types.filter( namespaceFilter, namespace );
    //block_types = block_types.sortByField( "name");
    block_types = block_types.sort( (a, b) => a.title.localeCompare(b.title));
    //console.log( block_types );

    var count_blocks = block_types.length;
    //var blocklist = null;

    if ( showBatch ) {
        if ( showCreateBlockLink ) {
            var blocklist = <pre>
                rem Blocks {count_blocks}
                <br />
                {block_types.map((block ) => BlockCreateBlockLink( block, component )) }

            </pre>
        } else {
            var blocklist = <pre>
            rem Blocks {count_blocks}
                <br/>
            cd ~/public_html/wp-content/plugins/oik-shortcodes/admin
                {block_types.map((block) => BlockCreateItem(block, component))}
                <br/>
            </pre>
        }
    } else
    {
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
console.log( block );
    var blockLink = null;

    if ( showBlockLink ) {
        blockLink = getBlockLink( block );
    }

    var blockSupportsInserter = null;
    blockSupportsInserter = BlockSupportsInserter( block) ;

    return( <Fragment key={block.name}>
            <dt >
                <BlockIcon icon={block.icon.src} />
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


function BlockCreateItem( block, component ) {
    //console.log( block );
    var url = window.location.hostname;
    var keywords = block.keywords ? block.keywords.join() : null;
    if ( component == '') {
        component = "?enter component?";
    }
    return( <Fragment key={block.name}>
        <br/>oikwp oik-create-blocks.php {block.name} "{block.title}" {component} url={url}
        <br/>oikwp oik-update-blocks.php {block.name} "{keywords}" {block.category} url={url}
    </Fragment> );
}

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
    var blockIcon = renderToString( <BlockIcon icon={block.icon.src } /> );
    url = addQueryArgs( url, { icon: blockIcon });
    //console.log( url );
    return( <a key={block.name} href={ url }>
        Create/Update: {block.title} - {block.name}<br />
    </a>
    );
}

export  { BlockListStyled, BlockListItem };