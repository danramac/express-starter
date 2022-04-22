"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LNPayEvents = void 0;
const events_1 = require("events");
const lnpay_1 = __importDefault(require("lnpay"));
require("dotenv").config();
exports.LNPayEvents = {
    invoicePaid: "invoice-paid",
};
class LNPayService extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.createWallet = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = (0, lnpay_1.default)({
                    secretKey: "sak_g0jIDuMNqq9XsOufjY8D3IyV4ERssDwS",
                });
                // const wallet = await client.createWallet({
                //   user_label: username,
                // });
                // const newWallet = wallet.access_keys["Wallet Admin"][0];
                // TEMPORARY - PREXISTING WALLET - MAKING TOO MANY WALLETS
                const wallet = {
                    id: "wal_RCA20Sb9LkNIgM",
                    masterKey: "waka_T6xytEWyvIhImThC4dZj4GXl",
                    recieveKey: "waki_NX5nZ3QjfAh67qoOztOz5i",
                    readKey: "wakr_73y7IR2TuS7Z8cNFQWTKUrNq",
                    lnUrlWithdrawKey: "waklw_xA8BOJ3mhVc0i0dITc5aDgoZ",
                    lnUrlPayKey: "waklp_lT4w80fidOhzSKcv3dNQn8h",
                };
                return wallet;
            }
            catch (error) {
                console.error(error);
            }
        });
        this.getWallet = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tempKey = "waka_OWuCnc5qfAPc9uJ1W215qTL";
            try {
                const client = (0, lnpay_1.default)({
                    secretKey: (_a = process.env.LNPAY_SECRET) !== null && _a !== void 0 ? _a : "",
                    walletAccessKey: tempKey,
                });
                const balance = yield client.getBalance();
                return balance;
            }
            catch (error) {
                console.error(error);
            }
        });
        this.generateInvoice = (amount) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            try {
                const client = (0, lnpay_1.default)({
                    secretKey: (_b = process.env.LNPAY_SECRET) !== null && _b !== void 0 ? _b : "",
                    walletAccessKey: (_c = process.env.MASTER_KEY) !== null && _c !== void 0 ? _c : "",
                });
                const invoice = yield client.generateInvoice({
                    num_satoshis: amount,
                    memo: "This is a memo",
                    expiry: 86400,
                });
                return invoice;
            }
            catch (error) {
                console.error(error);
            }
        });
        this.payInvoice = (paymentRequest) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e;
            const lnpay = (0, lnpay_1.default)({
                secretKey: (_d = process.env.LNPAY_SECRET) !== null && _d !== void 0 ? _d : "",
                walletAccessKey: (_e = process.env.MASTER_KEY) !== null && _e !== void 0 ? _e : "",
            });
            try {
                const payInvoice = yield lnpay.payInvoice({
                    payment_request: paymentRequest,
                });
                return payInvoice;
            }
            catch (err) {
                console.log({ err });
            }
        });
    }
}
exports.default = new LNPayService();