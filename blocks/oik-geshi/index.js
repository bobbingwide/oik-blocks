/**
 * Implements [bw_geshi] shortcode as a server rendered block
 *
 * Uses [bw_geshi] shortcode from oik-css plugin
 *
 * @copyright (C) Copyright Bobbing Wide 2018
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
    InspectorControls,
    PlainText,
    ServerSideRender,
} = wp.editor;

const {
    Toolbar,
    PanelBody,
    PanelRow,
    FormToggle,

    TextControl,
    SelectControl,

} = wp.components;

import { map, partial } from 'lodash';
const Fragment = wp.element.Fragment;

/**
* These are the different options for the GeSHi lang= attribute.
 * It's tricky getting it to accept lang=none!
*/
const langOptions =
    { none: "None",
        html: "HTML",
        css: "CSS",
        javascript: "JavaScript",
        jquery: "jQuery",
        php: "PHP",
        mysql: "MySQL",
    };

/**
 * Register the WordPress block
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/geshi',
    {
        // Localize title using wp.i18n.__()
        title: __( 'GeSHi' ),

        description: 'Generic Syntax Highlighting - for code examples',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'layout',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'editor-code',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'GeSHi' ),
            __( 'oik' ),
            __( 'php html js'),
        ],

        // Set for each piece of dynamic data used in your block
        attributes: {
            lang: {
                type: 'string',
                default: '',
            },
            text: {
                type: 'string',
            },
            content: {
                type: 'string',
            },


        },


        supports: {
            customClassName: false,
            className: false,
            html: false,
        },

        edit: props => {

            const onChangeLang =  ( event ) => {
                props.setAttributes( { lang: event } );
            };
            const onChangeText = ( event ) => {
                props.setAttributes( { text: event } );
            };
            const onChangeContent = ( value ) => {
                props.setAttributes( { content: value } );
            };

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

            const isSelected = props.isSelected;




            return (
                <Fragment>
                <InspectorControls >
                    <PanelBody>
                        <PanelRow>
                            <SelectControl label="Lang" value={props.attributes.lang}
                                           options={ map( langOptions, ( key, label ) => ( { value: label, label: key } ) ) }
                                           onChange={partial( onChangeAttr, 'lang' )}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl label="Text"
                                         value={ props.attributes.text }
                                         onChange={ onChangeText }
                            />
                        </PanelRow>

                    </PanelBody>

                </InspectorControls>
                    {!isSelected &&
                    <ServerSideRender
                        block="oik-block/geshi" attributes={props.attributes}
                    />
                    }

                    {isSelected &&
                    <div className="wp-block-oik-block-geshi wp-block-shortcode" key="content-input">
                    <PlainText
                        value={props.attributes.content}
                        placeholder={__('Write code')}
                        onChange={onChangeContent}
                    />
                    </div>
                    }


                </Fragment>

        );
        },


        save() {
            return null;
        },
    },
);
