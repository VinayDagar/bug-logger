exports.createProjectController = async (req, res, next) => {
    try {
        const { projectName, view } = req.body;

        if (!projectName) {
            const error = new Error("Project name can not be null!");
            error.statusCode = 400;
            return next(error);
        }

        await domain.Project.create({
            id: configHolder.generateUniqueId(),
            projectName, view,
            createdBy: req.loggedInUser.id
        });

        const response = views.JsonView({ message: "Project created!" });
        return res.status(201).json(response);

    } catch (err) {
        next(err);
    }
};

exports.addProjectSectionController = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { projectId } = req.params;

        if (!name) {
            const error = new Error("Section name is required!");
            error.statusCode = 400;
            return next(error);
        }

        const project = await domain.Project.findOne({
            where: {
                id: projectId
            }
        });

        if (!project) {
            const error = new Error("Project not found!");
            error.statusCode = 404;
            return next(error);
        }

        await domain.Section.create({
            id: configHolder.generateUniqueId(),
            name, projectId,
            createdBy: req.loggedInUser.id
        });

        const response = views.JsonView({ message: "Section added!" });
        return res.status(201).json(response);

    } catch (err) {
        next(err);
    }
};

exports.addProjectMemberController = async (req, res, next) => {
    try {
        const { member } = req.body;
        const { projectId } = req.params;

        if (!member) {
            const error = new Error("Member is required!");
            error.statusCode = 400;
            return next(error);
        }

        const project = await domain.Project.findOne({
            where: {
                id: projectId
            }
        });

        if (!project) {
            const error = new Error("Project not found!");
            error.statusCode = 404;
            return next(error);
        }

        const user = await domain.User.findOne({
            where: {
                id: member
            },
            attributes: ["id", "name"]
        });

        if (!user) {
            const error = new Error("Member not found!");
            error.statusCode = 404;
            return next(error);
        }

        const existingMember = await domain.ProjectMember.findOne({
            where: {
                projectId,
                memberId: member
            }
        });

        if (existingMember) {
            const error = new Error("Duplicate member not allowed!");
            error.statusCode = 400;
            return next(error);
        }

        if (user.id === project.createdBy) {
            const error = new Error("Creator can not be add as a member!");
            error.statusCode = 400;
            return next(error);
        }

        await domain.ProjectMember.create({
            id: configHolder.generateUniqueId(),
            name: user.name,
            projectId,
            memberId: member
        });

        const emaildata = {
            name: member.name,
            projectName: project.projectName,
            createdBy: req.loggedInUser.name
        };

        // await configHolder.emailUtility.sendEmail({
        //     type: "html",
        //     data: emaildata,
        //     templateName: "add-member",
        //     to: member?.User?.email,
        //     subject: `You have been added as an member  ${req.loggedInUser.name}`,
        // });

        await domain.Notification.create({
            id: configHolder.generateUniqueId(),
            title: `Added as an member by ${req.loggedInUser.name}`,
            message: "Added as an member",
            userId: member.id,
            payload: emaildata,
        });

        const response = views.JsonView({ message: "Member sucessfully added!" });
        return res.status(201).json(response);

    } catch (err) {
        next(err);
    }
};

exports.createTaskController = async (req, res, next) => {
    try {
        const {
            title, description,
            priority
        } = req.body;

        const { sectionId } = req.params;

        const section = await domain.Section.findOne({
            where: {
                id: sectionId
            }
        });

        if (!section) {
            const error = new Error("Section not found!");
            error.statusCode = 404;
            return next(error);
        }

        await domain.Task.create({
            id: configHolder.generateUniqueId(),
            title, description,
            priority,
            createdBy: req.loggedInUser.id,
            sectionId
        });

        const response = views.JsonView({ message: "Task created" });
        return res.status(201).json(response);

    } catch (err) {
        next(err);
    }
};

