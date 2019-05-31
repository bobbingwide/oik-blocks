/**
 * Implements the Block list block
 *
 * This block displays a list of blocks associated with a block type name prefix e.g. core, core-embed, oik-block
 * I intend to use it to help populate the list of blocks for each component that we want to document.
 *
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
    createBlock,
} = wp.blocks;
const {
    BlockIcon,
    InspectorControls,
    ServerSideRender,
} = wp.editor;

const {
    Toolbar,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    ToggleControl,
    Dashicon,

} = wp.components;
const { Fragment }  = wp.element;


//import { DashiconsSelect } from './dashicons.js';
import { BlockiconsSelect, BlockiconStyled } from '../oik-blockicon/blockicons.js';
import { BlockListStyled } from './blocklist.js'
import { BlockPrefixSelect } from './blockprefix.js';
//import {ToggleControl} from "../../../gutenberg-source/packages/components/build-module";

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/blocklist',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Block list' ),

        description: 'Displays a list of Blocks for a chosen prefix',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'widgets',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'block-default',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'list' ),
            __( 'oik' ),
            __( 'block'),
        ],

        // Set for each piece of dynamic data used in your block

        attributes: {

            prefix: {
                type: 'string',
                default: 'oik-block'
            },

            showBlockLink: {
                type: 'boolean',
                default: true
            },

            showCreateBlockLink: {
                type: 'boolean',
                default: true
            },

            showDescription: {
                type: 'boolean',
                default: true
            },

            showBatch: {
                type: 'boolean',
                default: false
            },

            component: {
                type: 'string',
                default: ""
            }



        },



        edit: props => {


            const onChangePrefix = ( event ) => {
                console.log( event );
                props.setAttributes( { prefix: event } );
            }

            const onChangeShowBlockLink = ( event ) => {
                props.setAttributes(  { showBlockLink: ! props.attributes.showBlockLink } );
            }
            const onChangeshowCreateBlockLink = ( event ) => {
                props.setAttributes(  { showCreateBlockLink: ! props.attributes.showCreateBlockLink } );
            }

            const onChangeShowDescription = ( event ) => {
                props.setAttributes(  { showDescription: ! props.attributes.showDescription } );
            }

            const onChangeShowBatch = ( event ) => {
                props.setAttributes( { showBatch: ! props.attributes.showBatch } );
            }

            const onChangeComponent = ( event ) => {
                props.setAttributes( { component: event } );
            }

            var blocklist = BlockListStyled( props.attributes.prefix,
                props.attributes.showBlockLink,
                props.attributes.showCreateBlockLink,
                props.attributes.showDescription,
                props.attributes.showBatch,
                props.attributes.component,
                props );




            return [
                <InspectorControls >
                    <PanelBody>


                        <PanelRow>
                            <BlockPrefixSelect value={ props.attributes.prefix } onChange={ onChangePrefix } />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show block link' ) }
                                checked={ !! props.attributes.showBlockLink }
                                onChange={ onChangeShowBlockLink }

                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show create/update block links' ) }
                                checked={ !! props.attributes.showCreateBlockLink }
                                onChange={ onChangeshowCreateBlockLink }

                            />

                        </PanelRow>
                        <PanelRow>
                        <ToggleControl
                            label={ __( 'Show block description' ) }
                            checked={ !! props.attributes.showDescription }
                            onChange={ onChangeShowDescription }

                        />

                    </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show batch commands' ) }
                                checked={ !! props.attributes.showBatch }
                                onChange={ onChangeShowBatch }

                            />

                        </PanelRow>

                    <PanelRow>
                        <TextControl label={"Component"} value={ props.attributes.component} onChange={ onChangeComponent }/>
                    </PanelRow>



                    </PanelBody>

                </InspectorControls>
                ,
                <div className={ props.className }>
                { blocklist }
                </div>
                ,


            ];
        },
        /*
        <ServerSideRender
                    block="oik-block/dashicon" attributes={ props.attributes }
                />
         */
        save: props => {
            return BlockListStyled( props.attributes.prefix, props.attributes.showBlockLink, props.attributes.showCreateBlockLink, props.attributes.showDescription, props.attributes.showBatch, props.attributes.component, props );
        },
    },
);
