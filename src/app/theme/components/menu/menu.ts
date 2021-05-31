import {Menu} from './menu.model';
import {PermsEnum} from '../../../models/utilites/PermsEnum';

export const verticalMenuItems = [
    new Menu(1, 'sys-users', '/example', null, 'post_add', null, false, 0, 'MENU.Adminstration.SystemUsers', null),

    /*
        new Menu(1, 'Dashboard', '/', null, 'dashboard', null, false, 0, 'MENU.Dashboard', null),
        new Menu(2, 'Users', '/users', null, 'supervisor_account', null, false, 0, 'MENU.Users', null),
        new Menu(3, 'Adminstration', null, null, 'supervisor_account', null, true, 0, 'MENU.Adminstration', null),
        new Menu(4, 'System Users', '/admin/sys-users', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.SystemUsers', null),
        new Menu(5, 'System Services', '/admin/services', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.SystemServices', null),
        new Menu(6, 'System Roles', '/admin/roles', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.SystemRoles', null),
        new Menu(7, 'System Perms', '/admin/perms', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.systemPerms', null),
    */

];

export const horizontalMenuItems = [
 /*   new Menu(1, 'Dashboard', '/', null, 'dashboard', null, false, 0, 'MENU.Dashboard', null),
    new Menu(2, 'Users', '/users', null, 'supervisor_account', null, false, 0, 'MENU.Users', null),
    new Menu(3, 'Adminstration', null, null, 'supervisor_account', null, true, 0, 'MENU.Adminstration', null),
    new Menu(4, 'System Users', '/admin/sys-users', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.SystemUsers', null),
    new Menu(5, 'System Services', '/admin/spInfo', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.SystemServices', null),
    new Menu(6, 'System Roles', '/admin/roles', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.SystemRoles', null),
    new Menu(7, 'System Perms', '/admin/perms', null, 'supervisor_account', null, false, 3, 'MENU.Adminstration.systemPerms', null),
*/
];

export const horizontal_Admin_MenuItems = [
/*
    new Menu(3, 'Adminstration', null, null, 'supervisor_account', null, true, 0, 'MENU.Adminstration', null),
    new Menu(4, 'System Users', '/admin/sys-users', null, 'supervisor_account', null, false, 3, 'GENERIC.admins', PermsEnum.ADMIN_VIEW_RELATED_USERS),
    new Menu(5, 'System Services', '/admin/spInfo', null, 'supervisor_account', null, false, 3, 'GENERIC.sp', PermsEnum.ADMIN_VIEW_SP_INFO),
    new Menu(7, 'System Perms', '/admin/perms', null, 'build_circle', null, false, 3, 'MENU.Adminstration.systemPerms', PermsEnum.ADMIN_VIEW_PERMISSIONS),

    new Menu(8, 'Reqs', null, null, 'toys', null, true, 0, 'SP.reqs', null),
    new Menu(9, 'svReqs', '/req/vehiclesRq', null, 'two_wheeler', null, false, 8, 'sv.Reqs',PermsEnum.ADMIN_ACTION_SV_REQUESTS_VIEW),

    new Menu(10, 'resv', '/reservationsAdmin', null, 'two_wheeler', null, true, 0, 'GENERIC.resv',PermsEnum.ADMIN_VIEW_RESRERVATIONS),
    new Menu(11, 'vehiclesHiringResv', '/reservationsAdmin/vehiclesHiringResv', null, 'two_wheeler', null, false, 10, 'resv.prev.resrv.hiring',PermsEnum.ADMIN_VIEW_RESRERVATIONS),
*/


];

export const horizontal_Customer_MenuItems = [
/*
    new Menu(1, 'reservations', '/reservations', null, 'toys', null, true, 0, 'resv.prev.resrv', null),
    new Menu(2, 'HiringV', '/reservations/HiringV', null, 'rowing', null, false, 1, 'resv.prev.resrv.hiring', null),
*/

];

export const horizontal_SP_MenuItems = [
   /* new Menu(1, 'Dashboard', '/spDashboard', null, 'dashboard', null, false, 0, 'MENU.Dashboard', null),
    new Menu(2, 'SpAdminstration', '/spAdmin/sp-sys-users', null, 'supervisor_account', null, true, 0, 'SP.admins', null),
    new Menu(3, 'Sp System Users', '/spAdmin/sp-sys-users', null, 'supervisor_account', null, false, 2, 'SP.users', null),
    new Menu(4, 'Sp Services Menu', null, null, 'toys', null, true, 0, 'SP.myServices', null),
    new Menu(5, 'Vehicles', '/spServices/sp-vehicles', null, 'two_wheeler', null, false, 4, 'SP.vehicles', null),
    new Menu(6, 'Vehicles-req', '/spServices/sp-vehicles-req', null, 'two_wheeler', null, false, 4, 'sv.Reqs', null)

*/
];

export const horizontal_Public_MenuItems = [
    new Menu(1, 'sys-users', '/example', null, 'post_add', null, false, 0, 'MENU.Adminstration.SystemUsers', null),
    // new Menu(2, 'Meeting Organisation', '/seminars', null, 'people', null, false, 0, 'guider.meetings', null),
/*
    new Menu(3, 'Guiders Chat', '/chat', null, 'chat', null, false, 0, 'guider.chat', null),
    new Menu(4, 'Schedule', "/schedule", null, 'today', null, false, 0, 'guider.sheduals', null),
*/

];


