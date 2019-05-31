/*
 * Block info renderer - displays the fields for the block info block
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { getBlockType } = wp.blocks;

import { BlockiconStyled } from '../oik-blockicon/blockicons.js';

function BlockinfoStyled( blockname, showBlockTypeName, showTitle, showDescription, showCategory, showKeywords, ...props ) {
    var block = getBlockType( blockname ) ;
    if ( block === undefined ) {
        block = getBlockType("core/missing");
    }
    var blockicon = BlockiconStyled(blockname, props);
    var blockTypeName = showBlockTypeName ? <div>{blockname}</div> : null;
    var blockTitle = showTitle ? <div>{block.title}</div> : null;
    var blockDescription = showDescription ? <div>{block.description}</div> : null;
    var blockCategory = showCategory ? <div>{block.category}</div> : null;
    var keywords = block.keywords ? block.keywords.join() : null;
    var blockKeywords = showKeywords ? <div>{keywords}</div> : null;


    return(
        <div className={ props.className }>
            { blockicon }
            { blockTypeName }
            { blockTitle }
            { blockDescription }
            { blockCategory }
            { blockKeywords }
        </div>

    );
}

export  { BlockinfoStyled };