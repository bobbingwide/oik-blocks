/*
 * Block icons select control
 *
 * I don't fully understand when to use `function Blah` vs `class Blah extends Component`
 * I supposed it's just a syntax thing.. modern JavaScript ES2015 vs original.
 * So here we have a mixture.
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { Component }  = wp.element;
const{ getBlockTypes, getBlockType } = wp.blocks;
const { BlockIcon } = wp.blockEditor;
const { SelectControl } = wp.components;

function BlockiconsSelect( { value, onChange, ...props } ) {

    const options = getOptions();
    //console.log( options );
    options.sort( compareValues );
    //console.log( options );

    return (


            <SelectControl label="Blocks" value={ value } options={ options } onChange={ onChange } />
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
        const options = block_types.map ( ( block ) => getBlockiconOption( block ) );
        //console.log( options );
        return options;
    }

    function getBlockiconOption( block ) {
        //var label = BlockiconStyled( block.name );

        var label = getOptionLabel( block );
        var value = block.name;
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
            <BlockIcon icon={block.icon.src} />
            {block.name } {block.title }
        </li> );
    }

}

function BlockiconStyled( blockname, ...props ) {
    var block = getBlockType( blockname ) ;

    return(
        <div className={ props.className } >
            { block ? <BlockIcon icon={ block.icon.src } /> : <p>Hmm</p> }
        </div>


    );
}


export  { BlockiconsSelect, BlockiconStyled };