/**
 * Implements the Person block as a server rendered block
 *
 * - Depends on oik-user
 *
 * @copyright (C) Copyright Bobbing Wide 2018,2019,2020,2021
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

var themeOptions = {
    none: __("Logos", 'oik-blocks' ),
    //dash: __("Dashicons", 'oik-blocks' ),
    gener: __("Genericons", 'oik-blocks' ),
};
themeOptions = map( themeOptions, ( key, label ) => ( { value: label, label: key } ) );


/**
 * Register
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/person',
    {
        edit: props => {
            const { attributes, setAttributes, instanceId, focus, isSelected } = props;
            const { textAlign, label } = props.attributes;
            const blockProps = useBlockProps( {
                className: classnames( {
                    [ `has-text-align-${ textAlign }` ]: textAlign,
                } ),
            } );
          const onChangeFields = ( event ) => {
            props.setAttributes( { fields: event } );
          };
					
		  const onChangeUser = ( event ) => {
			    props.setAttributes( { user: event } );
		    };

		  const onChangeTheme = ( event ) => {
		      props.setAttributes( { theme: event } );
		  }

          return (
              <Fragment>
                  <InspectorControls>
								<PanelBody>
								    <PanelRow>
									    <TextControl label={__("User", 'oik-blocks' )}
											value={ props.attributes.user }
											onChange={ onChangeUser }
									    />
								    </PanelRow>
                                    <PanelRow>
                                        <SelectControl label={__("Follow me icons style",'oik-blocks' )} value={ props.attributes.theme } options={ themeOptions } onChange={ onChangeTheme } />
                                    </PanelRow>

                                    <PanelRow>
                                        <TextControl label={__("Fields",'oik-blocks' )}
                                                     value={ props.attributes.fields }
                                                     onChange={ onChangeFields }
                                        />
                                    </PanelRow>

								</PanelBody>
              </InspectorControls>

                <div {...blockProps}>
                    <ServerSideRender
                            block="oik-block/person" attributes={props.attributes}
                    />
                </div>
              </Fragment>
          );
        },

        /**
         * We intend to render this dynamically. The content created by the user
         * is stored in the content attribute.
         *
         */
        save( { attributes } ) {
            return null;
        },
    },
);