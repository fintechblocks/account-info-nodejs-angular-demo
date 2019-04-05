﻿import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DIALOG_DATA, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import { User } from '../_models';
import { OBReadConsent1, ScheduledPaymentsService, StatementsService } from '../http';
import { AlertService } from './../_services/alert.service';
import { AccountAccessService } from './../http/api/accountAccess.service';
import { AccountsService } from './../http/api/accounts.service';
import { AuthorizationService } from './../http/api/authorization.service';
import { BalancesService } from './../http/api/balances.service';
import { BeneficiariesService } from './../http/api/beneficiaries.service';
import { DirectDebitsService } from './../http/api/directDebits.service';
import { StandingOrdersService } from './../http/api/standingOrders.service';
import { TransactionsService } from './../http/api/transactions.service';
import { OBExternalPermissions1Code } from './../http/model/oBExternalPermissions1Code';

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
    fapiFinancialId: string = '';
    permissions = OBExternalPermissions1Code;
    //add empty auth
    selectedPermissions = [];
    authorizedPermissions = [];

    /**transactions interval */
    toTransactionDateTime;
    fromTransactionDateTime;

    /**transactions in account requests interval */
    toAccountAccessConsentTransactionDateTime;
    fromAccountAccessConsentTransactionDateTime;

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

    scheduledPaymentsDataSource;
    scheduledPaymentByAccountDataSource

    /*material table columns */
    accountsDisplayedColumns: string[] = ['accountId', 'nickname', 'currency', 'arrow'];
    transactionsDisplayedColumns: string[] = ['accountId', 'amount', 'status', 'arrow'];
    balancesDisplayedColumns: string[] = ['accountId', 'amount', 'dateTime', 'arrow'];
    beneficiariesDisplayedColumns: string[] = ['accountId', 'reference', 'creditorAccount', 'arrow'];
    directDebitsDisplayedColumns: string[] = ['accountId', 'name', 'previousPaymentDateTime', 'amount', 'arrow'];
    standingOrdersDisplayedColumns: string[] = ['accountId', 'firstPaymentDateTime', 'nextPaymentDateTime', 'finalPaymentDateTime', 'arrow'];
    scheduledPaymentsDisplayedColumns: string[] = ['accountId', 'scheduledPaymentDateTime', 'amount', 'arrow'];


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

    @ViewChild(MatPaginator) scheduledPaymentsPaginator: MatPaginator;
    @ViewChild(MatPaginator) scheduledPaymentByAccountPaginator: MatPaginator;

    /**No results. text */
    isEmptyAccounts: boolean = false;
    isEmptyTransactions: boolean = false;
    isEmptyBalances: boolean = false;
    isEmptyBeneficiaries: boolean = false;
    isEmptyDirectDebits: boolean = false;
    isEmptyStandingOrders: boolean = false;
    isEmptyScheduledPayments: boolean = false;

    /**No results. text by account id */
    isEmptyAccountsById: boolean = false;
    isEmptyTransactionsById: boolean = false;
    isEmptyBalancesById: boolean = false;
    isEmptyBeneficiariesById: boolean = false;
    isEmptyDirectDebitsById: boolean = false;
    isEmptyStandingOrdersById: boolean = false;
    isEmptyScheduledPaymentById: boolean = false;

    accountAccessConsentResult;

    /**account request data list ui controllers */
    disabledAccountAccessConsentData: boolean = false;
    loadingAccountAccessConsentData: boolean = true;
    constructor(
        private alertService: AlertService,
        private route: ActivatedRoute,
        private _accountAccessService: AccountAccessService,
        private _authorizationUrlService: AuthorizationService,
        private _transactionsService: TransactionsService,
        private _accountsService: AccountsService,
        private _balancesService: BalancesService,
        private _beneficiariesService: BeneficiariesService,
        private _directDebitsService: DirectDebitsService,
        private _standingOrdersService: StandingOrdersService,
        public dialog: MatDialog,
        private dateAdapter: DateAdapter<Date>,
        private _scheduledPaymentsService: ScheduledPaymentsService,
        private _statementsService: StatementsService
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
                    this.getAccountAccessConsent();
                },
                error => {
                    this.alertService.error(error);
                });
            this.removeParamsFromUrl();
        } else {
            this.getAccountAccessConsent();
        }
    }

    getAccountAccessConsent() {
        const currentConsentId = localStorage.getItem('currentConsentId');
        if (currentConsentId) {
            this._accountAccessService.getAccountAccessConsentsConsentId(currentConsentId, this.emyptyAuthorization)
                .subscribe(result => {
                    this.authorizedPermissions = result.Data.Permissions;
                    this.accountAccessConsentResult = result;

                    this.toAccountAccessConsentTransactionDateTime = result.Data.TransactionToDateTime ? moment(result.Data.TransactionToDateTime).format() : null;
                    this.fromAccountAccessConsentTransactionDateTime = result.Data.TransactionFromDateTime ? moment(result.Data.TransactionFromDateTime).format() : null;
                    this.expirationDateTime = result.Data.ExpirationDateTime ? moment(result.Data.ExpirationDateTime).format() : null;

                    if (this.authorizedPermissions.length != 0) {
                        this.selectedPermissions = this.selectedPermissions.concat(this.authorizedPermissions);
                    }

                    this.disabledAccountAccessConsentData = true;
                    this.loadingAccountAccessConsentData = true;
                },
                    error => {
                        this.alertService.error(error);
                    });
        }
    }

    removeParamsFromUrl() {
        window.history.pushState({}, document.title, "/" + "");
    }

    createAccountAccessConsent() {
        const request: OBReadConsent1 = {
            Data: {
                Permissions: this.selectedPermissions
            },
            Risk: {}
        }
        if (this.expirationDateTime) {
            request.Data.ExpirationDateTime = this.expirationDateTime;
        }
        if (this.fromAccountAccessConsentTransactionDateTime) {
            request.Data.TransactionFromDateTime = this.fromAccountAccessConsentTransactionDateTime;
        }
        if (this.toAccountAccessConsentTransactionDateTime) {
            request.Data.TransactionToDateTime = this.toAccountAccessConsentTransactionDateTime;
        }

        this._accountAccessService.createAccountAccessConsents(request, this.emyptyAuthorization)
            .subscribe(result => {
                localStorage.setItem('currentConsentId', result.Data.ConsentId);
                this.redirectAuthorizationUrl(result.Data.ConsentId)
            },
                error => {
                    this.alertService.error(error);
                });
    }

    redirectAuthorizationUrl(ConsentId) {
        this._authorizationUrlService.getAuthorizationUrl(ConsentId)
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

    modifyfromAccountAccessConsentTransactionDateTime(inputDate) {
        this.fromAccountAccessConsentTransactionDateTime = inputDate ? moment(inputDate).format() : undefined;
    }

    modifytoAccountAccessConsentTransactionDateTime(inputDate) {
        this.toAccountAccessConsentTransactionDateTime = inputDate ? moment(inputDate).format() : undefined;
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

        this._transactionsService.getAccountsAccountIdTransactions(accountId.trim(), this.emyptyAuthorization, this.fapiFinancialId, '', '', '', fromBookingDateTime, toBookingDateTime).subscribe(
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
        this._accountsService.getAccountsAccountId(accountId.trim(), this.emyptyAuthorization).subscribe(
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
        this._balancesService.getAccountsAccountIdBalances(accountId.trim(), this.emyptyAuthorization).subscribe(
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
        this._beneficiariesService.getAccountsAccountIdBeneficiaries(accountId.trim(), this.emyptyAuthorization).subscribe(
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
        this._directDebitsService.getAccountsAccountIdDirectDebits(accountId.trim(), this.emyptyAuthorization).subscribe(
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

    getScheduledPayments() {
        this._scheduledPaymentsService.getScheduledPayments(this.emyptyAuthorization).subscribe(
            result => {
                this.scheduledPaymentsDataSource = new MatTableDataSource<any>(result.Data.ScheduledPayment);
                if (result.Data.ScheduledPayment.length == 0) {
                    this.isEmptyScheduledPayments = true;
                }
                setTimeout(() => this.scheduledPaymentsDataSource.paginator = this.scheduledPaymentsPaginator);
            },
            error => {
                this.alertService.error(error);
            });
    }

    getScheduledPaymentByAccount(accountId) {
        this._scheduledPaymentsService.getAccountsAccountIdScheduledPayments(accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                if (result.Data.ScheduledPayment.length == 0) {
                    this.isEmptyScheduledPaymentById = true;
                }
                this.scheduledPaymentByAccountDataSource = new MatTableDataSource<any>(result.Data.ScheduledPayment);
                setTimeout(() => this.scheduledPaymentByAccountDataSource.paginator = this.scheduledPaymentByAccountPaginator);
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
        this._standingOrdersService.getAccountsAccountIdStandingOrders(accountId.trim(), this.emyptyAuthorization).subscribe(
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

    getStatementsPdf(statementId, accountId) {
        this._statementsService.getAccountsAccountIdStatementsStatementIdFile(statementId.trim(), accountId.trim(), this.emyptyAuthorization).subscribe(
            result => {
                this.saveAsPdf(result, 'statements');
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

    saveAsPdf(fileBlob, filename) {
        const blob = new Blob([fileBlob], { type: 'application/pdf' });
        FileSaver.saveAs(blob, filename);
    }
}
@Component({
    template: '<pre>{{data | json}}</pre>',
})
export class ShowJsonDataDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ShowJsonDataDialog) { }
}