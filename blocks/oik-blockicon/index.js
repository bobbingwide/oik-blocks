/**
 * Implements the Block icon block
 *
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 */
import './style.scss';
import './editor.scss';

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
// Get registerBlockType from wp.blocks
const {
    registerBlockType,
} = wp.blocks;
const {
    BlockIcon,
    InspectorControls,
} = wp.editor;

const {
    Toolbar,
    PanelBody,
    PanelRow,
    FormToggle,
    ServerSideRender,
    TextControl,
    Dashicon,

} = wp.components;

import { BlockiconsSelect, BlockiconStyled } from './blockicons.js';

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/blockicon',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Block icon' ),

        description: 'Displays a Block icon',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'widgets',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'block-default',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'icon' ),
            __( 'oik' ),
            __( 'block'),
        ],

        // Set for each piece of dynamic data used in your block

        attributes: {

            blockicon: {
                type: 'string',
                default: 'oik-block/blockicon'
            }

        },

        /**
         * I could get some part of the Style Variations to work but could not get
         * the SVG to adjust in size.
         *
         * https://code.tutsplus.com/tutorials/implementing-block-style-variations-in-gutenberg-part-1--cms-32243

        styles: [
            { name: 'default', label: 'Default', isDefault: true },
            { name: 'svg64', label: 'Large' },
        ],
        */

        edit: props => {


            const onChangeBlockicon = ( event ) => {
                props.setAttributes( { blockicon: event } );
            }

            var blockicon = BlockiconStyled( props.attributes.blockicon, props );

            return [
                <InspectorControls >
                    <PanelBody>



                        <PanelRow>
                            <BlockiconsSelect value={ props.attributes.blockicon } onChange={ onChangeBlockicon } />
                        </PanelRow>



                    </PanelBody>

                </InspectorControls>
                ,
                <div className={ props.className }>
                    { blockicon }
                </div>

            ];
        },
        /*
        <ServerSideRender
                    block="oik-block/dashicon" attributes={ props.attributes }
                />
         */
        save: props => {
            return BlockiconStyled( props.attributes.blockicon, props );
        },
    },
);
