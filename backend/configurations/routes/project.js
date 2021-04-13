const { Router } = require("express");
const { validate } = require("express-validation");
// Controllers
const {
    createProjectController, addProjectSectionController,
    addProjectMemberController, createTaskController,
    assignTaskController, getUserProjectListController,
    getProjectDetailController, updateMemberRole,
    removeMemberOwnership, setMemberOwnership,
    removeMemberFromProject
} = require("../../controllers/project");
// middlewares
const validationSchema = require("../../application/validations");
const { canAccess } = require("../../application/middlewares/access");
const authenticated = require("../../application/middlewares/authentication");

const router = Router();

router.post(
    "/create-project",
    // validate(validationSchema.createProject, {}, {}),
    authenticated,
    canAccess(["user"]),
    createProjectController
)
    .post("/add-section/:projectId",
        authenticated,
        canAccess(["user"]),
        addProjectSectionController
    ).post("/add-project-member/:projectId",
        authenticated,
        canAccess(["user"]),
        addProjectMemberController
    ).post("/create-task/:sectionId",
        validate(validationSchema.createTaskValidation, {}, {}),
        authenticated,
        canAccess(["user"]),
        createTaskController
    ).put("/assign-task/:projectId/:taskId/:memberId",
        authenticated,
        canAccess(["user"]),
        assignTaskController
    ).get(
        "/list",
        authenticated,
        canAccess(["user"]),
        getUserProjectListController
    ).get(
        "/details/:projectId",
        authenticated,
        canAccess(["user"]),
        getProjectDetailController
    ).put(
        "/update-member-role/:memberId",
        authenticated,
        canAccess(["user"]),
        updateMemberRole
    ).put(
        "/remove-member-ownership/:projectId/:memberId",
        authenticated,
        canAccess(["user"]),
        removeMemberOwnership
    ).put(
        "/set-member-ownership/:projectId/:memberId",
        authenticated,
        canAccess(["user"]),
        setMemberOwnership
    ).put(
        "/remove-member-project/:projectId/:memberId",
        authenticated,
        canAccess(["user"]),
        removeMemberFromProject
    );

module.exports = router;