exports.assignTaskController = async (req, res, next) => {
    try {
        const { memberId, taskId, projectId } = req.params;

        const project = await domain.Project.findOne({
            where: {
                id: projectId
            }
        });

        if (!project) {
            const error = new Error("Project not found!");
            error.statusCode = 404;
            return next(error);
        }

        const task = await domain.Task.findOne({
            where: {
                id: taskId
            },
            include: [
                {
                    model: domain.Section,
                    include: [{
                        model: domain.Project,
                        attributes: ["id"]
                    }]
                }
            ]
        });

        if (!task) {
            const error = new Error("Task not found!");
            error.statusCode = 404;
            return next(error);
        } else if (task?.Section?.Project.id !== projectId) {
            const error = new Error("Task does not belongs to the project");
            error.statusCode = 400;
            return next(error);
        }

        const member = await domain.ProjectMember.findOne({
            where: {
                $and: [
                    {
                        id: memberId,
                    }, {
                        projectId
                    }
                ]
            },
            include: [{
                model: domain.User,
                attributes: ["email"]
            }]
        });

        if (!member) {
            const error = new Error("Not the member of the project!");
            error.statusCode = 404;
            return next(error);
        }

        await task.update({
            assignedTo: memberId
        });

        const emaildata = {
            name: member.name,
            taskTitle: task.title,
            projectName: project.projectName,
            createdBy: req.loggedInUser.name
        };
        // await configHolder.emailUtility.sendEmail({
        //     type: "html",
        //     data: emaildata,
        //     templateName: "assign-task",
        //     to: member?.User?.email,
        //     subject: `New Task Assiged to you by ${req.loggedInUser.name}`,
        // });

        await domain.Notification.create({
            id: configHolder.generateUniqueId(),
            title: `New Task Assiged to you by ${req.loggedInUser.name}`,
            message: task.title,
            userId: member.id,
            payload: { ...emaildata, taskId },
            type: "task_assign"
        });

        const response = views.JsonView({ message: "task assigned!" });
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};

exports.getUserProjectListController = async (req, res, next) => {
    try {
        const { loggedInUser } = req;

        const userProjects = await domain.ProjectMember.findAll({
            where: {
                memberId: loggedInUser.id
            },
            include: [
                {
                    model: domain.Project,
                    attributes: ["projectName", "id"],
                    include: [
                        {
                            model: domain.ProjectMember,
                            attributes: ["id", "name"],
                        }
                    ]
                }
            ]
        });

        const response = views.JsonView({ projects: userProjects });
        return res.status(200).json(response);

    } catch (err) {
        return next(err);
    }
};

exports.getProjectDetailController = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await domain.Project.findByPk(projectId, {
            attributes: ["id", "projectName", "createdBy", "description", "createdAt"],
            include: [{
                model: domain.ProjectMember,
                attributes: ["id", "name", "createdAt", "memberId", "role"]
            }, {
                model: domain.User,
                attributes: ["id", "name"]
            }]
        });

        if (!project) {
            const error = new Error("Project not found!");
            error.statusCode = 404;
            return next(error);
        }

        const response = views.JsonView(project);
        return res.status(200).json(response);

    } catch (err) {
        return next(err);
    }
};

exports.updateMemberRole = async (req, res, next) => {
    try {
        const { memberId } = req.params;
        const { role } = req.body;

        const projectMember = await domain.ProjectMember.findByPk(memberId);

        if (!projectMember) {
            const error = new Error("Member not found in the selected project!");
            error.statuscode = 404;
            return next(error);
        }

        await projectMember.update({ role });

        const response = views.JsonView({ message: "role successfully added!" });
        return res.status(200).json(response);

    } catch (err) {
        return next(err);
    }
};

