import {Router , RouterModule, PreloadAllModules } from '@angular/router';

//----------

import { HomeMainComponent }   from './com/home/main/ui/com.home.main';
import {SearchDrugComponent} from './com/drug/searchdrug/ui/com.drug.searchdrug'
import {DashboardComponent} from './com/notifications/dashboard/com.dashboard'

export const routing = RouterModule.forRoot([
    {path: '', component: HomeMainComponent},
    {path: 'home', component: HomeMainComponent},
    {path: 'dashboard1', component: DashboardComponent},
    {path: 'drug',component: SearchDrugComponent}
], { useHash: true , preloadingStrategy:PreloadAllModules});
