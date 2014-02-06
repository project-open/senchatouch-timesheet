/*
 * HourOneDayStore.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * Stores the hours logged by the current user.
 * The store is designed to be scripted and filtered
 * by a controller.
 * 
 */
Ext.define('PO.store.HourOneDayStore', {
    extend: 'Ext.data.Store',
    storeId: 'hourOneDayStore',
    config: {
	model: 'PO.model.Hour',
	autoLoad: false,

	// Proxy specifically for this store
	proxy: {
	    type: 'rest',
	    url: '/intranet-rest/im_hour',
	    extraParams: {
		format: 'json',
		day: Ext.Date.format(new Date(), 'Y-m-d'),	// to be overwritten by controller
		user_id: 624			                // to be overwritten by controller
	    },
	    reader: {
		type: 'json', 
		rootProperty: 'data' 
	    }
	}
    }
});

