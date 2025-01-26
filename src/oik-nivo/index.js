/**
 * Implements Nivo slider shortcode block
 * 
 * Uses [nivo] shortcode.
 *
 * @copyright (C) Copyright Bobbing Wide 2018-2021
 * @author Herb Miller @bobbingwide
 */
import './style.scss';
import './editor.scss';

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
import { Fragment, RawHTML } from '@wordpress/element';
import { map, partial } from 'lodash';

import {AlignmentControl, BlockControls, InspectorControls, useBlockProps, PlainText} from '@wordpress/block-editor';

/**
 * Attempt to find an easier way to define each attribute
 * which is a shortcode parameter
                 , "theme" => BW_::bw_skv( "default", "bar|custom|dark|light|orman|pascal|oik271|default271", __( "Theme for the slideshow", "oik-nivo-slider" ) )
 */
const blockAttributes = {
	theme: {
		type: 'string',
		default: 'default',
	},
	id: {
		type: 'string',
		default: '',
	},
	effect: {
		type: 'string',
		default: '',
	},
	
};


/**
 * These are the different options for the Theme select list
 * 
 * But I don't know how map() works so it all appears to be arse about face.
 */
const themeOptions = 
{ default: __("Default", 'oik-blocks' ),
  bar: __("Bar", 'oik-blocks' ),
};

/**
 * Register 
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/nivo',
    {

        edit: props => {
			const { attributes, setAttributes, instanceId, focus, isSelected } = props;
			const { textAlign, label } = props.attributes;
			const blockProps = useBlockProps( {
				className: clsx( {
					[ `has-text-align-${ textAlign }` ]: textAlign,
				} ),
			} );
				
				
					const onChangeTheme = ( event ) => {
						props.setAttributes( { theme: event } );
					};
					
					const onChangeId = ( event ) => {
						props.setAttributes( { id: event } );
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
					
					
				
					var atts = props.attributes;
					var chatts = '[nivo'; 	
					for (var key of Object.keys( atts )) {
						var value = atts[key];
						if ( value ) {
							chatts = chatts + " " + key + "=\"" + value + '"';
						}
					}
					chatts = chatts + ']';
					
          return [
						
  					
              <InspectorControls>
								<PanelBody>
									<TextControl label={__("Theme",'oik-blocks' )} value={props.attributes.theme} id="theme" onChange={onChangeTheme} />
									<TextControl label={__("IDs", 'oik-blocks' )} value={props.attributes.id} onChange={onChangeId} />
									<TextControl label={__("Effect",'oik-blocks' )} value={props.attributes.effect} onChange={ partial( onChangeAttr, 'effect' )} />
									 
																	
									<SelectControl label="t2" value={props.attributes.theme}
										options={ map( themeOptions, ( key, label ) => ( { value: label, label: key } ) ) }
										onChange={partial( onChangeAttr, 'theme' )}
									/>
								</PanelBody>
              </InspectorControls>
  					,
					
					
            <div {...blockProps}>
				<Fragment>{chatts}</Fragment>
			</div>
          ];
        },
        save: props => {
			const blockProps = useBlockProps.save();
			var lsb = '[';
			var rsb = ']';
			var atts = props.attributes;
			var chatts = '[nivo';
			for (var key of Object.keys( atts )) {
				var value = atts[key];
				if ( value ) {
					chatts = chatts + " " + key + "=\"" + value + '"';
				}
			}
			chatts = chatts + ']';
			return( <RawHTML {...blockProps}>{chatts}</RawHTML> );
        }
    }
);