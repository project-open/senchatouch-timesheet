/*
 * ProjectTimesheetDataViewItem.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 *
 */
Ext.define('PO.view.ProjectTimesheetDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype : 'projectTimesheetDataViewItem',
    requires: [
	'Ext.Button'
    ],

    config: {
        logButton: {
	    text: 'Log',
	    handler: function() {
		console.log('Log-handler');
	    }
	},

        nameButton: {
	    ui: 'plain',
	    style: 'background-color:white;',
	    iconCls: 'nameButton',
	    handler: function() {
		console.log('Project-handler');
	    }
        },

        dataMap: {
            getLogButton: { },
            getNameButton: { setText: 'project_name_indented' }
        },

        layout: {
            type: 'hbox',
            align: 'center'
        }
    },

    applyLogButton: function(config) {
	return Ext.factory(config, Ext.Button, this.getLogButton());
    },

    applyNameButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getNameButton());
    },
/*
    applyNameButton: function(config) {
        return Ext.factory(config, Ext.Component, this.getNameButton());
    },
*/

    // Stupid update functions.
    updateLogButton: function(newLogButton, oldLogButton) {
        if (oldLogButton) { this.remove(oldLogButton); }
        if (newLogButton) { this.add(newLogButton); }
    },
    updateNameButton: function(newNameButton, oldNameButton) {
        if (newNameButton) { this.add(newNameButton); }
        if (oldNameButton) { this.remove(oldNameButton); }
    }

});





