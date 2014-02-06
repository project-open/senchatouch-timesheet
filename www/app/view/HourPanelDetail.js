/*
 * HourPanelDetail.js
 * (c) 2013 ]project-open[
 * Please see www.hour-open.org/en/project_open_license for details
 *
 * Form for editing/creating an im_hour object.
 * The form consists of a number of fields and the logic for
 * creating/updating/deleting.
 *
 * The form is created by the 
 */
Ext.define('PO.view.HourPanelDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'hourPanelDetail',
    requires: ['PO.store.HourOneProjectStore'],
    config: {
        title: 'Hour Detail',
        layout: 'vbox',
        items: [
	    {
		xtype: 'fieldset',
		items: [
		    {
			xtype: 'textfield',
			name: 'note',
			label: 'Description'
		    }, {
			xtype: 'numberfield',
			name: 'hours',
			label: 'Hours'
		    }, {
			xtype: 'selectfield',
			name: 'project_id',
			label: 'Project',
			options: [
                            {text: 'First Option',  value: 'first'},
                            {text: 'Second Option', value: 'second'},
                            {text: 'Third Option',  value: 'third'}
			]
//			store: 'HourOneProjectStore'
		    }, {
			xtype: 'hiddenfield',
			name: 'id'
		    }, {
			xtype: 'hiddenfield',
			name: 'user_id'
		    }, {
			xtype: 'hiddenfield',
			name: 'day'
		    }
		]
            }, {
                xtype: 'button',
                text: 'Save',
                ui: 'confirm',
                itemID: 'noteSaveButton',
                handler: function(button, event) {
		    console.log('HourPanelDetail: "Save"');
		}
            }, {
                xtype: 'button',
                text: 'Delete',
                ui: 'decline',
                itemID: 'noteDeleteButton',
                handler: function(button, event) {
                    console.log('HourPanelDetail: "Delete"');
		}
            }
        ]
    }
});

