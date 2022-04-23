export type ValidatorMessageType =
    | 'undefined'
    | 'invalid'
    | 'empty'
    | 'email'
    | 'mobile'
    | 'min'
    | 'max'
    | 'length'
    | 'minLength'
    | 'maxLength'
    | 'arrayUnique'
    | 'arrayCount'
    | 'arrayMinCount'
    | 'arrayMaxCount';

export const ValidatorMessage: { [key in ValidatorMessageType]: string } = {
    undefined: '{{title}} is undefiend.',
    invalid: '{{title}} is not valid',
    empty: '{{title}} is required.',
    email: '{{title}} is not valid format.',
    mobile: '{{title}} is not valid format.',

    min: "{{title}} can't less than {{check}}.",
    max: '{{title}} can\t more than {{check}}.',

    length: '{{title}} should be {{check}} characters.',
    minLength: '{{title}} should be minimum {{check}} characters.',
    maxLength: '{{title}} should be maximum {{check}} characters.',

    arrayUnique: '{{title}} should be unique.',
    arrayCount: '{{title}} should be {{check}} items.',
    arrayMinCount: '{{title}} should be minimum {{check}} items.',
    arrayMaxCount: '{{title}} should be maximum {{check}} items.',
};
