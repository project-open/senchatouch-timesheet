/*
 * ProjectTaskList.js
 * (c) 2013 ]project-open[
 * Please see www.project-open.org/en/project_open_license for details
 *
 * Shows a list of tasks plus their logged hours.
 */
Ext.define('PO.view.ProjectTaskList', {
	extend: 'Ext.List',
	xtype: 'projectTaskList',
	requires: ['PO.store.ProjectTaskStore'],

	config: {
	    title: 'Task Projects',
	    store: 'ProjectTaskStore',
	    iconCls: 'star',	    
	    itemTpl: new Ext.XTemplate(
		'<div class="myButton"><input type="button" name="{project_id}" value="',
		    '<tpl if="hours_for_user &gt; 0">',
		        '{hours_for_user}',
		    '<tpl else>',
		        'Log Hours',
		    '</tpl>',
		    '" style="padding:1px;">' +
		'</div>' +
		'<div class="myContent">'+
		'<div><b><nobr>{indent}{project_name}</nobr></b>' +
		'</div>'
	    ),

	    disclosure: true,
	    grouped: false,
	    indexBar: true,
	    scrollable: 'both',
	    onItemDisclosure: false
	}
});



//		'<div>{project_status} {project_type} ({project_lead_name})</b></div>' +
//	    itemTpl: '<div class="myContent">Project Name: <b>{project_name}</b></div>',
//	    itemTpl: '<div class="myContent"><table><tr><td>Project Name</td><td><b>{project_name}</b></td></tr></table></div>',
