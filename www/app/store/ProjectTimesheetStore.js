/*
 * ProjectTimesheetStore.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 *
 */

/**
 *
 */
Ext.define('PO.store.ProjectTimesheetStore', {
    extend: 'Ext.data.Store',
    storeId: 'projectTimesheetStore',
    config: {
	model: 'PO.model.Project',
	autoLoad: true,
	sorters: [{
	    /* Sort by tree_sortkey (hierarchical index)
	     * This way we automatically get a hierarchical list.
	     */
	    property: 'tree_sortkey',
	    direction: 'ASC'
	}],
	
	grouper: {
	    /* Return the name of the tasks's most parent project.
	     * To get the main project we need to lookup the first 32 bit of the
	     * tasks's tree_sortkey (hierarchical index, calculated at the ]po[
	     * back-end.
	    */
	    groupFn: function(record) { 
		var tree_sortkey = record.get('tree_sortkey').substr(0,32);
		var main_project_record = Ext.getStore('ProjectTimesheetStore').getById(tree_sortkey);
		if (main_project_record == null) { return ''; }
		var main_project_name = main_project_record.get('project_name');
		return main_project_name;
	    }
	},
	
	filters: [
//	    { property: 'parent_id', value: /a/ }
//	    { filterFn: function(item) { return item.get('parent_id') == ''; }}
	],

	// Proxy specifically for this store: rest_my_timesheet_projects returns 
	// all projects to which the current user has hour logging permissions
	proxy: {
	    type: 'rest',
            url: '/intranet-reporting/view',
            appendId: true,
            extraParams: {
                format: 'json',
		report_code: 'rest_my_timesheet_projects'
            },
            reader: {
		type: 'json', 
		rootProperty: 'data' 
	    }
        }
    }
});

