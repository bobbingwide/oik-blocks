/**
 * Implements the Block info block
 *
 * This block displays the selected fields from a block's registration
 *
 * - BlockIcon, hopefully using oik-blockicon
 * - block type name
 * - Title
 * - Description
 * - Category - future
 * - Keywords - future
 *
 * Each field is optional.
 * You can't choose the order but you can try to style it!
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
import { BlockiconsSelect, BlockiconStyled } from '../oik-blockicon/blockicons.js';
import { BlockinfoStyled } from './blockinfo.js'
//import {ToggleControl} from "../../../gutenberg-source/packages/components/build-module";

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/blockinfo',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Block info' ),

        description: 'Displays a Block\'s information',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'widgets',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'block-default',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'info' ),
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
                default: true
            },

            showTitle: {
                type: 'boolean',
                default: true
            },

            showDescription: {
                type: 'boolean',
                default: true
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

            var blockicon = BlockinfoStyled( props.attributes.blockicon,
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
            return BlockinfoStyled( props.attributes.blockicon, props.attributes.showBlockTypeName, props.attributes.showTitle );
        },
    },
);
