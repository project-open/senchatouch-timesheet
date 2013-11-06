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


//	    itemTpl: '<div class="contact2">{project_name_indented}</div>',
//	    itemTpl: '<div style="font-size: medium">{project_name_indented}</div>',

            itemTpl: '<div class="myContent">'+
                '<div><b>{project_name}</b></div>' +
//                '<br><div>{project_status} {project_type}</div>' +
                '</div>'

/*
            itemTpl: '<div class="myButton">' +
                '<input type="button" name="{project_id}" value="Hours" ' +
                'style="padding:1px;">' +
                '</div><div class="myContent">'+
                '<div><b>{project_name}</b></div>' +
                '<div>{project_status} {project_type}</div>' +
                '</div>',
*/
/*

	    itemTpl: new Ext.XTemplate(
		'<div class="myButton"><input type="button" name="{project_id}" value="',
		'<tpl if="hours_per_user &gt; 0">',
		'{hours_per_user}',
		'<tpl else>',
		'Hours',
		'</tpl>',
		'" style="padding:1px;">' +
		'</div><div class="myContent">'+
		'<div><b>{project_name}</b></div>' +
		'<div>{project_status} {project_type} {project_manager_name}</b></div>' +
		'</div>'
	    ),
*/

	}
});

