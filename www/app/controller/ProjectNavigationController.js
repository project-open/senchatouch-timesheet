/*
 * ProjectNavigationController.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 *
 */

/**
 * Main controller
 */
Ext.define('PO.controller.ProjectNavigationController', {
    extend: 'Ext.app.Controller',
    xtype: 'projectNavigationController',
    config: {
	refs: {
	    projectNavigationView: 'projectNavigationView'
	},
	control: {
            'button[text=Log]': {
                tap: 'showProjectTimesheetPanel'
            },
            'button[iconCls=nameButton]': {
                tap: 'showProjectDetailPanel'
            }
	}
    },
    
    // Show the details of the project: Create a new instance of the 
    // projectDetail page and push on the top of the stack
    showProjectDetailPanel: function(list, index, listItem, record, touchEvent) {
	var view = this.getProjectNavigationView();
	view.push({
	    xtype: 'projectPanelDetail',
	    record: record
	});
    },
    
    // Show the timesheet page of the project: Create a new instance of the 
    // projectTimesheet page and push on the top of the stack
    showProjectTimesheetPanel: function(list, index, listItem, record, touchEvent) { 
	var record = this.getRecord();
	var view = this.getProjectNavigationView();
	var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	var proxy = store.getProxy();
	proxy.setExtraParam('format', 'json');
	proxy.setExtraParam('project_id', record.project_id);
	proxy.setExtraParam('user_id', record.project_id);
	store.load();

	var list = view.push({
	    xtype: 'hourList',
	    record: record
	});

//	var store = list.getStore();

    }
});

