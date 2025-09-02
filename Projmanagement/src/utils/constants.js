export const UserRoleEnum = {
    ADMIN : "admin",
    PROJECT_ADMIN : "project_admin",
    MEMBER : "member"
}

export const AvaliableUserRole = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
    TODO : "todo",
    IN_PROGRESS : "in_progress",
    DONE : "done"
}

export const AvaliableTaskStatus = Object.values(TaskStatusEnum);