/*
 * ProjectList.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 *
 */
Ext.define('PO.view.ProjectList', {
	extend: 'Ext.List',
	xtype: 'projectList',
	requires: ['PO.store.ProjectTimesheetStore'],

	config: {
		title: 'Project List',
		iconCls: 'star',
//		itemTpl: '<div class="contact2">{project_name_indented}</div>',
		itemTpl: '<div style="font-size: medium">{project_name_indented}</div>',
		disclosure: true,
		grouped: true,
		indexBar: true,
		store: 'ProjectTimesheetStore',
		onItemDisclosure: true
	}
});

