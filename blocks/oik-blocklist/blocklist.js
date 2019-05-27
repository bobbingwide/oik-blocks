/*
 * Block list renderer - displays the Block list for the selected namespace prefix
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { getBlockType, getBlockTypes } = wp.blocks;
const { BlockIcon } = wp.editor;
const Fragment = wp.element.Fragment;
// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
const { select } = wp.data;

import { BlockiconStyled } from '../oik-blockicon/blockicons.js';
import { getNameSpace} from './blockprefix.js';


function BlockListStyled( prefix, showBlockLink, showTitle, showDescription, showBatch, component, ...props ) {
    //var block = getBlockType( blockname ) ;
    //var blockicon =  BlockiconStyled( blockname, props  );
    //var BlockLink =  showBlockLink ? <div>{ blockname }</div> : null;
    //var blockTitle = showTitle ? <div> {block.title } </div> : null;
    //var blockDescription = showDescription ? <div> { block.description } </div> : null;

    var prefix_array = prefix.split( '/' );
    const namespace = prefix_array[0];

    var block_types = getBlockTypes();
    block_types = block_types.filter( namespaceFilter, namespace );
    //block_types = block_types.sortByField( "name");
    block_types = block_types.sort( (a, b) => a.title.localeCompare(b.title));
    //console.log( block_types );

    if ( showBatch ) {
        var blocklist =  <pre>
            cd ~/public_html/wp-content/plugins/oik-shortcodes/admin
            {block_types.map( (block) => BlockCreateItem( block, component )) }
            <br />
        </pre>
    } else
    {
        var blocklist =
        <dl>
            {block_types.map((block) => BlockListItem(block, showBlockLink))}
        </dl>
    }
    ;



    return( blocklist  );


}

function namespaceFilter( element, index, array ) {

    var element_namespace = getNameSpace(element);
    var filter_result = ( this == element_namespace);
    return filter_result;
}

    function getBlockLink( block ) {
        var blockTitle = block.title.replace( ' ', '-' );
        var blockName = block.name.replace( '/', '-' );
        var blockLink = null;
        var prefix = null;
        //const { getCurrentPostType, getPermalinkParts } = select('core/editor' );
        //console.log(getCurrentPostType());
        var siteurl = select('core/editor').getPermalinkParts();

        if ( siteurl !== null ) {

            console.log(siteurl);
            var postType = select( 'core/editor').getCurrentPostType();
            console.log( postType );

            prefix = siteurl.prefix.replace( postType, 'block');
        } else {
            console.log( "SiteURL's null");
        }

        //alert( "hey");
        blockLink = `${prefix}${blockTitle}-${blockName}`;
        return blockLink;
    }


function BlockListItem( block, showBlockLink ) {
/* { block.icon */
/* console.log( block ); */
    var blockLink = null;

    if ( showBlockLink ) {
        blockLink = getBlockLink( block );
    }

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
    return( <Fragment>
        <br/>oikwp oik-create-blocks.php {block.name} "{block.title}" {component} url={url}
        <br/>oikwp oik-update-blocks.php {block.name} "{keywords}" {block.category} url={url}
    </Fragment> );
}

export  { BlockListStyled };