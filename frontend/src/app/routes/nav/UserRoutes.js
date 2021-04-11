import Dashboard from 'pages/user/Dashboard';
import ManageProject from 'pages/user/ManageProject/ManageProject';

const url = '/user';

export default [
    {
        url: `${url}/dashboard`,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        url: `${url}/manage-project/:projectId`,
        name: 'ManageProject',
        component: ManageProject
    },
];
