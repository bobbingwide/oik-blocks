/**
 * Implements [bw_fields/ / [bw_field] as a server rendered block
 *
 * - Depends on oik-fields
 * - Supports easier to use attributes for simple field options; featured,
 * - Allows option to display Labels or not; [bw_fields] => labels, [bw_field] => no labels
 * - Server side rendering when the block is not selected.
 * - Not yet aware of the Fields associated with a CPT
 * - Does not require fields to be exposed in the REST API
 *
 * @copyright (C) Copyright Bobbing Wide 2018-2021
 * @author Herb Miller @bobbingwide
 */
//import './style.scss';
//import './editor.scss';
import { registerBlockType } from '@wordpress/blocks';
import {__} from "@wordpress/i18n";

import clsx from 'clsx';
import ServerSideRender from '@wordpress/server-side-render';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
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

import {AlignmentControl, BlockControls, InspectorControls, useBlockProps, PlainText} from '@wordpress/block-editor';

/**
 * These are the different options for "virtual" fields
 */
const fieldsOptions =
    { "none": __("All", 'oik-blocks' ),
        "featured": __("Featured image", 'oik-blocks' ),
        "file_size": __("File size of attachment", 'oik-blocks' ),
        "dimensions": __("Image dimensions", 'oik-blocks' ),
        "thumbnail": __("Thumbnail", 'oik-blocks' ),
        "googlemap": __("Google Maps Map", 'oik-blocks' ),
        "template": __("Page template name", 'oik-blocks' ),
        "post_date": __("Post date", 'oik-blocks' ),
        "post_modified": __("Post modified date", 'oik-blocks' ),
        //"author": __("Author", 'oik-blocks' ),
        "author_name": __("Author name", 'oik-blocks' )
    };



/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/fields',
    {
        example: {
        },
        edit: props => {
            const { attributes, setAttributes, instanceId, focus, isSelected } = props;
            const { textAlign, label } = props.attributes;
            const blockProps = useBlockProps( {
                className: clsx( {
                    [ `has-text-align-${ textAlign }` ]: textAlign,
                } ),
            } );

            /**
             * Attempt a generic function to apply a change
             * using the partial technique
             *
             * key needs to be in [] otherwise it becomes a literal
             *
             */
            //onChange={ partial( handleChange, 'someKey' ) }

            function onChangeAttr( key, value ) {
                //var nextAttributes = {};
                //nextAttributes[ key ] = value;
                //setAttributes( nextAttributes );
                props.setAttributes( { [key] : value } );
            };

            return (
                <Fragment>
                    <InspectorControls >
                        <PanelBody>
                            <PanelRow>
                                <SelectControl label={__("Fields", 'oik-blocks')} value={props.attributes.fields}
                                               options={ map( fieldsOptions, ( key, label ) => ( { value: label, label: key } ) ) }
                                               onChange={partial( onChangeAttr, 'fields' )}
                                />

                            </PanelRow>


                        </PanelBody>

                    </InspectorControls>
                    <div {...blockProps } >
                    <ServerSideRender
                        block="oik-block/fields" attributes={ props.attributes }
                    />
                    </div>
                </Fragment>
            );
        },

        save() {
            return null;
        },
    },
);
