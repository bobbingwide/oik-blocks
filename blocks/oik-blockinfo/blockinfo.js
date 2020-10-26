/*
 * Block info renderer - displays the fields for the block info block
 *
 * @copyright (C) Copyright Bobbing Wide 2019,2020
 * @author Herb Miller @bobbingwide
 *
 */


import {BlockSupportsInserter, getBlockorVariation} from "../oik-blockicon/blockicons";
import {BlockVariations } from "../oik-blockicon/blockvariations";
const { getBlockType } = wp.blocks;
import { BlockiconStyled } from '../oik-blockicon/blockicons.js';
import { BlockListItem } from '../oik-blocklist/blocklist';


/**
 *
 * @param blocknamebarvariation
 * @param showBlockLink boolean - true if we only want to display a block link similar to the block list
 * @param showBlockIcon - true when we want to display the block's icon
 * @param showBlockTypeName
 * @param showTitle
 * @param showDescription
 * @param showCategory
 * @param showKeywords
 * @param showVariations
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BlockinfoStyled( blocknamebarvariation, showBlockLink, showBlockIcon, showBlockTypeName, showTitle, showDescription, showCategory, showKeywords, showVariations, ...props ) {
    //console.log( blocknamebarvariation );
    var block = getBlockorVariation(blocknamebarvariation);

    if (showBlockLink) {
        var blockListItem = BlockListItem(block, showBlockLink);
        return (
            <dl>
                {blockListItem}
            </dl>
        )
    } else {
        //console.log( block );
        var blockicon = showBlockIcon ? BlockiconStyled(blocknamebarvariation, props) : null;
        var blockTypeName = showBlockTypeName ? <div>{block.block_name} {block.name}</div> : null;
        var blockTitle = showTitle ? <div>{block.title}</div> : null;
        var blockDescription = showDescription ? <div>{block.description}</div> : null;
        var blockCategory = showCategory ? <div>{block.category}</div> : null;
        var keywords = block.keywords ? block.keywords.join() : null;
        var blockKeywords = showKeywords ? <div>{keywords}</div> : null;

        var blockSupportsInserter = null;
        blockSupportsInserter = BlockSupportsInserter(block);
        blockSupportsInserter = (blockSupportsInserter === '') ? null : <div>{blockSupportsInserter}</div>;
        var blockVariations = showVariations ? BlockVariations(block) : null;
        return (
            <div className={props.className}>
                {blockicon}
                {blockSupportsInserter}
                {blockTypeName}
                {blockTitle}
                {blockDescription}
                {blockCategory}
                {blockKeywords}
                {blockVariations}
            </div>

        );
    }


}

export  { BlockinfoStyled };