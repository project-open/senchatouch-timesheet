Ext.define('PO.view.ProjectTaskList', {
	extend: 'Ext.List',
	xtype: 'projectTaskList',
	requires: ['PO.store.ProjectTaskStore'],

	config: {
	    title: 'Task Projects',
	    store: 'ProjectTaskStore',
	    iconCls: 'star',	    
//	    itemTpl: '<div class="myContent">Project Name: <b>{project_name}</b></div>',

//	    itemTpl: '<div class="myContent"><table><tr><td>Project Name</td><td><b>{project_name}</b></td></tr></table></div>',

/*
	    itemTpl: '<div class="myButton">' +
                '<input type="button" name="{project_id}" value="{hours_for_user}" style="padding:1px;">' +
                '</div>' +
		'<div><nobr>{indent}{project_name}</nobr></div>' +
		'</div>',
*/

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
		'<div><b><nobr>{indent}{project_name}</nobr></b></div>' +
//		'<div>{project_status} {project_type} ({project_lead_name})</b></div>' +
		'</div>'
	    ),

	    disclosure: true,
	    grouped: false,
	    indexBar: true,
	    scrollable: 'both',
	    onItemDisclosure: false
	}
});

