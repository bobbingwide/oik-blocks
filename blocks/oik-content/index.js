/**
 * Implements the oik dynamic content shortcodes block
 *
 * @copyright (C) Copyright Bobbing Wide 2020
 * @author Herb Miller @bobbingwide
 */
//import './style.scss';
import './editor.scss';

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
// Get registerBlockType and Editable from wp.blocks
const {
    registerBlockType,
} = wp.blocks;


const {
    Toolbar,
    Button,
    Tooltip,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    TextareaControl,
    SelectControl,
} = wp.components;


const Fragment = wp.element.Fragment;
const RawHTML = wp.element.RawHTML;

//var TextControl = wp.blocks.InspectorControls.TextControl;

import { bw_shortcodes, getAttributes, bw_shortcodes_attrs } from './bw_shortcodes';
import { BwQueryControls } from './query_controls';

//import GenericAttrs from './GenericAttrs';
import { PostTypes } from './post_type';
import { edit } from './edit';

import { map, partial, has } from 'lodash';

import { shortcode_attributes} from './attributes';



/**
 * Register the oik-block/shortcode-block block
 *
 * registerBlockType is a function which takes the name of the block to register
 * and an object that contains the properties of the block.
 * Some of these properties are objects and others are functions
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik/content-block',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Dynamic content block' ),

        description: 'Expands content for dynamic oik shortcodes.',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'layout',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'shortcode',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'Content' ),
            __( 'Shortcode' ),
            __( 'Dynamic'),
            __( 'oik' ),
        ],

        // Set for each piece of dynamic data used in your block
        // The shortcode should be displayed as a select list
        // with text override. a la?

        // We can't set a default for the shortcode since the attribute is not created when it's the default value
        // This can probably be used to our advantage if we expect the default value to come from options.

        attributes: shortcode_attributes,

        supports: {
            customClassName: false,
            className: true,
            html: false,
            align: true,
            alignWide: true,
            alignFull: true,
        },

        edit,



        save( { attributes } ) {
            return null;
        },
    },
);

