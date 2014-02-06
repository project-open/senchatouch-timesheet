/*
 * ProjectNavigationView.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * 
 */
Ext.define('PO.view.ProjectNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'projectNavigationView',
    requires: [
	'PO.view.ProjectTimesheetDataView',
	'PO.view.ProjectPanelDetail',
	'PO.view.ProjectPanelTimesheet'
    ],
    config: {
	title: 'Projects',
	iconCls: 'star',
	items: [{
	    xtype: 'projectTimesheetDataView'
	}]
    }
});
