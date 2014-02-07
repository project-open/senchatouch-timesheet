/*
 * ProjectMainListController.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * Controller for the list of main projects.
 * Tapping: Shows project details
 * Disclose: Shows the list of tasks for hour logging
 */
Ext.define('PO.controller.ProjectMainListController', {
    extend: 'Ext.app.Controller',
    xtype: 'projectMainListController',
    config: {
	profile: Ext.os.deviceType.toLowerCase(),
	refs: {
	    projectMainListNavigationView: 'projectMainListNavigationView',
	    projectMainList: 'projectMainList'
	},
	control: {
	    'projectMainList': {
		activate: 'onActivate',
		itemtap: 'onItemTap',
		disclose: 'onDisclose',
	    }
	}
    },
    
    onActivate: function() {
	console.log('ProjectMainList container is active');
    },

    // Tap on MainList - same as Disclose at the moment
    onItemTap: function(view, index, target, record, event) {
	this.onDisclose(null, record);
    },
 
    /**
     * Pressed the -> button on the ProjectMainList-
     * Show the ProjectTaskList with the specified project.
     */
    onDisclose: function(list, record) {
	// Create an HourList to the NavigationView page
	var navView = this.getProjectMainListNavigationView();
	var project_name = record.get('project_name');
	var taskList = Ext.create("PO.view.ProjectTaskList", {
	    title: project_name + ' Tasks and Hours'
	});
	
	// Load the right data into the store
	var store = Ext.data.StoreManager.lookup('ProjectTaskStore');
	store.load({
	    params : {
		'main_project_id': record.get('project_id'),
		'date': Ext.Date.format(new Date(), 'Y-m-d')
	    }
	});
 	
	// Push an HourList to the NavigationView page
	taskList.setStore(store);
	var list = navView.push(taskList);
    }
});

