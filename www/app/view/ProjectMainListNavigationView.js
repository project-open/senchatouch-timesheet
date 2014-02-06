/*
 * ProjectMainListNavigationView.js
 * (c) 2013 ]project-open[
 * Please see www.project-open.org/en/project_open_license for details
 */

Ext.define('PO.view.ProjectMainListNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'projectMainListNavigationView',
    requires: [
	'PO.view.HourList',
	'PO.view.HourPanelDetail',
	'PO.view.ProjectMainList',
	'PO.view.ProjectTaskList',
	'PO.view.ProjectPanelDetail',
	'PO.view.ProjectPanelTimesheet',
	'PO.store.HourOneProjectStore'
    ],
    config: {
	title: 'Main Projects',
	iconCls: 'star',
        navigationBar: {
            ui: 'sencha',
            items: [{
                xtype: 'button',
                id: 'logButton',
                text: 'Log Hours',
                align: 'right',
                hidden: true,
                hideAnimation: Ext.os.is.Android ? false : {
                    type: 'fadeOut',
                    duration: 200
                },
                showAnimation: Ext.os.is.Android ? false : {
                    type: 'fadeIn',
                    duration: 200
                }
            }]
        },
	items: [{
	    xtype: 'projectMainList'
	}]
    }
});
