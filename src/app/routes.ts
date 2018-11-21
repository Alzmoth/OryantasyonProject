import { Route, Routes } from "@angular/router";
import { HomeSComponent } from "./student/home-s/home-s.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeAComponent } from "./admin/home-a/home-a.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";

export const appRoutes: Routes = [

    { path: 'home', component: HomeSComponent,canActivate:[AuthGuard] },
    { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
    { path: 'adminHome', component: HomeAComponent,canActivate:[AuthGuard] , data:{roles:['Admin']} },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    }, 
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },

    {path:'' , redirectTo:'/login', pathMatch:'full'}
];