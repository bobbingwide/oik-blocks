/**
 * Implements the Block icon block
 *
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 */
//import './style.scss';
//import './editor.scss';

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

//import { DashiconsSelect } from './dashicons.js';
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
                default: ''
            }


        },

        edit: props => {


            const onChangeBlockicon = ( event ) => {
                props.setAttributes( { blockicon: event } );
            }

            var blockicon = BlockiconStyled( props.attributes.blockicon );


            return [
                <InspectorControls >
                    <PanelBody>

                        <PanelRow>
                            <TextControl label="Blockicon"
                                         value={ props.attributes.blockicon }
                                         onChange={ onChangeBlockicon }
                            />
                        </PanelRow>
                        <PanelRow>
                            <BlockiconsSelect />
                        </PanelRow>



                    </PanelBody>

                </InspectorControls>
                ,
                <p>
                    { blockicon }


                </p>

            ];
        },
        /*
        <ServerSideRender
                    block="oik-block/dashicon" attributes={ props.attributes }
                />
         */
        save: props => {
            return BlockiconStyled( props.attributes.blockicon );
        },
    },
);
