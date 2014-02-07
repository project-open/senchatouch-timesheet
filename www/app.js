/*
 * app.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */
Ext.application({
    name: 'PO',
    models: [
	'Category',				// Represents states and types of objects
	'Hour',					// Logged timesheet hours
	'Note',					// A simple text note that can be attached to projects or users
	'Project'				// Project or task
    ],
    stores: [
	'ProjectStatusStore',			// List of project states
	'ProjectTypeStore',			// List of project types
	'NoteStore',				// List of global notes
	'HourOneDayStore',			// List of hours per project, day or user (depending on use)
	'HourOneProjectStore',			// List of hours per project, day or user (depending on use)
	'ProjectMainStore',			// List of main projects projects
	'ProjectTaskStore',			// List of main projects projects
	'ProjectTimesheetStore'			// List of projects whith hierarchical indent.
						// Includes only projects with permissions for the current user to log hours
    ],
    views: [
	'SplashPage',				// Initial screen with ]po[ logo
	'NoteNavigationView',			// Container for navigation between NoteList and NoteDetail
	'ProjectNavigationView',		// Container for navigation between ProjectList and ProjectTimesheet
	'ProjectMainListNavigationView',	// Navigation container for Timesheet sub-application
	'HourList',				// Not used anymore(?)
	'HourPanelDetail',			// Wrong name! Entry form for hours
	'HourDetailListContainer',		// Not used anymore(?)
	'TimesheetDateSelectForm'		// Small panel showing the current date to log hours
    ],
    controllers: [
	'NoteNavigationController',
	'ProjectMainListController',
	'ProjectTaskListController'
    ],

    viewport: {
	autoMaximize: true
    },

    // Main function: Load the various panels
    launch: function() {
	Ext.create("Ext.tab.Panel", {
	    fullscreen: true,
	    tabBarPosition: 'bottom',
	    items: [
		// The application consists of two three only:
		{xtype: 'projectMainListNavigationView'},
		{xtype: 'splashPage'}, 
		{xtype: 'noteNavigationView'}
	    ]
	});
    }
});

