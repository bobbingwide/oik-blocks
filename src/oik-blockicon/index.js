/**
 * Implements the Block icon block
 *
 *
 * @copyright (C) Copyright Bobbing Wide 2019-2021
 * @author Herb Miller @bobbingwide
 */
import './style.scss';
import './editor.scss';

import { __ } from '@wordpress/i18n';
import clsx from 'clsx';

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
    SelectControl } from '@wordpress/components';
import { Fragment} from '@wordpress/element';
import { map, partial } from 'lodash';
import { BlockiconsSelect, BlockiconStyled } from './blockicons.js';

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/blockicon',
    {
        example: {
        },

        /**
         * I could get some part of the Style Variations to work but could not get
         * the SVG to adjust in size.
         *
         * https://code.tutsplus.com/tutorials/implementing-block-style-variations-in-gutenberg-part-1--cms-32243
         */
        styles: [
            { name: 'svg24', label: '24px'},
            { name: 'svg64', label: '64px', isDefault: true  },
            { name: 'svg100', label: '100px'},
            { name: 'svg150', label: '150px'},
        ],


        edit: props => {
            const { attributes, setAttributes, instanceId, focus, isSelected } = props;
            const { textAlign, label } = props.attributes;
            const blockProps = useBlockProps( {
                className: clsx( {
                    [ `has-text-align-${ textAlign }` ]: textAlign,
                } ),
            } );



            const onChangeBlockicon = ( event ) => {
                props.setAttributes( { blockicon: event } );
            }

            var blockicon = BlockiconStyled( props.attributes.blockicon, props );

            return (
                <Fragment>
                <InspectorControls >
                    <PanelBody>



                        <PanelRow>
                            <BlockiconsSelect value={ props.attributes.blockicon } onChange={ onChangeBlockicon } />
                        </PanelRow>



                    </PanelBody>

                </InspectorControls>

                <div {...blockProps}>
                    { blockicon }
                </div>
                </Fragment>

            );
        },

        save: props => {
            const blockProps = useBlockProps.save();
            var blockicon = BlockiconStyled( props.attributes.blockicon, props );
            return(
                <div {...blockProps}>
                    { blockicon }
                </div>
            );
        },
    },
);