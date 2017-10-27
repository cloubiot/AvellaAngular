import {Router , RouterModule } from '@angular/router';
import {AuthGuard} from './gaurd/com.usermgmt.gaurd'
//----------
import {DashboardComponent} from '../notifications/dashboard/com.dashboard';
import {SearchDrugComponent} from './searchdrug/ui/com.drug.searchdrug';
import {AddDrugComponent} from './addDrug/com.drug.addDrug';
import {DrugPreviewComponent} from './drugpreview/com.drug.drugpreview';

export const DrugRouting = RouterModule.forChild([
    {path: 'dashboard1', component: DashboardComponent,
        children: [
    {path: 'search-drug', canActivate: [AuthGuard], component: SearchDrugComponent},
    {path: 'add-drug', component: AddDrugComponent},
    {path:'edit-drug/:id', component: AddDrugComponent},
    {path: 'drug-preview', component: DrugPreviewComponent}
        ]
    }
]);