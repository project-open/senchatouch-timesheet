/*
 * ProjectTimesheetDataView.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * @class PO.view.ProjectTimesheetDataView
 *
 */
Ext.define('PO.view.ProjectTimesheetDataView', {
    extend: 'Ext.DataView',
    xtype: 'projectTimesheetDataView',
    requires: [
	'PO.store.ProjectTimesheetStore', 
	'PO.view.ProjectTimesheetDataViewItem'
    ],
    
    config: {
	title: 'Project List',
	store: 'ProjectTimesheetStore',
	useComponents: true,
	defaultType: 'projectTimesheetDataViewItem',
	deselectOnContainerClick: false,
	scrollable: 'both',

/*
	plugins: [
            {
		xclass: 'Ext.plugin.ListPaging',
		autoPaging: true
            }
	]
*/

    }

});

