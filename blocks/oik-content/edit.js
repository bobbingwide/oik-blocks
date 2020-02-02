/**
 * Implements the edit part of oik/content-block
 *
 * @copyright (C) Copyright Bobbing Wide 2020
 * @author Herb Miller @bobbingwide
 */
const { __ } = wp.i18n;
const {
    Editable,

    AlignmentToolbar,
    BlockControls,
    ServerSideRender,
} = wp.editor;
const {
    PlainText,
    InspectorControls,
} = wp.blockEditor;

const {
   withInstanceId,
} = wp.compose;

const {
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    TextareaControl,
    SelectControl,
} = wp.components;
const Fragment = wp.element.Fragment;
import { map, partial, has } from 'lodash';




import {bw_shortcodes, getAttributes} from "./bw_shortcodes";
import {PostTypes} from "./post_type";

const edit= withInstanceId(
    ( { attributes, setAttributes, instanceId, isSelected } ) => {
        const inputId = `blocks-shortcode-input-${ instanceId }`;


        const onChangeContent = ( value ) => {
            setAttributes( { content: value } );
        };

        const onChangeParameters = ( value ) => {
            setAttributes( { parameters: value } );
        }

        const onChangeShortcode = ( value ) => {

            attributes = getAttributes( value );
            setAttributes( { shortcode: value } );
        };


        function onChangeAttr( key, value ) {
            //var nextAttributes = {};
            //nextAttributes[ key ] = value;
            //setAttributes( nextAttributes );
            setAttributes( { [key] : value } );
        };

        const onChangePostType = ( value ) => {
            attributes = getAttributes( value );
            setAttributes( { post_type: value });
        }

        const onChangePostParent = ( value ) => {
            setAttributes( { post_parent: value });
        }

        const onChangeNumberPosts = ( value ) => {
            setAttributes( { number_posts: value } );
        }


        /*
                           <GenericAttrs value={attributes.shortcode} />
        */
        return (
            <Fragment>

                <InspectorControls>
                    <PanelBody>
                        <SelectControl label="Display" value={attributes.shortcode}
                                       options={ map( bw_shortcodes, ( key, label ) => ( { value: label, label: label + ' - ' + key } ) ) }
                                       onChange={partial( onChangeAttr, 'shortcode' )}
                        />

                        <PostTypes value={ attributes.post_type } onChange={onChangePostType } />

                        <TextareaControl label="Parameters"
                                         value={ attributes.parameters }
                                         placeholder={ __( 'Enter your shortcode parameters' ) }
                                         onChange={onChangeParameters}
                                         rows="1"
                        />
                        <TextareaControl label="Content"
                                         id={ inputId }
                                         value={ attributes.content }
                                         placeholder={ __( 'Enter your shortcode content' ) }
                                         onChange={onChangeContent}
                        />






                    </PanelBody>
                </InspectorControls>


                <div className="wp-block-oik-block-shortcode wp-block-shortcode">
                    <SelectControl label="Display" value={attributes.shortcode}
                                   options={ map( bw_shortcodes, ( key, label ) => ( { value: label, label: label + ' - ' + key } ) ) }
                                   onChange={partial( onChangeAttr, 'shortcode' )}
                    />



                </div>
                <div>
                    <ServerSideRender
                        block="oik/content-block" attributes={ attributes }
                    />
                </div>
            </Fragment>

        );
    }
)

export { edit };
