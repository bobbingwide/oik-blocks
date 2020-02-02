const shortcode_attributes =
    {
        shortcode: {
            type: 'string',
            default: '',
        },

       parameters: {
            type: 'string',
            default: '',
        },

        post_type: {
            type: 'string',
            default: '',
        },

        post_parent: {
            type: 'string',
            default: '.',
        },

        numberposts: {
            type: 'integer',
            default: 10,
        }

        // post_parent = ., 0, ID null
        // categories
        // number_posts = -1, 1->100
        // offset = null,
        // orderby =
        // order = ASC / DESC
        // per_page
        //


    };

export { shortcode_attributes};
