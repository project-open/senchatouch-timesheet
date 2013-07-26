/*
 * Categories are used everywhere in the system
 * to represent states and types of objects and
 * any finite list of options.
 *
 * Categories are used as stores for form fields,
 * so we need "text" and "value" fields for those.
 *
 * Categories are hierarchical.
 * Categories are read-only.
 */
Ext.define('PO.model.Category', {
    extend: 'Ext.data.Model',
    config: {
	fields: [
	    'id',					// same as category_id
	    'category_id',				// primary key - constant
	    'category',					// Name of the category
	    'category_translated',			// Name of the category in the user locale
	    'category_description',			// Lengthy description in English
	    'enabled_p',				// 't' = enabled, 'f' = disabled
	    'sort_order',				// Order to show on screen
	    'aux_int1',					// Placeholder
	    'aux_int2',					// Placeholder
	    'aux_string1',				// Placeholder
	    'aux_string2',				// Placeholder
            {   name: 'text',				// 'text' is used by Select field as pretty name
                convert: function(value, record) { return record.get('category'); }
            },
            {   name: 'value',				// 'value' is used by Select field as value
                convert: function(value, record) { return record.get('category_id'); }
            }
	],
	proxy: {	
	    type:		'rest',
	    url:		'/intranet-rest/im_category',
	    appendId:	true,			// Append the category_id: ../im_category/<object_id>
	    timeout:	300000,
	    
	    extraParams: {
		format:		'json',		// Tell the ]po[ REST to return JSON data.
		deref_p:	'1'
	    },
	    reader: {
		type:	'json',			// Tell the Proxy Reader to parse JSON
		root:	'data',			// Where do the data start in the JSON file?
		totalProperty:  'total'		// Total number of tickets for pagination
	    }
	}
    }
});

