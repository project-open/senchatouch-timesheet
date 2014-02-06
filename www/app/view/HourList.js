/*
 * HourList.js
 * (c) 2013 ]project-open[
 * Please see www.project-open.org/en/project_open_license for details
 *
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

