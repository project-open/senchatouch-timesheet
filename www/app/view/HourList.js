/*
 * HourList.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 * List of Hours logged on a specific task.
 */
Ext.define('PO.view.HourList', {
    extend: 'Ext.List',
    xtype: 'hourList',
    requires: ['PO.store.HourOneProjectStore'],

    config: {
	title: 'Hour List',
	iconCls: 'star',
	itemTpl: '<div class="contact2">{date} {hours} {note} </div>',
	disclosure: true,
	grouped: true,
	indexBar: true,
	store: 'HourOneProjectStore',
	onItemDisclosure: true
    }
});

