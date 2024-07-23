export interface CreateInvoiceLinkParams {
    // Required parameters
    title: string;
    description: string;
    payload: string;
    currency: string;
    prices: LabeledPrice[];

    // Optional parameters
    provider_token?: string;
    max_tip_amount?: number;
    suggested_tip_amounts?: number[];
    provider_data?: string;
    photo_url?: string;
    photo_size?: number;
    photo_width?: number;
    photo_height?: number;
    need_name?: boolean;
    need_phone_number?: boolean;
    need_email?: boolean;
    need_shipping_address?: boolean;
    send_phone_number_to_provider?: boolean;
    send_email_to_provider?: boolean;
    is_flexible?: boolean;
}

// Additional interface for LabeledPrice, which is used in the prices array
export interface LabeledPrice {
    label: string;
    amount: number;
}

// Function signature for createInvoiceLink
export type CreateInvoiceLink = (params: CreateInvoiceLinkParams) => Promise<string>;