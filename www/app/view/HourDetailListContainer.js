/*
 * HourDetailListContainer.js
 *
 * Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
 * This file may be used under the terms of the GNU General Public 
 * License version 3.0 or alternatively unter the terms of the ]po[ 
 * FL or CL license as specified in www.project-open.org/en/license.
 */

/**
 *
 */
Ext.define('PO.view.HourDetailListContainer', {
    extend: 'Ext.navigation.View',
    xtype: 'hourDetailListContainer',
    requires: [
	'PO.view.HourList'
    ],

    config: {
	title: 'Hour Detail List Container',
	items: [
	    {
		xtype: 'hourPanelDetail'
	    },
	    {
		xtype: 'hourList'
	    }
	]
    }
});
