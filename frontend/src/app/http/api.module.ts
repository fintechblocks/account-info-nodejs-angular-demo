import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { AccountAccessService } from './api/accountAccess.service';
import { AccountsService } from './api/accounts.service';
import { BalancesService } from './api/balances.service';
import { BeneficiariesService } from './api/beneficiaries.service';
import { DirectDebitsService } from './api/directDebits.service';
import { ScheduledPaymentsService } from './api/scheduledPayments.service';
import { StandingOrdersService } from './api/standingOrders.service';
import { StatementsService } from './api/statements.service';
import { TransactionsService } from './api/transactions.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    AccountAccessService,
    AccountsService,
    BalancesService,
    BeneficiariesService,
    DirectDebitsService,
    ScheduledPaymentsService,
    StandingOrdersService,
    StatementsService,
    TransactionsService ]
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
