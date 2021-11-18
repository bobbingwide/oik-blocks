/*
 * Block icons select control
 *
 * I don't fully understand when to use `function Blah` vs `class Blah extends Component`
 * I supposed it's just a syntax thing.. modern JavaScript ES2015 vs original.
 * So here we have a mixture.
 *
 * @copyright (C) Copyright Bobbing Wide 2019,2020,2021
 * @author Herb Miller @bobbingwide
 *
 */
import { __ } from '@wordpress/i18n';

import { Component } from '@wordpress/element';
import { getBlockTypes, getBlockType, hasBlockSupport, getBlockVariations } from '@wordpress/blocks';
import { BlockIcon } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

import { SelectControl } from '@wordpress/components';
import { getAllBlockVariations, cloneVariation } from '../oik-blockicon/blockvariations';

function BlockiconsSelect( { value, onChange, ...props } ) {

    const options = getOptions();
    //console.log( options );
    options.sort( compareValues );
    //console.log( options );

    return (


            <SelectControl label={ __("Blocks", 'oik-blocks' )} value={ value } options={ options } onChange={ onChange } />
    );
        //this.renderBlockiconList();

    }

    function compareValues(a, b) {
        if (a.value < b.value )
            return -1;
        if (a.value > b.value )
            return 1;
        return 0;
    }


    function getOptions() {
        var block_types = getBlockTypes();
        var block_variations = getAllBlockVariations( block_types );
        var options = block_types.map ( ( block ) => getBlockiconOption( block ) );
        //console.log( options );
        const optionsVariations = block_variations.map( ( block ) => getBlockVariationiconOption( block ) );
        options = options.concat( optionsVariations );

        return options;
    }

    function getBlockiconOption( block ) {
        //var label = BlockiconStyled( block.name );

        var label = getOptionLabel( block );
        var value = block.name;
        return {'label': label, 'value': value };
    }

/**
 * With a block variation we need to know both the block name and the variation name.
 * We use a vertical bar ('|') as separator
 * @param block
 * @returns {{label: string, value: *}}
 */

function getBlockVariationiconOption( block ) {
        //var label = BlockiconStyled( block.name );

        var label = getVariationOptionLabel( block );
        var value = block.block_name + '|' + block.name;
        return {'label': label, 'value': value };
}

/**
 * So how do I get the icon into the option label?
 * It seems it's not possible.
 *
 * @param block
 * @returns {string}
 */

function getOptionLabel( block ) {
        var label = `${block.name} - ${ block.title }`;
        return label;
    }

function getVariationOptionLabel( block ) {
    var label = `${block.block_name} - ${block.name} - ${ block.title }`;
    return label;
}


class BlockiconList extends Component {

    renderBlockiconList() {
        var block_types = getBlockTypes();
        /*console.log( block_types );*/
        return(
            <ul>
                { block_types.map ( ( block ) => this.renderBlockicon( block ) )}
            </ul>
        );

    }

    renderBlockicon( block ) {
        /* { block.icon */
        /* console.log( block ); */
        return( <li>
            <Icon icon={block.icon.src} />
            {block.name } {block.title }
        </li> );
    }

}

/**
 * Displays the icon for the selected block or block variation.
 *
 * How does Gutenberg do it?
 *
 * @param blockname
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function BlockiconStyled( blocknamebarvariation, ...props ) {
    var block = getBlockorVariation( blocknamebarvariation );
    return(
        <div className={ props.className } >
            { block ? <Icon icon={ block.icon && block.icon.src ? block.icon.src : block.icon } /> : <p>Hmm</p> }
        </div>


    );
}

/**
 * Retrieves a block or block variation.
 *
 *
 * @param blocknamebarvariation string format `blockname|variation`
 * @returns {*}
 */

function getBlockorVariation( blocknamebarvariation ) {
    //console.log( blocknamebarvariation );
    var parts = blocknamebarvariation.split( '|');
    var blockname = parts[0];
    var block = getBlockType( blockname ) ;
    if ( block === undefined ) {
        block = getBlockType("core/missing");
    }
    var variation_name = undefined;
    if ( parts.length > 1 ) {
        variation_name = parts[1];
        //var variations = getBlockVariations( blockname, 'block');
        if ( undefined !== block.variations ) {
            var variations = block.variations;
            var variation = variations.find(variation => variation.name === variation_name);
            if (variation) {
                block = cloneVariation(variation, block);
            }
        }

    }
    if ( block.block_name === undefined ) {
        block.block_name = '';
        block.block_title = '';
    }
    return block;
}

function BlockSupportsInserter( block ) {
    return hasBlockSupport( block, 'inserter', true) ?  '' : ' ( Not insertable )';
}

export  { BlockiconsSelect, BlockiconStyled, BlockSupportsInserter, getBlockorVariation };