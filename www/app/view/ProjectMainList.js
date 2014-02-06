/*
 * ProjectMainList.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 *
 */

/**
 * A list of all active main projects for the user.
 * There may still be an issue with permissions and
 * the ]po[ configuration parameters:
 * <ul>
 * <li>TimesheetLogHoursOnPotentialProjectsP: Should the user log on potential projects?
 * <li>TimesheetTaskVisibilityScope: On which tasks should a user be able to log?
 * <li>TimesheetMaxHoursPerDay: Max hours per day
 * <li>PermissiveHourLogging: "permissive" means that we allow Employees to log their hours 
 *     basically on every project in the system. "restrictive" means that users can only log 
 *     to projects (and the project's Tasks) if they are a member of the project. 
 * </ul>
 */
Ext.define('PO.view.ProjectMainList', {
	extend: 'Ext.List',
	xtype: 'projectMainList',
	requires: ['PO.store.ProjectMainStore'],

	config: {
	    title: 'Main Projects',
	    store: 'ProjectMainStore',
	    iconCls: 'star',
	    disclosure: true,
	    sorted: true,
	    grouped: true,
	    indexBar: true,
	    onItemDisclosure: true,
            itemTpl: '<div class="myContent">'+
                '<div><b>{project_name}</b></div>' +
                '</div>'
	}
});
