import { AlertService } from './../_services/alert.service';
import { StandingOrder } from './../http/model/standingOrder';
import { StandingOrdersService } from './../http/api/standingOrders.service';
import { DirectDebit } from './../http/model/directDebit';
import { DirectDebitsService } from './../http/api/directDebits.service';
import { Beneficiary } from './../http/model/beneficiary';
import { BeneficiariesService } from './../http/api/beneficiaries.service';
import { Balance } from './../http/model/balance';
import { BalancesService } from './../http/api/balances.service';
import { Permissions } from './../http/model/permissions';
import { AccountsService } from './../http/api/accounts.service';
import { TransactionsService } from './../http/api/transactions.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from './../http/api/authorization.service';
import { Data } from './../http/model/data';
import { AccountRequestPOSTRequest } from './../http/model/accountRequestPOSTRequest';
import { AccountRequestsService } from './../http/api/accountRequests.service';
import { first } from 'rxjs/operators';
import { Account } from './../http/model/account';
import { User } from '../_models';
import { UserService } from '../_services';
import { MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DateAdapter } from '@angular/material'
import * as moment from 'moment'

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    //enum ngfor 
    keys = Object.keys;
    currentUser: User;
    transactions;
    emyptyAuthorization: string = '';
    permissions = Data.PermissionsEnum;
    //add empty auth
    selectedPermissions = [];
    authorizedPermissions = [];

    /**transactions interval */
    toTransactionDateTime;
    fromTransactionDateTime;

    /**transactions in account requests interval */
    toAccountRequestTransactionDateTime;
    fromAccountRequestTransactionDateTime;

    /**expiration date */
    expirationDateTime;

    /*material table data source */
    accountsDataSource;
    accountDataSource;

    transactionsDataSource;
    transactionsByAccountDataSource;

    balancesDataSource;
    balancesByAccountDataSource;

    beneficiariesDataSource;
    beneficiariesByAccountDataSource;

    directDebitsDataSource;
    directDebitsByAccountDataSource;

    standingOrdersDataSource;
    standingOrdersByAccountDataSource;

    /*material table columns */
    accountsDisplayedColumns: string[] = ['accountId', 'nickname', 'currency', 'arrow'];
    transactionsDisplayedColumns: string[] = ['accountId', 'amount', 'status', 'arrow'];
    balancesDisplayedColumns: string[] = ['accountId', 'amount', 'dateTime', 'arrow'];
    beneficiariesDisplayedColumns: string[] = ['accountId', 'reference', 'creditorAccount', 'arrow'];
    directDebitsDisplayedColumns: string[] = ['accountId', 'name', 'previousPaymentDateTime', 'amount', 'arrow'];
    standingOrdersDisplayedColumns: string[] = ['accountId', 'firstPaymentDateTime', 'nextPaymentDateTime', 'finalPaymentDateTime', 'arrow'];

    /*material table paginators */
    @ViewChild(MatPaginator) accountsPaginator: MatPaginator;
    @ViewChild(MatPaginator) accountPaginator: MatPaginator;

    @ViewChild(MatPaginator) balancesPaginator: MatPaginator;
    @ViewChild(MatPaginator) balancesByAccountPaginator: MatPaginator;

    @ViewChild(MatPaginator) transactionsPaginator: MatPaginator;
    @ViewChild(MatPaginator) transactionsByAccountPaginator: MatPaginator;

    @ViewChild(MatPaginator) beneficiariesPaginator: MatPaginator;
    @ViewChild(MatPaginator) beneficiariesByAccountPaginator: MatPaginator;

    @ViewChild(MatPaginator) directDebitsPaginator: MatPaginator;
    @ViewChild(MatPaginator) directDebitsByAccountPaginator: MatPaginator;

    @ViewChild(MatPaginator) standingOrdersPaginator: MatPaginator;
    @ViewChild(MatPaginator) standingOrdersByAccountPaginator: MatPaginator;

    /**No results. text */
    isEmptyAccounts: boolean = false;
    isEmptyTransactions: boolean = false;
    isEmptyBalances: boolean = false;
    isEmptyBeneficiaries: boolean = false;
    isEmptyDirectDebits: boolean = false;
    isEmptyStandingOrders: boolean = false;

    /**No results. text by account id */
    isEmptyAccountsById: boolean = false;
    isEmptyTransactionsById: boolean = false;
    isEmptyBalancesById: boolean = false;
    isEmptyBeneficiariesById: boolean = false;
    isEmptyDirectDebitsById: boolean = false;
    isEmptyStandingOrdersById: boolean = false;

    accountRequestResult;

    /**account request data list ui controllers */
    disabledAccountRequestData: boolean = false;
    loadingAccountRequestData: boolean = true;
    constructor(
        private alertService: AlertService,
        private route: ActivatedRoute,
        private _accountRequestsService: AccountRequestsService,
        private _authorizationUrlService: AuthorizationService,
        private _transactionsService: TransactionsService,
        private _accountsService: AccountsService,
        private _balancesService: BalancesService,
        private _beneficiariesService: BeneficiariesService,
        private _directDebitsService: DirectDebitsService,
        private _standingOrdersService: StandingOrdersService,
        public dialog: MatDialog,
        private dateAdapter: DateAdapter<Date>
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dateAdapter.setLocale('hu');
    }

    ngOnInit() {
        this.checkQueryParams();
    }

    checkQueryParams() {
        const url = window.location.href;
        if (url.includes("state")) {
            const state = url.split("&")[0].split("=")[1];
            const code = url.split("&")[1].split("=")[1];
            let params = { state: state, code: code };

            this._authorizationUrlService.postAuthorizationCallback(params).subscribe(
                result => {
                    this.getAccountRequest();
                },
                error => {
                    this.alertService.error(error);
                });
            this.removeParamsFromUrl();
        } else {
            this.getAccountRequest();
        }
    }

    getAccountRequest() {
        const currentAccountRequestId = localStorage.getItem('currentAccountRequestId');
        if (currentAccountRequestId) {
            this._accountRequestsService.getAccountRequest(currentAccountRequestId, this.emyptyAuthorization)
                .subscribe(result => {
                    this.authorizedPermissions = result.Data.Permissions;
                    this.accountRequestResult = result;

                    this.toAccountRequestTransactionDateTime = result.Data.TransactionToDateTime ? moment(result.Data.TransactionToDateTime).format() : null;
                    this.fromAccountRequestTransactionDateTime = result.Data.TransactionFromDateTime ? moment(result.Data.TransactionFromDateTime).format() : null;
                    this.expirationDateTime = result.Data.ExpirationDateTime ? moment(result.Data.ExpirationDateTime).format() : null;

                    if (this.authorizedPermissions.length != 0) {
                        this.selectedPermissions = this.selectedPermissions.concat(this.authorizedPermissions);
                    }

                    this.disabledAccountRequestData = true;
                    this.loadingAccountRequestData = true;
                },
                    error => {
                        this.alertService.error(error);
                    });
        }
    }

    removeParamsFromUrl() {
        window.history.pushState({}, document.title, "/" + "");
    }

    createAccountRequest() {
        const request: AccountRequestPOSTRequest = {
            Data: {
                Permissions: this.selectedPermissions
            },
            Risk: {}
        }
        if (this.expirationDateTime) {
            request.Data.ExpirationDateTime = this.expirationDateTime;
        }
        if (this.fromAccountRequestTransactionDateTime) {
            request.Data.TransactionFromDateTime = this.fromAccountRequestTransactionDateTime;
        }
        if (this.toAccountRequestTransactionDateTime) {
            request.Data.TransactionToDateTime = this.toAccountRequestTransactionDateTime;
        }

        this._accountRequestsService.createAccountRequest(request, this.emyptyAuthorization)
            .subscribe(result => {
                localStorage.setItem('currentAccountRequestId', result.Data.AccountRequestId);
                this.redirectAuthorizationUrl(result.Data.AccountRequestId)
            },
                error => {
                    this.alertService.error(error);
                });
    }

    redirectAuthorizationUrl(AccountRequestId) {
        this._authorizationUrlService.getAuthorizationUrl(AccountRequestId)
            .subscribe(
                url => {
                    window.location.href = url
                },
                error => {
                    this.alertService.error(error);
                });
    }

    selectPermission(permission) {
        if (!this.selectedPermissions.includes(permission)) {
            this.selectedPermissions.push(permission);
        } else {
            this.selectedPermissions = this.selectedPermissions.filter(item => item !== permission)
        }
    }

    isAuthorizedPermission(permission) {
        if (this.authorizedPermissions.includes(permission)) {
            return true;
        }
        return false;
    }

    modifyfromAccountRequestTransactionDateTime(inputDate) {
        this.fromAccountRequestTransactionDateTime = inputDate ? moment(inputDate).format() : undefined;
    }

    modifytoAccountRequestTransactionDateTime(inputDate) {
        this.toAccountRequestTransactionDateTime = inputDate ? moment(inputDate).format() : undefined;
    }

    modifyfromTransactionDateTime(inputDate) {
        this.fromTransactionDateTime = inputDate ? moment(inputDate).format() : undefined;
    }

    modifytoTransactionDateTime(inputDate) {
        this.toTransactionDateTime = inputDate ? moment(inputDate).format() : undefined;
    }

    modifyExpirationDateTimee(inputDate) {
        this.expirationDateTime = inputDate ? moment(inputDate).format() : null;
    }

    getTransactions() {
        const fromBookingDateTime = this.fromTransactionDateTime ? new Date(this.fromTransactionDateTime) : undefined;
        const toBookingDateTime = this.toTransactionDateTime ? new Date(this.toTransactionDateTime) : undefined;

        this._transactionsService.getTransactions(this.emyptyAuthorization, '', '', '', '', fromBookingDateTime, toBookingDateTime).subscribe(
            result => {
                this.transactionsDataSource = new MatTableDataSource<any>(result.Data.Transaction);
                if (result.Data.Transaction.length == 0) {
                    this.isEmptyTransactions = true;
                }
                setTimeout(() => this.transactionsDataSource.paginator = this.transactionsPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getTransactionByAccountId(accountId) {
        const fromBookingDateTime = this.fromTransactionDateTime ? new Date(this.fromTransactionDateTime) : undefined;
        const toBookingDateTime = this.toTransactionDateTime ? new Date(this.toTransactionDateTime) : undefined;

        this._transactionsService.getAccountTransactions(accountId.trim(), this.emyptyAuthorization, fromBookingDateTime, toBookingDateTime).subscribe(
            result => {
                if (result.Data.Transaction.length == 0) {
                    this.isEmptyTransactionsById = true;
                }

                this.transactionsByAccountDataSource = new MatTableDataSource<any>(result.Data.Transaction);
                setTimeout(() => this.transactionsByAccountDataSource.paginator = this.transactionsByAccountPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getAccounts() {
        this._accountsService.getAccounts(this.emyptyAuthorization).subscribe(
            result => {
                this.accountsDataSource = new MatTableDataSource<any>(result.Data.Account);
                if (result.Data.Account.length == 0) {
                    this.isEmptyAccounts = true;
                }
                setTimeout(() => this.accountsDataSource.paginator = this.accountsPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getAccountById(accountId) {
        this._accountsService.getAccount(accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                if (result.Data.Account.length == 0) {
                    this.isEmptyAccountsById = true;
                }
                this.accountDataSource = new MatTableDataSource<any>(result.Data.Account);
                setTimeout(() => this.accountDataSource.paginator = this.accountPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getBalances() {
        this._balancesService.getBalances(this.emyptyAuthorization).subscribe(
            result => {
                this.balancesDataSource = new MatTableDataSource<any>(result.Data.Balance);
                if (result.Data.Balance.length == 0) {
                    this.isEmptyBalances = true;
                }
                setTimeout(() => this.balancesDataSource.paginator = this.balancesPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getBalanceByAccountId(accountId) {
        this._balancesService.getAccountBalances(accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                if (result.Data.Balance.length == 0) {
                    this.isEmptyBalancesById = true;
                }
                this.balancesByAccountDataSource = new MatTableDataSource<any>(result.Data.Balance);
                setTimeout(() => this.balancesByAccountDataSource.paginator = this.balancesByAccountPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }


    getBeneficiaries() {
        this._beneficiariesService.getBeneficiaries(this.emyptyAuthorization).subscribe(
            result => {
                this.beneficiariesDataSource = new MatTableDataSource<any>(result.Data.Beneficiary);
                if (result.Data.Beneficiary.length == 0) {
                    this.isEmptyBeneficiaries = true;
                }
                setTimeout(() => this.beneficiariesDataSource.paginator = this.beneficiariesPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getBeneficiariesByAccount(accountId) {
        this._beneficiariesService.getAccountBeneficiaries(accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                if (result.Data.Beneficiary.length == 0) {
                    this.isEmptyBeneficiariesById = true;
                }
                this.beneficiariesByAccountDataSource = new MatTableDataSource<any>(result.Data.Beneficiary);
                setTimeout(() => this.beneficiariesByAccountDataSource.paginator = this.beneficiariesByAccountPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getDirectDebits() {
        this._directDebitsService.getDirectDebits(this.emyptyAuthorization).subscribe(
            result => {
                this.directDebitsDataSource = new MatTableDataSource<any>(result.Data.DirectDebit);
                if (result.Data.DirectDebit.length == 0) {
                    this.isEmptyDirectDebits = true;
                }
                setTimeout(() => this.directDebitsDataSource.paginator = this.directDebitsPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getDirectDebitsByAccount(accountId) {
        this._directDebitsService.getAccountDirectDebits(accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                if (result.Data.DirectDebit.length == 0) {
                    this.isEmptyDirectDebitsById = true;
                }
                this.directDebitsByAccountDataSource = new MatTableDataSource<any>(result.Data.DirectDebit);
                setTimeout(() => this.directDebitsByAccountDataSource.paginator = this.directDebitsByAccountPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getStandingOrders() {
        this._standingOrdersService.getStandingOrders(this.emyptyAuthorization).subscribe(
            result => {
                this.standingOrdersDataSource = new MatTableDataSource<any>(result.Data.StandingOrder);
                if (result.Data.StandingOrder.length == 0) {
                    this.isEmptyStandingOrders = true;
                }
                setTimeout(() => this.standingOrdersDataSource.paginator = this.standingOrdersPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getStandingOrdersByAccount(accountId) {
        this._standingOrdersService.getAccountStandingOrders(accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                if (result.Data.StandingOrder.length == 0) {
                    this.isEmptyStandingOrdersById = true;
                }
                this.standingOrdersByAccountDataSource = new MatTableDataSource<any>(result.Data.StandingOrder);
                setTimeout(() => this.standingOrdersByAccountDataSource.paginator = this.standingOrdersByAccountPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    openDataDetails(elementData) {
        this.dialog.open(ShowJsonDataDialog, {
            data: elementData
        });
    }
}
@Component({
    template: '<pre>{{data | json}}</pre>',
})
export class ShowJsonDataDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ShowJsonDataDialog) { }
}