/*
 * Block info renderer - displays the fields for the block info block
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { getBlockType } = wp.blocks;

import { BlockiconStyled } from '../oik-blockicon/blockicons.js';

function BlockListStyled( prefix, showBlockTypeName, showTitle, showDescription, ...props ) {
    //var block = getBlockType( blockname ) ;
    //var blockicon =  BlockiconStyled( blockname, props  );
    //var blockTypeName =  showBlockTypeName ? <div>{ blockname }</div> : null;
    //var blockTitle = showTitle ? <div> {block.title } </div> : null;
    //var blockDescription = showDescription ? <div> { block.description } </div> : null;

    var prefix_array = prefix.split( '/' );
    var namespace = prefix_array[0];
    return(
        <ul><li>Blocks for {namespace}</li></ul>

    );


}

export  { BlockListStyled };