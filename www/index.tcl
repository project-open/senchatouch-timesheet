# /packages/senchatouch-timesheet/www/index.tcl
#
# Copyright (c) 2011 - 2014 ]project-open[ Business Solutions, S.L.
# This file may be used under the terms of the GNU General Public 
# License version 3.0 or alternatively unter the terms of the ]po[ 
# FL or CL license as specified in www.project-open.org/en/license.
#

ad_page_contract {
    @author frank.bergmann@ticket-open.com
} {
}

# ---------------------------------------------------------------
# Defaults & Security
# ---------------------------------------------------------------

set current_user_id [ad_maybe_redirect_for_registration]
