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
	    projectMainList: 'projectMainList',
	    hourList: 'hourList',
	    hourDetailListContainer: 'hourDetailListContainer',
            logButton: '#logButton'
	},

	control: {
	    'projectMainList': {
		activate: 'onActivateMainList',
		itemtap: 'onItemTapMainList',
		disclose: 'onDiscloseMainList',
	    },
	    'projectTaskList': {
		// Tapped on the task list:  Differentiate between tapping on the button vs. 
		// on the main text and show the HourDetailPage vs. the TaskDetailPage.
		itemtap: 'onItemTapTaskList',
		activate: 'onActivateTaskList'
	    },
	    logButton: {
                tap: 'onLogHours'
            },

	}
    },
    

    onLogHours: function() {
	console.log('logHours Button pressed');
	
	var navView = this.getProjectMainListNavigationView();
	var hourDetail = Ext.create("PO.view.HourPanelDetail");

	var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	var project_id = 0
	var today = Ext.Date.format(new Date(), 'Y-m-d');
	store.load({
	    params : {
		'main_project_id': project_id,
		'date': today
	    }
	});

	var list = navView.push({
	    xtype: 'hourPanelDetail'
	});
    },


    onActivateMainList: function() {
	console.log('ProjectMainList container is active');
    },

    onActivateTaskList: function() {
	console.log('ProjectTaskList container is active');
    },

    /**
     * Pressed the -> button on the ProjectMainList-
     * Show the ProjectTaskList with the specified project.
     */
    onDiscloseMainList: function(list, record) {
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
    },

    // Tap on MainList
    // Show more information about the object
    onItemTapMainList: function(view, index, target, record, event) {
	this.onDiscloseMainList(null, record);
    },


    /**
     * Tapped on the task list:
     * Differentiate between tapping on the button vs. on the main text
     * and show the HourDetailPage vs. the TaskDetailPage.
     */
    onItemTapTaskList: function(view, index, target, record, event) {
	console.log('Item was tapped on the TaskList');

	if(event.target.type == "button"){

	    // Load the right data into the store
	    var project_id = record.get('project_id');
	    var project_name = record.get('project_name');

	    // Load the hours logged by the user on the task. There can be
	    // (theoretically) more than one im_hour object, therefore the store.
	    var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	    store.load({
		params : {
		    'project_id': project_id,
		    'user_id': current_user_id,
		    'day': "'" + Ext.Date.format(new Date(), 'Y-m-d') + "'"
		},
		scope: this,
		callback: function(records, operation, success) {
		    console.log("onItemTapTaskList: loaded store: "+success);
		    if (!success) {
			Ext.Msg.alert('Failed', operation.request.scope.reader.jsonData["message"]);
			return;
		    }
		    var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
		    var count = store.getCount();
		    var hourRecord = null;
		    if (count > 0) {
			// We found at least one entry
			hourRecord = store.getAt(0);  // just take the first one
		    } else {
			// No entry - create new hours record with some default values
			hourRecord = Ext.create('PO.model.Hour', {
			    'user_id': current_user_id,
			    'project_id': project_id,
			    'day':  Ext.Date.format(new Date(), 'Y-m-d'),
			    'hours': '0',
			    'note': ''
			});
		    }
		    
		    // Push the new im_hour page to the top of the view
		    var navView = this.getProjectMainListNavigationView();
		    navView.push({
			xtype: 'hourPanelDetail',
			title: project_name,
			record: hourRecord
		    });
		}
	    });



/*	    var hourList = Ext.create("PO.view.HourList");
	    var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	    var project_id = record.get('project_id');
	    var today = Ext.Date.format(new Date(), 'Y-m-d');
	    store.load({
		params : {
		    'project_id': project_id
		}
	    });
	    hourList.setStore(store);
	    var list = navView.push(hourList);
*/

	} else {

	    // Tapped on the main item
	    var view = this.getProjectMainListNavigationView();
	    view.push({
		xtype: 'projectPanelDetail',
		record: record
	    });
	}
    }
 
});

