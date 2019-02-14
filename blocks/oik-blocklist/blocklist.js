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

import { BlockiconStyled } from '../oik-blockicon/blockicons.js';
import { getNameSpace} from './blockprefix.js';

function BlockListStyled( prefix, showBlockTypeName, showTitle, showDescription, ...props ) {
    //var block = getBlockType( blockname ) ;
    //var blockicon =  BlockiconStyled( blockname, props  );
    //var blockTypeName =  showBlockTypeName ? <div>{ blockname }</div> : null;
    //var blockTitle = showTitle ? <div> {block.title } </div> : null;
    //var blockDescription = showDescription ? <div> { block.description } </div> : null;

    var prefix_array = prefix.split( '/' );
    const namespace = prefix_array[0];

    var block_types = getBlockTypes();
    block_types = block_types.filter( namespaceFilter, namespace );
    //block_types = block_types.sortByField( "name");
    block_types = block_types.sort( (a, b) => a.title.localeCompare(b.title));
    //console.log( block_types );
    return(
        <dl>

            { block_types.map ( ( block ) => BlockListItem( block ) )}
        </dl>

    );


}

function namespaceFilter( element, index, array ) {

    var element_namespace = getNameSpace(element);
    var filter_result = ( this == element_namespace);
    return filter_result;
}


function BlockListItem( block ) {
/* { block.icon */
/* console.log( block ); */
    return( <Fragment>
            <dt>
                <BlockIcon icon={block.icon.src} />

            </dt>
            <dd>
                {block.title } - {block.name }<br />
                {block.description}
            </dd>
        </Fragment>
        );
}

export  { BlockListStyled };