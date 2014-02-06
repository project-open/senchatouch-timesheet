/*
 * ProjectMainListController.js
 * (c) 2013 ]project-open[
 * Please see www.project-open.org/en/project_open_license for details
 *
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
	var today = '2013-08-09';
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
	var project_id = record.get('project_id');
	var today = '2013-08-09';
	store.load({
	    params : {
		'main_project_id': project_id,
		'date': today
	    }
	});
	
	// Push an HourList to the NavigationView page
	taskList.setStore(store);
	var list = navView.push(taskList);
    },

    // Tap on MainList
    // Show more information about the object
    onItemTapMainList: function(view, index, target, record, event) {
    },


    /**
     * Tapped on the task list:
     * Differentiate between tapping on the button vs. on the main text
     * and show the HourDetailPage vs. the TaskDetailPage.
     */
    onItemTapTaskList: function(view, index, target, record, event) {
	console.log('Item was tapped on the TaskList');
	console.log(view, index, target, record, event);
	if(event.target.type == "button"){

	    // Load the right data into the store
	    var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	    var project_id = record.get('project_id');
	    var project_name = record.get('project_name');
	    var today = '2013-08-09';
	    var user_id = '624';
	    store.load({
		params : {
		    'project_id': project_id,
		    'user_id': user_id,
		    'day': "'" + today + "'"
		}
	    });

	    var hourRecord = null;
	    var count = store.getCount();
	    if (count > 0) {
		// We found at least one entry
		hourRecord = store.getAt(0);  // just take the first one
	    } else {
		// No entry - create new hours record with some default values
		hourRecord = Ext.create('PO.model.Hour', {
		    'user_id': user_id,
		    'project_id': project_id,
		    'day': today,
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



/*	    var hourList = Ext.create("PO.view.HourList");
	    var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	    var project_id = record.get('project_id');
	    var today = '2013-08-09';
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

