/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import axios from 'axios';

import { CreateInvoiceLinkParams } from "$shared/types"

const TELEGRAM_BOT_TOKEN = defineSecret('TELEGRAM_BOT_TOKEN');
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

interface CreateInvoiceLinkResponse {
    ok: boolean;
    result: string;
}

export const generateStarPaymentLink = onRequest(async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            res.status(400).send("Amount is required 6");
            return;
        }

        const invoiceData: CreateInvoiceLinkParams = {
            title: "Mini Apps Star Payment Demo",
            description: "Demo payment description",
            payload: "custom payload here",
            provider_token: "", // empty string for payments in Telegram Stars
            currency: "XTR", // "XTR" for payments in Telegram Stars.
            prices: [{ label: "Telegram Stars", amount: amount }],
        };

        const response = await axios.post<CreateInvoiceLinkResponse>(`${TELEGRAM_API_URL}/createInvoiceLink`, invoiceData);

        if (response.data.ok) {
            console.log(response.data.result)
            res.status(200).send({ payment_link: response.data.result });
        } else {
            console.error("Failed to create payment link")
            res.status(500).send("Failed to create payment link");
        }
    } catch (error) {
        logger.error("Error generating payment link:", error);
        res.status(500).send("Internal Server Error");
    }
});