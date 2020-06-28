const format_options = [
    { label: 'Default', value: 'LIER',},
    { label: 'Link,image', value: 'LI', },
    { label: 'Link, image, excerpt', value: 'LIE' },
    { label: 'Image, link', value: 'IL', },
    { label: 'Image, link, excerpt', value: 'ILE' },
    { label: 'Link, Image, Date, Author', value: 'LI/d/a'},
    { label: 'None', value: '' },
];

const single_format_options = [
    { label: 'None', value: null, },
    { label: 'Title', value: 'T', },
    { label: 'Link', value: 'L', },
    { label: 'Image', value: 'I', },
    { label: 'Excerpt', value: 'E', },
    { label: 'Read more', value: 'R', },
    { label: 'Div', value: '/', },
    { label: 'Fields', value: '_',},
    { label: 'Space', value: ' ',},
    { label: 'Content', value: 'C',},
    { label: 'Categories', value: 'c', },
    { label: 'Tags', value: 't'},
    { label: 'Author', value: 'a'},
    { label: 'Date', value: 'd' },
    { label: 'Edit', value: 'e' },
    ];

const { select, subscribe } = wp.data;
const { Component } = wp.element;
const { SelectControl } = wp.components;

export class Formats extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            formats: format_options,
        };
    }

    formatsSelect( props ) {
        var formats = this.state.formats;
        if (formats) {
            //var options = formats.map((format) => this.formatsOption(format));
            return (
                <SelectControl label="Format" value={this.props.format}
                           options={format_options}
                           onChange={this.props.onChange}
                />
            );
        } else {
            return (<p>Loading formats</p>);
        }
    }



        /**
         * Map the format_option to a select list option
         *
         * @param format
         * @returns {{label: *, value: *}}
         */
        formatOption( format ) {
            return( { value: format.value, label: format.label });
        }

        render() {
            return( this.formatsSelect()
            );
        }
    }