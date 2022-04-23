export interface ValidatorCheckInterface {
    email?: boolean;
    mobile?: boolean;
    nationalCode?: boolean;
    bankCard?: boolean;
    objectId?: boolean;
    domain?: boolean;
    url?: boolean;
    linkedin?: boolean;
    smartsheetLink?: boolean;
    pattern?: RegExp;
    in?: any[];

    min?: number;
    max?: number;

    length?: {
        equal?: number;
        min?: number;
        max?: number;
    };

    arrayUnique?: boolean;
    arrayCount?: {
        equal?: number;
        min?: number;
        max?: number;
    };
    arrayExists?: string[];
    arrayIn?: any[];
}

export interface ValidatorInterface {
    title: string;
    type?: 'any' | 'number' | 'boolean' | 'date' | 'object' | 'string[]';
    required?: boolean;
    check?: ValidatorCheckInterface;
}
