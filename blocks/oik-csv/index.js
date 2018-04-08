import './style.scss';
import './editor.scss';

// Get just the __() localization function from wp.i18n
const { __ } = wp.i18n;
// Get registerBlockType and Editable from wp.blocks
const { 
	registerBlockType, 
	Editable,
  InspectorControls,
	PlainText,
 } = wp.blocks;
	 
const {
  Toolbar,
  Button,
  Tooltip,
  PanelBody,
  PanelRow,
  FormToggle,
	TextControl,
	withInstanceId,

} = wp.components;


const RawHTML = wp.element.RawHTML;
// Set the header for the block since it is reused
//const blockHeader = <h3>{ __( 'Person' ) }</h3>;

//var TextControl = wp.blocks.InspectorControls.TextControl;

/**
 * Register the oik-block/csv block
 * 
 * registerBlockType is a function which takes the name of the block to register
 * and an object that contains the properties of the block.
 * Some of these properties are objects and others are functions
 */
export default registerBlockType(
    // Namespaced, hyphens, lowercase, unique name
		'oik-block/csv', 
    {
        // Localize title using wp.i18n.__()
        title: __( 'CSV' ),
				
				description: 'Displays CSV content',

        // Category Options: common, formatting, layout, widgets, embed
        category: 'layout',

        // Dashicons Options - https://goo.gl/aTM1DQ
        icon: 'media-spreadsheet',

        // Limit to 3 Keywords / Phrases
        keywords: [
            __( 'CSV' ),
						__( 'list' ),
            __( 'oik' ),
        ],

        // Set for each piece of dynamic data used in your block
        attributes: {
				
          content: {
            type: 'string',
 
          },
					text: {
						type: 'string',
						default: '',
					},
					
        },
				
		supports: {
			customClassName: false,
			className: false,
			html: false,
		},
			
		edit: withInstanceId(
			( { attributes, setAttributes, instanceId, focus } ) => {
				const inputId = `blocks-csv-input-${ instanceId }`;
				
				
				const onChangeText = ( value ) => {
						setAttributes( { text: value } );
				};
				
				const onChangeContent = ( value ) => {
					setAttributes( { content: value } );
				};
	
				return [
				
  					!! focus && (
              <InspectorControls key="css">
								<PanelBody>
									<TextControl label="Text" value={attributes.text} onChange={onChangeText} />
								</PanelBody>
              </InspectorControls>
  					),
					<div className="wp-block-oik-block-csv wp-block-shortcode" key="css-input">
						<PlainText
							id={ inputId }
							value={ attributes.content }
							placeholder={ __( 'Enter your CSV data' ) }
							onChange={onChangeContent}
						/>
					</div>
				];
			}
		),
				

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
