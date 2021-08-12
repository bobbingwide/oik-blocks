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
 * @copyright (C) Copyright Bobbing Wide 2019, 2020, 2021
 * @author Herb Miller @bobbingwide
 */
import './style.scss';
import './editor.scss';


import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import { registerBlockType, createBlock } from '@wordpress/blocks';
import {AlignmentControl, BlockControls, InspectorControls, useBlockProps, PlainText, BlockIcon} from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
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
import { BlockinfoStyled } from './blockinfo.js';

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/blockinfo',
    {
        example: {
        },

        transforms: {
            from: [
                {
                    type: 'block',
                    blocks: ['oik-block/blockicon'],
                    transform: function( attributes ) {
                        return createBlock( 'oik-block/blockinfo', {
                            blockicon: attributes.blockicon,
                        });
                    },
                },
            ],
            to: [
                {
                    type: 'block',
                    blocks: ['oik-block/blockicon'],
                    transform: function( attributes ) {
                        return createBlock( 'oik-block/blockicon', {
                            blockicon: attributes.blockicon,
                        });
                    },
                }
            ]
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
            const { attributes, setAttributes, instanceId, focus, isSelected } = props;
            const { textAlign, label } = props.attributes;
            const blockProps = useBlockProps( {
                className: classnames( {
                    [ `has-text-align-${ textAlign }` ]: textAlign,
                } ),
            } );


            const onChangeBlockicon = ( event ) => {
                props.setAttributes( { blockicon: event } );
            }
            const onChangeShowBlockTypeName = ( event ) => {
                props.setAttributes(  { showBlockTypeName: ! props.attributes.showBlockTypeName } );
            }
            const onChangeShowBlockIcon = ( event ) => {
                props.setAttributes(  { showBlockIcon: ! props.attributes.showBlockIcon } );
            }
            const onChangeShowTitle = ( event ) => {
                props.setAttributes(  { showTitle: ! props.attributes.showTitle } );
            }

            const onChangeShowDescription = ( event ) => {
                props.setAttributes(  { showDescription: ! props.attributes.showDescription } );
            }
            const onChangeShowCategory = ( event ) => {
                props.setAttributes(  { showCategory: ! props.attributes.showCategory } );
            }
            const onChangeShowKeywords = ( event ) => {
                props.setAttributes(  { showKeywords: ! props.attributes.showKeywords } );
            }

            const onChangeShowBlockLink = ( event ) => {
                props.setAttributes(  { showBlockLink: ! props.attributes.showBlockLink } );
            }


            const onChangeShowVariations = ( event ) => {
                props.setAttributes( { showVariations: !props.attributes.showVariations } );
            }

            var blockinfo = BlockinfoStyled( props.attributes.blockicon,
                props.attributes.showBlockLink,
                props.attributes.showBlockIcon,
                props.attributes.showBlockTypeName,
                props.attributes.showTitle,
                props.attributes.showDescription,
                props.attributes.showCategory,
                props.attributes.showKeywords,
                props.attributes.showVariations,
                props );


            return (

                <Fragment>
                <InspectorControls >
                    <PanelBody>



                        <PanelRow>
                            <BlockiconsSelect value={ props.attributes.blockicon } onChange={ onChangeBlockicon } />
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
                                label={ __( 'Show block icon' ) }
                                checked={ !! props.attributes.showBlockIcon }
                                onChange={ onChangeShowBlockIcon }

                            />
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
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show category' ) }
                                checked={ !! props.attributes.showCategory }
                                onChange={ onChangeShowCategory }

                            />

                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show keywords' ) }
                                checked={ !! props.attributes.showKeywords }
                                onChange={ onChangeShowKeywords }

                            />

                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Show variations' ) }
                                checked={ !! props.attributes.showVariations }
                                onChange={ onChangeShowVariations }

                            />

                        </PanelRow>



                    </PanelBody>

                </InspectorControls>

                <div {...blockProps}>
                { blockinfo }
                </div>
                </Fragment>


            );
        },

        save: props => {
            const blockProps = useBlockProps.save();
            var blockinfo =  BlockinfoStyled( props.attributes.blockicon,
                props.attributes.showBlockLink,
                props.attributes.showBlockIcon,
                props.attributes.showBlockTypeName,
                props.attributes.showTitle,
                props.attributes.showDescription,
                props.attributes.showCategory,
                props.attributes.showKeywords,
                props.attributes.showVariations,
                props );

            return(
                <div {...blockProps}>
                    { blockinfo }
                </div>
            );

        }
    }
);