/*
 * HourOneProjectStore.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/*
 * Stores the hours logged by the current user on a specific task or project.
 * The store is designed to be scripted and filtered by a controller. 
 */
Ext.define('PO.store.HourOneProjectStore', {
    extend: 'Ext.data.Store',
    storeId: 'hourOneProjectStore',
    config: {
	model: 'PO.model.Hour',
	autoLoad: false,
	sorters: [{
            property: 'date',
            direction: 'ASC'
        }],
        grouper: {
            groupFn: function(record) {
                return record.get('date');
            }
        },
	proxy: {
	    type: 'rest',
	    url: '/intranet-rest/im_hour',
	    appendId: true,
	    extraParams: {
		format: 'json',
		user_id: '0',           // to be specified when loading
		project_id: '0'         // to be specified when loading
	    },
	    reader: {
		type: 'json', 
		rootProperty: 'data' 
	    }
	}
    }
});

