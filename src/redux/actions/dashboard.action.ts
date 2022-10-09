import {Actions, Tags} from "../../components/card/model";
import {Wallet} from "../../components/dashboard/balanceDetails/model";
import {Activity, Devices} from "../../components/dashboard/loginTracker/model";
import {Transaction} from "../../components/dashboard/transactionHistory/model";
import {Updates} from "../../components/dashboard/updatesAndAnnouncements/model";
import * as types from "../types";
import {AllSettings} from "../../components/dashboard/securitySettings/model";
import {App} from "../../components/dashboard/appDownload/model";
import {IconTypes, SettingActionState, Status} from "../../components/dashboard/securitySettings/enum";
import {AppIcon} from "../../components/dashboard/appDownload/enum";
import {AccountType, TransactionType} from "../../components/dashboard/transactionHistory/enum";
import {CurrencyEnum} from "../../types/enum";

export const GetBalanceDetails = () => {
    return {
        type: types.BALANCE_DETAILS.SUCCESS,
        payload: balanceDetails
    }
}

export const GetUpdatesAndAnnouncements = () => {
    return {
        type: types.UPDATES_ANNOUNCEMENTS.SUCCESS,
        payload: updatesAndAnnouncements
    }
}

export const GetLoginTracker = () => {
    return {
        type: types.LOGIN_TRACKER.SUCCESS,
        payload: loginTracker
    }
}

export const GetTransactionHistory = () => {
    return {
        type: types.TRANSACTION_HISTORY.SUCCESS,
        payload: transactionHistory
    }
}

export const GetSecuritySettings = () => {
    return {
        type: types.SECURITY_SETTINGS.SUCCESS,
        payload: securitySettings
    }
}

export const GetAppDownload = () => {
    return {
        type: types.APP_DOWNLOAD.SUCCESS,
        payload: appDownload
    }
}

export const ToggleTotalBalance = () => {
    return {
        type: types.TOGGLE_TOTAL_BALANCE,
        payload: ""
    }
}


const balanceDetails: { cardActions: Actions[], cardTags: Tags[], wallets: Wallet[] } = {
    cardActions: [
        {
            name: "Deposit",
            isActive: true,
            link: "/deposits",
        },
        {
            name: "Withdraw",
            isActive: false,
            link: "/withdrawals",
        },
    ],
    cardTags: [
        {
            name: "Spot",
            isActive: true,
            actions: [
                {
                    name: "Deposit",
                    isActive: true,
                    link: "/deposits",
                },
                {
                    name: "Withdraw",
                    isActive: false,
                    link: "/withdrawals",
                },
            ],
        },
        {
            name: "P2P",
            isActive: false,
            actions: [
                {
                    name: "Send",
                    isActive: true,
                    link: "#",
                },
                {
                    name: "Receive",
                    isActive: false,
                    link: "#",
                },
            ],
        },
        // {
        //     name: "Margin",
        //     isActive: false,
        // },
        // {
        //     name: "Futures",
        //     isActive: false,
        // },
        // {
        //     name: "WzirX",
        //     isActive: false,
        // },
        // {
        //     name: "Pool",
        //     isActive: false,
        // },
    ],
    wallets: [
        {
            id: 1,
            currency: CurrencyEnum["USDT"],
            amount: 288.491536,
            percentage: 80,
            color: '#56BC7C',
        },
        {
            id: 2,
            currency: CurrencyEnum["BTC"],
            amount: 0.00747186,
            percentage: 10,
            color: "#FF9100"
        },
        {
            id: 3,
            currency: CurrencyEnum["ETH"],
            amount: 0.00747186,
            percentage: 10,
            color: "#F74876"
        },
    ]
}

const updatesAndAnnouncements: { updates: Updates[] } = {
    updates: [
        {
            id: 1,
            message:
                "Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
            date: new Date(Date.now()).toISOString(),
        },
        {
            id: 2,
            message:
                "Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
            date: new Date(Date.now()).toISOString(),
        },
        {
            id: 3,
            message:
                "Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
            date: new Date(Date.now()).toISOString(),
        },
        {
            id: 4,
            message:
                "Philippines Special: Trade & Earn on Binance P2P - 11,300 SLP Tokens to Be Won",
            date: new Date(Date.now()).toISOString(),
        },
    ]
}

