-- /packages/senchatouch-timesheet/sql/postgresql/senchatouch-timesheet-create.sql
--
-- Copyright (c) 2013 ]project-open[
--
-- All rights reserved. Please check
-- http://www.project-open.com/license/ for details.
--
-- @author frank.bergmann@project-open.com


SELECT im_report_new (
	'REST Main Project Tasks with Hours',				-- report_name
	'rest_main_project_tasks_with_hours',				-- report_code
	'intranet-rest',						-- package_key
	110,								-- report_sort_order
	(select menu_id from im_menus where label = 'reporting-rest'),	-- parent_menu_id
'select	child.project_id,
	child.parent_id,
	tree_level(child.tree_sortkey)-1 as level,
	child.tree_sortkey,
	child.project_name,
	child.project_nr,
	child.company_id,
	acs_object__name(child.company_id) as company_name,
	child.project_type_id,
	child.project_status_id,
	im_category_from_id(child.project_type_id) as project_type,
	im_category_from_id(child.project_status_id) as project_status,
	child.project_lead_id,
	im_name_from_user_id(child.project_lead_id) as project_lead_name,
	(	select	sum(h.hours)
		from	im_hours h
		where	h.project_id = child.project_id
	) as hours_total,
	(	select	sum(h.hours)
		from	im_hours h
		where	h.user_id = %user_id% and
			h.project_id = child.project_id
	) as hours_for_user,
	(	select	sum(h.hours)
		from	im_hours h
		where	h.user_id = %user_id% and
			h.project_id = child.project_id and
			h.day::date = ''%date%''::date
	) as hours_for_user_date
from
	im_projects parent,
	im_projects child
where
	child.tree_sortkey between parent.tree_sortkey and tree_right(parent.tree_sortkey) and
	parent.project_id = %main_project_id% and
	parent.project_status_id in (select * from im_sub_categories(76) union select * from im_sub_categories(71)) and
	child.project_status_id not in (select * from im_sub_categories(81))
order by
	child.tree_sortkey
');


update im_reports
set report_description = '
Returns the list of all sub-projects and tasks for one main
project, including the number of hours logged by the everybody,
the user himself and the user himself today.
Requires %main_project_id% and %date% as parameters,
optional %user_id% parameter.'
where report_code = 'rest_main_project_tasks_with_hours';

SELECT acs_permission__grant_permission(
	(select menu_id from im_menus where label = 'rest_main_project_tasks_with_hours'),
	(select group_id from groups where group_name = 'Employees'),
	'read'
);






SELECT im_report_new (
	'REST Main Projects with Hours',				-- report_name
	'rest_main_projects_with_hours',				-- report_code
	'intranet-rest',						-- package_key
	110,								-- report_sort_order
	(select menu_id from im_menus where label = 'reporting-rest'),	-- parent_menu_id
'select	project_id,
	tree_sortkey,
	project_name,
	project_nr,
	company_id,
	acs_object__name(company_id) as company_name,
	project_type_id,
	project_status_id,
	im_category_from_id(project_type_id) as project_type,
	im_category_from_id(project_status_id) as project_status,
	p.project_lead_id,
	im_name_from_user_id(p.project_lead_id) as project_lead_name,
	(	select	sum(h.hours)
		from	im_hours h
		where	h.project_id = p.project_id
	) as hours_total,
	(	select	sum(h.hours)
		from	im_hours h
		where	h.user_id = %user_id% and
			h.project_id = p.project_id
	) as hours_for_user,
	(	select	sum(h.hours)
		from	im_hours h
		where	h.user_id = %user_id% and
			h.project_id = p.project_id and
			h.day::date = ''%date%''::date
	) as hours_for_user_date
from
	im_projects p,
	acs_rels r
where
	p.parent_id is null and
	project_status_id not in (select * from im_sub_categories(81)) and
	r.object_id_one = p.project_id and
	r.object_id_two = %user_id%
order by
	p.tree_sortkey
');


update im_reports
set report_description = '
Returns the list of all main projects for the current user
together with the list of hours logged total, for the user
and for the user today.
Requires %date% URL parameter, optional is %user_id%.'
where report_code = 'rest_main_projects_with_hours';

SELECT acs_permission__grant_permission(
	(select menu_id from im_menus where label = 'rest_main_projects_with_hours'),
	(select group_id from groups where group_name = 'Employees'),
	'read'
);


