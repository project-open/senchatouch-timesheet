Ext.define('PO.store.ProjectTaskStore', {
    extend: 'Ext.data.Store',
    storeId: 'projectTaskStore',
    config: {
	model: 'PO.model.Project',
	autoLoad: true,
	pageSize: 10000,
	
	sorters: [{
	    property: 'tree_sortkey',
	    direction: 'ASC'
	}],

	proxy: {
	    type: 'rest',
            url: '/intranet-reporting/view',
            appendId: true,
            extraParams: {
                format: 'json',
		report_code: 'rest_main_project_tasks_with_hours',
		main_project_id: 0,
		date: '2000-01-01'
            },
            reader: {
		type: 'json', 
		rootProperty: 'data' 
	    }
        }	
    }
});

