/**
 * Implements the Person block as a server rendered block
 *
 * - Depends on oik-user
 *
 * @copyright (C) Copyright Bobbing Wide 2018,2019, 2020
 * @author Herb Miller @bobbingwide
 */

import './style.scss';
import './editor.scss';

//import Input from './input';
//import TextControl from '@wordpress/components-text

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
// Get registerBlockType and Editable from wp.blocks
const { 
	registerBlockType,
} = wp.blocks;
const { 
	Editable,

    InnerBlocks,
    ServerSideRender,
} = wp.editor;
const {
    InspectorControls,
} = wp.blockEditor;
	 
const {
  Toolbar,
  Button,
  Tooltip,
  PanelBody,
  PanelRow,
  FormToggle,
  SelectControl,
	TextControl,

} = wp.components;

const Fragment = wp.element.Fragment;

import { map } from 'lodash';

var themeOptions = {
    none: "Logos",
    //dash: "Dashicons",
    gener: "Genericons",

};
themeOptions = map( themeOptions, ( key, label ) => ( { value: label, label: key } ) );
//console.log( themeOptions );



//var TextControl = wp.blocks.InspectorControls.TextControl;

/**
 * Register e
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
    'oik-block/person',
    {
        // Localize title using wp.i18n.__()
        title: __( 'Person' ),
				
				description: 'Displays a person\'s information',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'common',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'admin-users',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'Person' ),
            __( 'oik' ),
        ],

        // Set for each piece of dynamic data used in your block
        attributes: {
				
          user: {
            type: 'string',
			default: '',
          },

          fields: {
              type: 'string',
              default: 'gravatar/about,bio,follow_me',
          },

          theme: {
              type: 'string',
              default: '',
          }
					
        },

        edit: props => {
          const onChangeInput = ( event ) => {
            props.setAttributes( { issue: event.target.value } );

          };
					
		  const onChangeUser = ( event ) => {
			    props.setAttributes( { user: event } );
		    };

		  const onChangeTheme = ( event ) => {
		      props.setAttributes( { theme: event } );
		  }

		  var lsb = '['; // &#91;
          var rsb = ']'; // &#93;
          var user = props.attributes.user;


          var equivalent_shortcode = `${lsb}bw_user user="${user}" fields="${ props.attributes.fields }"
            theme="${ props.attributes.theme }"${rsb}`;


          return [
					
					
					
  					
              <InspectorControls>
								<PanelBody key="pb">
								<PanelRow key="pruser">
									<TextControl label="User" 
											value={ props.attributes.user } 
											id="user"
											onChange={ onChangeUser }
									/>
								</PanelRow>
                                    <PanelRow>
                                        <SelectControl label="Follow me icons style" value={ props.attributes.theme } options={ themeOptions } onChange={ onChangeTheme } />
                                    </PanelRow>

                                    <PanelRow>
                                        Equivalent shortcode<br />
                                        {equivalent_shortcode}
                                    </PanelRow>

								</PanelBody>


              </InspectorControls>
  					,
            <div className={ props.className } key="perinspector">


                <Fragment>

                    {equivalent_shortcode}

                    <hr />

                    {!props.isSelected &&


                    <ServerSideRender
                        block="oik-block/person" attributes={props.attributes}
                    />
                    }
                </Fragment>

            </div>
          ];
        },
				
				
        saver: props => {
					// console.log( props );
					//var shortcode =  {props.attributes.issue} ;
            var lsb = '[';
            var rsb = ']';
            var user = props.attributes.user;



          return (
            <div className={props.className } key="person">

						<Fragment>
						{lsb}
						bw_user user="{user}" fields=gravatar/about,bio,follow_me
						{rsb}
						<hr />
						</Fragment>
            </div>
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
