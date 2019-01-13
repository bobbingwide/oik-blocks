/*
 * Block icons
 */
//import {dashiconslist} from "../oik-dashicon/dashiconlist";

const { Component }  = wp.element;
const{ getBlockTypes, getBlockType } = wp.blocks;
const { BlockIcon } = wp.editor;
const { SelectControl } = wp.components;

function BlockiconsSelect( { value, onChange, ...props } ) {

    const options = getOptions();

    return (


            <SelectControl label="Blocks" value={ value } options={ options } onChange={ onChange } />
    );
        //this.renderBlockiconList();

    }

    function getOptions() {
        var block_types = getBlockTypes();
        const options = block_types.map ( ( block ) => getBlockiconOption( block ) );
        console.log( options );
        return options;
    }

    function getBlockiconOption( block ) {
        var label = block.name;
        var value = block.name;
        return {'label': label, 'value': value};
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

function BlockiconStyled( blockname ) {
    var block = getBlockType( blockname ) ;

    return( block ? <BlockIcon icon={ block.icon.src } /> : <p>Hmm</p> );
}


export  { BlockiconsSelect, BlockiconStyled };