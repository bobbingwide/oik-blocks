//import {bw_shortcodes_attrs} from "./bw_shortcodes";

//<SelectControl label="Post Type" value={attributes.post_type}
//options={ map( bw_shortcodes_attrs.bw_posts.post_type, ( key, label ) => ( { value: label, label: key } ) ) }
//onChange={partial( onChangeAttr, 'post_type' )}
///>


import {bw_shortcodes} from "./bw_shortcodes";

const { withSelect, select, subscribe } = wp.data;
const { Component } = wp.element;
//const { getPostTypes } = subscribe( 'core' );
//const bw_post_types = subscribe( 'core' ).getPostTypes();

const { SelectControl } = wp.components;



export class PostTypes extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            postTypes: [],

        };
        console.log( this.state);
        console.log( this );
    }

    componentDidMount() {
        const unsubscribe = subscribe( () => {
            const postTypes = select( 'core').getPostTypes( { per_page: -1 });
            console.group( "PT");
            console.log( this.state.postTypes);
            console.log( postTypes );
            console.groupEnd();
            this.setState( { postTypes } );
        })
    }

    postTypeList() {
        var postTypes = this.state.postTypes;
        if ( postTypes ) {
        return(
        <ul>
            { postTypes.map((  postType ) => this.postTypeMap( postType ) )}
        </ul>
        ) } else {
            return( <p>Post type</p>)
        }
    }


    postTypeListSelect( props ) {
        var postTypes = this.state.postTypes;
        if ( postTypes ) {
            var options = postTypes.map(( postType ) => this.postTypeOption( postType ) );
            return(
                <SelectControl label="Post Type" value={this.props.postType}
                           options={options}
                           onChange={ this.props.onChange}
                />
            );
        } else {
            return( <p>Loading post types</p>);
        }
    }

    /**
     * Map the postTypes to a select list
     * @param postType
     * @returns {*}
     */

    postTypeMap( postType ) {
        console.log( postType );
        return( <li>{postType.slug}</li>);
    }

    postTypeOption( postType ) {
        return( { value: postType.slug, label: postType.name });
    }

    render() {
        return( this.postTypeListSelect()
        );
    }

}



//const bw_post_types = select( 'core').getPostTypes();


//console.log( bw_post_types );
/*
const bwPostTypes = withSelect( ( select ) => ( {
        const { getPostTypes } = select( 'core');
        return {
            typesList: getPostTypes(),
        }

    } ) )(  );

 */

export { bwPostTypes, bw_post_types };
