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
                        memberId,
                    }, {
                        projectId
                    }
                ]
            }
        });

        if (!member) {
            const error = new Error("Not the member of the project!");
            error.statusCode = 404;
            return next(error);
        }

        await task.update({
            assignedTo: memberId
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
