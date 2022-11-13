import { Notification } from "./notification.model";
import { Role } from "./role.model";

export class AllRoles {
    totalElements:any;
    totalPages:any;
    notification = new Notification();
    roleResponseDtos: Role[] = [];
    currentPage:any;
}