/*
 * Block icons
 */
//import {dashiconslist} from "../oik-dashicon/dashiconlist";

const { Component }  = wp.element;
const{ getBlockTypes, getBlockType } = wp.blocks;
const { BlockIcon } = wp.editor;

class BlockiconsSelect extends Component {
    render() {

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