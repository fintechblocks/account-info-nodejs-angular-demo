import { AuthorizationService } from './api/authorization.service';
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { AccountRequestsService } from './api/accountRequests.service';
import { AccountsService } from './api/accounts.service';
import { BalancesService } from './api/balances.service';
import { BeneficiariesService } from './api/beneficiaries.service';
import { DirectDebitsService } from './api/directDebits.service';
import { PermissionsService } from './api/permissions.service';
import { ProductsService } from './api/products.service';
import { StandingOrdersService } from './api/standingOrders.service';
import { TransactionsService } from './api/transactions.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    AccountRequestsService,
    AccountsService,
    BalancesService,
    BeneficiariesService,
    DirectDebitsService,
    PermissionsService,
    ProductsService,
    StandingOrdersService,
    TransactionsService,
    AuthorizationService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
