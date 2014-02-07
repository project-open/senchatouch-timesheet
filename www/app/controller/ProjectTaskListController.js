/*
 * ProjectTaskListController.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * Controller 
 */
Ext.define('PO.controller.ProjectTaskListController', {
    extend: 'Ext.app.Controller',
    xtype: 'projectTaskListController',
    config: {
	profile: Ext.os.deviceType.toLowerCase(),
	refs: {
	    // The main navigation for push/pop
	    timesheetMainProjectListNavigationView: 'timesheetMainProjectListNavigationView',
	    // The main object - the list of tasks per project
	    projectTaskList: 'projectTaskList',
	    timesheetDatePicker: '#timesheetDatePicker'
	},
	control: {
	    'projectTaskList': {
		itemtap: 'onItemTapTaskList',		// Tapped on the task list
		activate: 'onActivateTaskList'
	    }
	}
    },
    
    onActivateTaskList: function() {
	console.log('ProjectTaskList container is active');
    },

    /**
     * Tapped on the task list:
     * Differentiate between tapping on the button vs. on the main text
     * and show the HourDetailPage vs. the TaskDetailPage.
     */
    onItemTapTaskList: function(view, index, target, record, event) {
	console.log('ProjectTaskListController: Tapped on task');
	if(event.target.type == "button"){
	    // Tapped on the button
	    this.onLogHours(view, index, target, record, event);
	} else {
	    // Tapped on the task
	    this.onShowTaskDetails(view, index, target, record, event);
	}
    },

    /**
     * Tapped on the name of the task.
     * Push a panel to show the details of the task.
     */
    onShowTaskDetails: function(view, index, target, record, event) {
	console.log('ProjectTaskListController: Tapped on task name');
	var view = this.getTimesheetMainProjectListNavigationView();
	view.push({
	    xtype: 'projectPanelDetail',
	    record: record
	});
    },

    /**
     * Tapped on the "Log" button on the ProjectTaskList.
     * Push the HourForm and fill with appropriate data.
     * The ProjecTaskList store consists of "timesheet task"
     * objects which are sub-types of "project".
     */
    onLogHours: function(view, index, target, record, event) {
	console.log('ProjectTaskListController: Tapped on Log button');

	// Get the name and ID of the task tapped
	var task_id = record.get('project_id');
	var task_name = record.get('project_name');
	var today = this.getTimesheetDatePicker().getValue();

	// Load the hours logged by the user on the task. There can be
	// (theoretically) more than one im_hour object, therefore the store.
	var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	store.load({
	    params : {
		'project_id': task_id,
		'user_id': current_user_id,
		'day': "'" + Ext.Date.format(today, 'Y-m-d') + "'"
	    },
	    scope: this,
	    callback: function(records, operation, success) {
		console.log("onItemTapTaskList: loaded store: "+success);
		if (!success) { 
		    var msg = operation.getError();
		    return Ext.Msg.alert('Failed', msg); 
		}

		var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
		var count = store.getCount();
		var hourRecord = null;
		if (count > 0) {				// We found at least one entry
		    hourRecord = store.getAt(0);		// just take the first one
		    var dayString = hourRecord.get('day');
		    hourRecord.set('day_date', new Date(dayString)); // Form datepicker needs date
		} else {
		    // No entry - create new hours record with some default values
		    hourRecord = Ext.create('PO.model.Hour', {
			'user_id': current_user_id,
			'project_id': task_id,
			'day':  Ext.Date.format(today, 'Y-m-d'),
			'day_date': today,
			'hours': '',
			'note': ''
		    });
		}
		
		// Push the new im_hour page to the top of the view
		var navView = this.getTimesheetMainProjectListNavigationView();
		navView.push({
		    xtype: 'timesheetHourForm',
		    title: task_name,
		    record: hourRecord
		});
	    }
	});
    }
});

