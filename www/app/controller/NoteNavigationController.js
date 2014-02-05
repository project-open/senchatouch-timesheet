Ext.define('PO.controller.NoteNavigationController', {
    extend: 'Ext.app.Controller',
    xtype: 'noteNavigationController',
    config: {
	refs: {
	    noteNavigationView: 'noteNavigationView',
            noteSaveButton: '#noteSaveButton',
	},

	control: {
	    'noteNavigationView': {
		initialize: 'onInitializeNavigationView'
	    },
	    'noteList': {
		disclose: 'showDetail'
	    },
	    'noteSaveButton': {
		tap: 'onNoteSave'
	    }
	}
    },

    // Initialization of the Container - add a button
    // The NavigationView itself doesn't seem to allow for this type of customization
    onInitializeNavigationView: function(navView) {
	var navBar = Ext.ComponentQuery.query('noteNavigationView')[0].getNavigationBar();
	navBar.add({
	    xtype: 'button',
	    text: 'New Note',
	    align: 'right',
	    handler: function() {
		console.log('NoteListController: New Note button pressed');
		navView.push({
		    xtype: 'noteDetail',
		    title: 'New Note'
		});
	    }
	});
    },

    // "Disclose" Event - somebody pressed on the -> button at the list
    // Create a new instance of the noteDetail page and push on the top
    // of the stack
    showDetail: function(list, record) { 
	var view = this.getNoteNavigationView();
	view.push({
	    xtype: 'noteDetail',
	    record: record
	});
    },

    onNoteSave: function(button, event) {
	console.log('NoteListController: Button "Save" pressed');
	
	// Save the form values to the record.
	// The record was set by the NoteNavigationController
	var noteStore = Ext.data.StoreManager.lookup('NoteStore');
	var form = button.up('formpanel');
	var values = form.getValues();
	var rec = form.getRecord();
	
	// Check if we are about to create a new note
	if (typeof rec === "undefined" || rec == null) {
	    // Create a new note and set values
	    rec = Ext.ModelManager.create(values, 'PO.model.Note');
	    rec.set(values);
	}
	rec.save({                // Save the model - generates PUT or POST to REST backend
	    success: function(record, operation) {
		console.log('Successfully updated im_note object');
		// Retrieve the new server-side Oid (object ID) of the new note and store into the model
		if (record.get('id') == '') {
		    var restResponseText = operation._response.responseText;
		    var restResponseObject = Ext.JSON.decode(restResponseText);
		    var restOid = '' + restResponseObject.data[0].rest_oid; // new object_id as string
		    record.set('id', restOid+'');                      // set the ID of the note_id
		    noteStore.add(rec);                                // Add the note to the store.
		}
	    },
	    failure: function(record, operation) {
		Ext.Msg.alert('Failed', operation.request.scope.reader.jsonData["message"], Ext.emptyFn);
	    }
	});
	
	// Return to the list of notes page
	var navView = button.up('noteNavigationView');
	navView.pop();
    },


    onNoteDelete: function(button, event) {
	console.log('NoteListController: Button "Delete" pressed');
	
	// Save the form values to the record.
	// The record was set by the NoteNavigationController
	var noteStore = Ext.data.StoreManager.lookup('NoteStore');
	var form = button.up('formpanel');
	var values = form.getValues();
	var rec = form.getRecord();
	
	// Did we create a completely new note?
	if (typeof rec === "undefined" || rec == null) {
	    return;	            // The record was new - no need to delete then...
	}
	
	noteStore.remove(rec);      // Remove the note from the store
	rec.erase();                // Generates DELETE call to REST backend
	
	// Return to the list of notes page
	var navView = button.up('noteNavigationView');
	navView.pop();
    }

});

