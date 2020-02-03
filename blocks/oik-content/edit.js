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
    RangeControl,
} = wp.components;
const Fragment = wp.element.Fragment;
import { map, partial, has } from 'lodash';




import {bw_shortcodes, getAttributes} from "./bw_shortcodes";
import {PostTypes} from "./post_type";
import{ NumberPosts } from './numberposts';
import { orderby, order } from './attributes';

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
            setAttributes( { numberposts: value } );
        }

        const onChangeOrderBy = ( value ) => {
            setAttributes( { orderby: value } );
        }

        const onChangeOrder = ( value ) => {
            setAttributes( { order: value } );
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

                        <PostTypes value={ attributes.post_type } onChange={ onChangePostType } />
                        <SelectControl label="Order by" value={ attributes.orderby} options={ orderby} onChange={onChangeOrderBy} />
                        <SelectControl label="Order" value={ attributes.order} options={ order} onChange={onChangeOrder} />
                        <RangeControl label="Number posts" value={ attributes.numberposts } onChange={ onChangeNumberPosts } min={-1} max={100} />
                        <TextControl value={ attributes.post_parent} onChange={ onChangePostParent } label="Post Parent" />

                        <TextareaControl label="Advanced Parameters"
                                         value={ attributes.parameters }
                                         placeholder={ __( 'Enter your advanced shortcode parameters' ) }
                                         onChange={onChangeParameters}
                                         rows="1"
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
