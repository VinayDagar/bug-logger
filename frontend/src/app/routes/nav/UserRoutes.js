import Dashboard from 'pages/user/Dashboard';
import ManageProject from 'pages/user/ManageProject/ManageProject';
import ManageTask from "pages/user/ManageTask";

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
    {
        url: `${url}/my-task`,
        name: 'MyTask',
        component: ManageTask
    },
];
