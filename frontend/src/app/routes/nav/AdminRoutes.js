import Dashboard from 'pages/admin/Dashboard';
import ClientList from 'pages/admin/Client';
import ManageMachine from 'pages/admin/ManageMachine';
import ConsumableHistory from 'pages/admin/ManageMachine/ConsumableHistory';
import EscalationList from 'pages/admin/System/Escalation';
import ConsumableMessage from "pages/admin/System/ConsumableMessage";
import ConsumableMessageList from "pages/admin/ManageConsumableMessage";

const url = '/admin';

export default [
    {
        url: `${url}/dashboard`,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        url: `${url}/manage-client`,
        name: 'ClientList',
        component: ClientList
    },
    {
        url: `${url}/manage-machine`,
        name: 'MachinetList',
        component: ManageMachine
    },
    {
        url: `${url}/manage-escalation`,
        name: 'EscalationList',
        component: EscalationList
    },
    {
        url: `${url}/consumable-message`,
        name: 'ConsumableMessage',
        component: ConsumableMessage
    },
    {
        url: `${url}/:clientId/consumable-history/:machineId`,
        name: 'ConsumableHistory',
        component: ConsumableHistory
    },
    {
        url: `${url}/manage-consumable-message`,
        name: 'ConsumableMessageList',
        component: ConsumableMessageList
    },
];
