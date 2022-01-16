/**
 * Implements the Block list block
 *
 * This block displays a list of blocks associated with a block type name prefix e.g. core, oik-block
 * It's used to help populate the list of blocks for each component that we want to document.
 *
 * Use the showVariations toggle to include any block variations delivered with the prefix.
 * For WordPress core this adds over 120 variations to the the original 71 core blocks.
 *
 * The number varies depending on the number of registered post types. See core/navigation-link
 *
 * Note: If the prefix is used by more than one plugin then the list of blocks should be produced
 * using the Block info block being repeated for each block that the plugin delivers.
 *
 * In the future this could be determined from the presence of the block.json files.
 *
 * @copyright (C) Copyright Bobbing Wide 2019, 2020, 2021, 2022
 * @author Herb Miller @bobbingwide
 */
import './style.scss';
import './editor.scss';

import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import { registerBlockType, createBlock } from '@wordpress/blocks';
import {AlignmentControl, BlockControls, InspectorControls, useBlockProps, PlainText, BlockIcon} from '@wordpress/block-editor';
import {
    Toolbar,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl } from '@wordpress/components';
import { Fragment} from '@wordpress/element';
import { map, partial } from 'lodash';

import { BlockiconsSelect, BlockiconStyled } from '../oik-blockicon/blockicons.js';
import { BlockListStyled } from './blocklist.js'
import { BlockPrefixSelect } from './blockprefix.js';


/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/blocklist',
    {
        example: {
            attributes: {
                showBlockLink: false,
                prefix: 'oik-block',
            }
        },
        edit: props => {
            const { attributes, setAttributes, instanceId, focus, isSelected } = props;
            const { textAlign, label } = props.attributes;
            const blockProps = useBlockProps( {
                className: classnames( {
                    [ `has-text-align-${ textAlign }` ]: textAlign,
                } ),
            } );


            const onChangePrefix = ( event ) => {
                //console.log( event );
                props.setAttributes( { prefix: event } );
            }

            const onChangeShowBlockLink = ( event ) => {
                props.setAttributes(  { showBlockLink: ! props.attributes.showBlockLink } );
            }

            const onChangeshowVariations = ( event ) => {
                props.setAttributes(  { showVariations: ! props.attributes.showVariations } );
            }

            const onChangeShowBatch = ( event ) => {
                props.setAttributes( { showBatch: ! props.attributes.showBatch } );
            }

            const onChangeComponent = ( event ) => {
                props.setAttributes( { component: event } );
            }

            var blocklist = BlockListStyled( props.attributes.prefix,
                props.attributes.showBlockLink,
                props.attributes.showVariations,
                props.attributes.showBatch,
                props.attributes.component,
                props );




            return (

                <Fragment>
                <InspectorControls >
                    <PanelBody>


                        <PanelRow>
                            <BlockPrefixSelect value={ props.attributes.prefix } onChange={ onChangePrefix } />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show block link', 'oik-blocks' ) }
                                checked={ !! props.attributes.showBlockLink }
                                onChange={ onChangeShowBlockLink }

                            />
                        </PanelRow>

                        <PanelRow>
                        <ToggleControl
                            label={ __( 'Show block variations', 'oik-blocks' ) }
                            checked={ !! props.attributes.showVariations }
                            onChange={ onChangeshowVariations }

                        />

                    </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show batch commands', 'oik-blocks' ) }
                                checked={ !! props.attributes.showBatch }
                                onChange={ onChangeShowBatch }

                            />

                        </PanelRow>

                    <PanelRow>
                        <TextControl label={__( "Component", 'oik-blocks' )} value={ props.attributes.component} onChange={ onChangeComponent }/>
                    </PanelRow>



                    </PanelBody>

                </InspectorControls>

                <div { ...blockProps }>
                { blocklist }
                </div>
                    </Fragment>



            );
        },

        save: props => {
            //console.log( "BlockListStyled - save");
            const blockProps = useBlockProps.save();
            var blocklist = BlockListStyled( props.attributes.prefix,
                props.attributes.showBlockLink,
                props.attributes.showVariations,
                props.attributes.showBatch,
                props.attributes.component,
                props );
            return (
                <div { ...blockProps }>
                    { blocklist }
                </div>
            );
        },
    },
);