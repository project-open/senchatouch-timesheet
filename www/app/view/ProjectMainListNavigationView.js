/*
 * ProjectMainListNavigationView.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * Top of the timesheet sub-application
 */
Ext.define('PO.view.ProjectMainListNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'projectMainListNavigationView',
    requires: [
	'PO.view.HourList',
	'PO.view.HourPanelDetail',
	'PO.view.ProjectMainList',
	'PO.view.ProjectTaskList',
	'PO.view.ProjectPanelDetail',
	'PO.view.ProjectPanelTimesheet',
	'PO.store.HourOneProjectStore'
    ],
    config: {
	title: 'Timesheet',
	iconCls: 'time',
	items: [
	    { xtype: 'projectMainList' }
	]
    }
});
