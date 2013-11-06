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
	    xtype: 'hourPanelDetail',
	    title: 'New Note'
	});
    },


    onActivateMainList: function() {
	console.log('ProjectMainList container is active');
    },

    onActivateTaskList: function() {
	console.log('ProjectTaskList container is active');
    },

    // Disclose on MainList:
    // Log hours
    onDiscloseMainList: function(list, record) {
	// Create an HourList to the NavigationView page
	var navView = this.getProjectMainListNavigationView();
	var taskList = Ext.create("PO.view.ProjectTaskList");
	
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


    onItemTapTaskList: function(view, index, target, record, event) {
	console.log('Item was tapped on the TaskList');
	console.log(view, index, target, record, event);
	if(event.target.type == "button"){

	    // Create an HourList to the NavigationView page
	    var navView = this.getProjectMainListNavigationView();
	    var hourList = Ext.create("PO.view.HourList");

	    // Load the right data into the store
	    var store = Ext.data.StoreManager.lookup('HourOneProjectStore');
	    var project_id = record.get('project_id');
	    var today = '2013-08-09';
	    store.load({
		params : {
		    'project_id': project_id
		}
	    });

	    // Push an HourList to the NavigationView page
	    hourList.setStore(store);
	    var list = navView.push(hourList);
	}
	else {
	    // Tapped on the main item
	    var view = this.getProjectMainListNavigationView();
	    view.push({
		xtype: 'projectPanelDetail',
		record: record
	    });
	}
    }
 
});

