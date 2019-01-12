/*
 * Block icons
 */
import {dashiconslist} from "./dashiconlist";

const { Component }  = wp.element;
const{ getBlockTypes } = wp.blocks;
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
        console.log( block );
        return( <li>
            <BlockIcon icon={block.icon.src} />
            {block.name } {block.title }
        </li> );
    }
}



export  { BlockiconsSelect };