const loginTracker: { devices: Devices[], cardTags: Tags[] } = {
    devices: [
        {
            id: 1,
            device: "Samsung S21",
            date: new Date(Date.now()).toISOString(),
            address: "197.211.58.66",
        },
        {
            id: 2,
            device: "Samsung S21",
            date: new Date(Date.now()).toISOString(),
            address: "197.211.58.66",
        },
        {
            id: 3,
            device: "Samsung S21",
            date: new Date(Date.now()).toISOString(),
            address: "197.211.58.66",
        },
        {
            id: 4,
            device: "Samsung S21",
            date: new Date(Date.now()).toISOString(),
            address: "197.211.58.66",
        },
    ],
    cardTags: [
        {
            name: "Activity",
            isActive: true,
        },
        // {
        //     name: "Login Devices",
        //     isActive: false,
        // },
    ]
}

const transactionHistory: { transactions: Transaction[], cardTags: Tags[] } = {
    cardTags: [
        {
            name: "Crypto Deposits",
            isActive: true,
        },
        {
            name: "Crypto Withdrawals",
            isActive: false,
        },
    ],
    transactions: [
        {
            id: 1,
            narration: "BTC Sent",
            date: new Date(Date.now()).toISOString(),
            amount: 0.0035,
            currency: CurrencyEnum["BTC"],
            user: {
                id: 1,
                walletId: "3GJ6a83dJ8h3kJKMjNpTxtpGxGAp",
            },
            transactionType: TransactionType["DEBIT"],
            accountType: AccountType["BTC_WALLET"],
        },
        {
            id: 2,
            narration: "Funded Naira Wallet",
            date: new Date(Date.now()).toISOString(),
            amount: 320000,
            currency: CurrencyEnum["NAIRA"],
            transactionType: TransactionType["CREDIT"],
            accountType: AccountType["NAIRA_WALLET"],
        },
        {
            id: 3,
            narration: "BTC Received",
            date: new Date(Date.now()).toISOString(),
            amount: 0.0035,
            currency: CurrencyEnum["BTC"],
            user: {
                id: 2,
                firstName: "John",
                lastName: "Ogu",
            },
            transactionType: TransactionType["CREDIT"],
            accountType: AccountType["BTC_WALLET"],
        },
        {
            id: 4,
            narration: "BTC Sent",
            date: new Date(Date.now()).toISOString(),
            amount: 0.0035,
            currency: CurrencyEnum["BTC"],
            user: {
                id: 3,
                firstName: "Ekene",
                lastName: "Kristrian",
            },
            transactionType: TransactionType["DEBIT"],
            accountType: AccountType["BTC_WALLET"],
        },
        {
            id: 5,
            narration: "ETH Sent",
            date: new Date(Date.now()).toISOString(),
            amount: 0.0035,
            currency: CurrencyEnum["ETH"],
            user: {
                id: 4,
                firstName: "Asaolu",
                lastName: "Ayomide",
            },
            transactionType: TransactionType["DEBIT"],
            accountType: AccountType["BTC_WALLET"],
        },
    ]
}

const securitySettings: { allSettings: AllSettings[] } = {
    allSettings: [
        {
            id: 1,
            name: "2FA Settings",
            icon: IconTypes.TWO_FA,
            state: SettingActionState.INACTIVE,
            status: Status.OFF,
        },
        {
            id: 2,
            name: "Verify Identity",
            icon: IconTypes.VERIFY_IDENTITY,
            state: SettingActionState.ACTIVE,
            status: Status.VERIFY,
        },
        {
            id: 3,
            name: "Anti-Phishing",
            icon: IconTypes.ANTI_PHISHING,
            state: SettingActionState.ACTIVE,
            status: Status.SETUP,
        },
        {
            id: 4,
            name: "Withdrawal Whitelist",
            icon: IconTypes.WITHDRAWAL_WHITELIST,
            state: SettingActionState.INACTIVE,
            status: Status.TURN_ON,
        },
    ]
}

const appDownload: { stores: [App, App] } = {
    stores: [
        {id: 1, name: "App Store", icon: AppIcon.APP_STORE, url: "https://facebook.com"},
        {
            id: 2,
            name: "Play Store",
            icon: AppIcon.PLAY_STORE,
            url: "https://facebook.com",
        },
    ]
}

