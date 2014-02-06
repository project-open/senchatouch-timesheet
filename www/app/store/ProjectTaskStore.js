/*
 * ProjectTaskStore.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 *
 */
Ext.define('PO.store.ProjectTaskStore', {
    extend: 'Ext.data.Store',
    storeId: 'projectTaskStore',
    config: {
	model: 'PO.model.Project',
	autoLoad: true,
	pageSize: 10000,
	
	sorters: [{
	    property: 'tree_sortkey',
	    direction: 'ASC'
	}],

	proxy: {
	    type: 'rest',
            url: '/intranet-reporting/view',
            appendId: true,
            extraParams: {
                format: 'json',
		report_code: 'rest_main_project_tasks_with_hours',
		main_project_id: 0,
		date: '2000-01-01'
            },
            reader: {
		type: 'json', 
		rootProperty: 'data' 
	    }
        }	
    }
});