exports.removeMemberOwnership = async (req, res, next) => {
    try {
        const { projectId, memberId } = req.params;

        const projectMember = await domain.ProjectMember.findOne({
            where: {
                $and: [
                    { projectId },
                    { memberId },
                ]
            }
        });

        if (!projectMember) {
            const error = new Error("Member does not exist in the project!");
            error.statusCode = 404;
            return next(error);
        }

        const project = await domain.Project.findByPk(projectId, {
            attributes: ["id", "createdBy"]
        });

        let response;
        if (project.createdBy !== memberId) {
            response = views.JsonView({ message: "Selected member is not the owner of project already!" });
            return res.status(200).json(response);
        }

        await project.update({
            createdBy: null
        });

        response = views.JsonView({ message: "member removed as owner!" });
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
};

exports.setMemberOwnership = async (req, res, next) => {
    try {
        const { projectId, memberId } = req.params;

        const projectMember = await domain.ProjectMember.findOne({
            where: {
                $and: [
                    { projectId },
                    { memberId },
                ]
            }
        });

        if (!projectMember) {
            const error = new Error("Member does not exist in the project!");
            error.statusCode = 404;
            return next(error);
        }

        const project = await domain.Project.findByPk(projectId, {
            attributes: ["id", "createdBy"]
        });

        let response;
        if (project.createdBy === memberId) {
            response = views.JsonView({ message: "Selected member is already the owner of project!" });
            return res.status(200).json(response);
        }

        await project.update({
            createdBy: memberId
        });

        response = views.JsonView({ message: "" });
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
};

exports.updateProjectDescription = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { description } = req.body;

        const project = await domain.Project.findByPk(projectId);

        if (!project) {
            const error = new Error("Project does not exist!");
            error.statusCode = 404;
            return next(error);
        }

        await project.update({
            description
        });

        const response = views.JsonView({ message: "description updated!" });
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
};

exports.removeMemberFromProject = async (req, res, next) => {
    try {
        const { projectId, memberId } = req.params;

        const projectMember = await domain.ProjectMember.findOne({
            where: {
                $and: [
                    { projectId },
                    { memberId },
                ]
            }
        });

        if (!projectMember) {
            const error = new Error("Member does not exist in the project!");
            error.statusCode = 404;
            return next(error);
        }

        const project = await domain.Project.findByPk(projectId, {
            attributes: ["id", "createdBy"]
        });

        let response;
        if (project.createdBy === memberId) {
            const error = new Error("Can not remove te owner from the project!");
            error.statusCode = 403;
            return next(error);
        }

        await projectMember.destroy();

        response = views.JsonView({ message: "removed" });
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
};

exports.getProjectsSectionAndTaskList = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await domain.Project.findByPk(projectId);

        if (!project) {
            const error = new Error("Project not found!");
            error.statusCode = 404;
            return next(error);
        }

        const sections = await domain.Section.findAll({
            where: {
                projectId
            },
            attributes: ["id", "name", "createdBy"],
            include: [{
                model: domain.User,
                attributes: ["name"]
            }, {
                model: domain.Task,
                attributes: ["title", "description", "priority", "assignedTo", "status", "id"],
                include: [{
                    model: domain.ProjectMember,
                    attributes: ["id", "name"]
                }]
            }]
        });

        const response = views.JsonView({ sections });
        return res.status(200).json(response);

    } catch (err) {
        console.log(err);
    }
};

exports.getProjectMemberList = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await domain.Project.findByPk(projectId);

        if (!project) {
            const error = new Error("Project not found!");
            error.statusCode = 404;
            return next(error);
        }

        const projectMembers = await domain.ProjectMember.findAll({
            where: {
                projectId
            }
        });


        const response = views.JsonView({ projectMembers });
        return res.status(200).json(response);

    } catch (err) {
        return next(err);
    }
};

exports.getMyTaskListController = async (req, res, next) => {
    try {
        const { loggedInUser } = req;

        const projectMembers = await domain.ProjectMember.findAll({
            where: {
                memberId: loggedInUser.id
            },
            attributes: ["id"]
        });

        const taskList = await domain.Task.findAll({
            where: {
                assignedTo: {
                    $in: projectMembers.map(a => a.id)
                }
            },
            attributes: ["id", "title", "description", "priority", "status"],
            include: [{
                model: domain.User,
                attributes: ["name", "email"]
            }, {
                model: domain.Section,
                attributes: ["name", "id"],
                include: [{
                    model: domain.Project,
                    attributes: ["id", "projectName"]
                }]
            }]
        });

        const response = views.JsonView({ taskList });
        return res.status(200).json(response);

    } catch (err) {
        return next(err);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const task = await domain.Task.findByPk(taskId);

        if (!task) {
            const error = new Error("Task not found");
            error.statusCode = 404;
            return next(error);
        }

        await task.update({ status });

        const response = views.JsonView({ message: "Updaetd" });
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
};
