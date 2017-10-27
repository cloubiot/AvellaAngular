import {Router , RouterModule } from '@angular/router';

//----------
import {DashboardComponent} from './dashboard/com.dashboard';
import {SearchNotificationComponent} from './searchnotification/ui/com.notifications.searchnotification';
import {AddNotificationComponent} from './addnotification/com.notifications.addnotification';

export const NotificationRouting = RouterModule.forChild([

    {path: 'dashboard1', component: DashboardComponent,
        children: [
            {path: 'search-notification', component: SearchNotificationComponent},
            {path: 'addnotification', component: AddNotificationComponent},
            {path: 'edit-notification/:id', component: AddNotificationComponent},
          
            
       ]
    }, 

]);