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
 * @copyright (C) Copyright Bobbing Wide 2018-2020
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
    ServerSideRender,
} = wp.editor;
const {
    InspectorControls,
} = wp.blockEditor;


const {
    Toolbar,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    SelectControl,
} = wp.components;
const Fragment = wp.element.Fragment;
import { map, partial } from 'lodash';


/**
 * These are the different options for "virtual" fields
 */
const fieldsOptions =
    { "none": "All",
        "featured": "Featured image",
        "file_size": "File size of attachment",
        "dimensions": "Image dimensions",
        "thumbnail": "Thumbnail",
        "googlemap": "Google Maps Map",
        "template": "Page template name",
    };
//import portOptions from './tidetimes-co-uk.js';



/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/fields',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Fields' ),

        description: 'Displays Fields',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'widgets',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'info-outline',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'field' ),
            __( 'meta'),
            __( 'oik' ),
        ],

        // Set for each piece of dynamic data used in your block
        attributes: {
            fields: {
                type: 'string',
                default: '',

            },
            labels: {
                type: 'string',
                default: ''
            },


        },
        example: {
        },
        supports: {
            customClassName: false,
            className: false,
            html: false,
        },

        edit: props => {

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
                                <SelectControl label="Fields" value={props.attributes.fields}
                                               options={ map( fieldsOptions, ( key, label ) => ( { value: label, label: key } ) ) }
                                               onChange={partial( onChangeAttr, 'fields' )}
                                />

                            </PanelRow>

                            <PanelRow>


                            </PanelRow>
                            <PanelRow>

                            </PanelRow>
                        </PanelBody>

                    </InspectorControls>

                    <ServerSideRender
                        block="oik-block/fields" attributes={ props.attributes }
                    />
                </Fragment>

            );
        },


        save() {
            return null;
        },
    },
);
