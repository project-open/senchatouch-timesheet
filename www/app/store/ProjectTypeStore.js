/*
 * ProjectTypeStore.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * A list of states for projects.
 *
 * ToDo: The list is actually hierarchically.
 * ToDo: Filter out diabled categories
 */
Ext.define('PO.store.ProjectTypeStore', {
    extend: 'Ext.data.Store',
    storeId: 'projectTypeStore',
    config: {
	model: 'PO.model.Category',
	autoLoad: true,
	sorters: [{
//            property: 'category_translated',
	    property: 'category',
	    direction: 'ASC'
	}],
	proxy: {
	    type: 'rest',
            url: '/intranet-rest/im_category',
            appendId: true,
            extraParams: {
                format: 'json',
		category_type: '\'Intranet Project Type\''
            },
            reader: { type: 'json', rootProperty: 'data' }
        }
    }
});

