/*
 * Block info - displays the fields for the block info block
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { Component, Fragment }  = wp.element;
const { getBlockTypes, getBlockType } = wp.blocks;
const { BlockIcon } = wp.editor;
const { SelectControl } = wp.components;

import { BlockiconStyled } from '../oik-blockicon/blockicons.js';

function BlockinfoStyled( blockname, showBlockTypeName, showTitle, showDescription, ...props ) {
    var block = getBlockType( blockname ) ;
    var blockicon =  BlockiconStyled( blockname, props  );
    var blockTypeName =  showBlockTypeName ? <div>{ blockname }</div> : null;
    var blockTitle = showTitle ? <div> {block.title } </div> : null;
    var blockDescription = showDescription ? <div> { block.description } </div> : null;

    return(
        <Fragment>
            { blockicon }
            { blockTypeName }
            { blockTitle }
            { blockDescription }
        </Fragment>

    );
}


export  { BlockinfoStyled };