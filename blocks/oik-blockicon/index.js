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
    ToggleControl,
    Dashicon,

} = wp.components;


//import { DashiconsSelect } from './dashicons.js';
import { BlockiconsSelect, BlockiconStyled } from './blockicons.js';
//import {ToggleControl} from "../../../gutenberg-source/packages/components/build-module";

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
            },

            showBlockTypeName: {
                type: 'boolean',
                default: false
            },

            showTitle: {
                type: 'boolean',
                default: false
            },

            showDescription: {
                type: 'boolean',
                default: false
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

            const onChangeShowBlockTypeName = ( event ) => {
                props.setAttributes(  { showBlockTypeName: ! props.attributes.showBlockTypeName } );
            }
            const onChangeShowTitle = ( event ) => {
                props.setAttributes(  { showTitle: ! props.attributes.showTitle } );
            }

            const onChangeShowDescription = ( event ) => {
                props.setAttributes(  { showDescription: ! props.attributes.showDescription } );
            }

            var blockicon = BlockiconStyled( props.attributes.blockicon,
                props.attributes.showBlockTypeName,
                props.attributes.showTitle,
                props.attributes.showDescription,
                props );


            return [
                <InspectorControls >
                    <PanelBody>



                        <PanelRow>
                            <BlockiconsSelect value={ props.attributes.blockicon } onChange={ onChangeBlockicon } />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show block type name' ) }
                                checked={ !! props.attributes.showBlockTypeName }
                                onChange={ onChangeShowBlockTypeName }

                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show block title' ) }
                                checked={ !! props.attributes.showTitle }
                                onChange={ onChangeShowTitle }

                            />

                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show block description' ) }
                                checked={ !! props.attributes.showDescription }
                                onChange={ onChangeShowDescription }

                            />

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
            return BlockiconStyled( props.attributes.blockicon, props.attributes.showBlockTypeName, props.attributes.showTitle );
        },
    },
);
