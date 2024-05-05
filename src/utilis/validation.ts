import joi from 'joi';

export const loginValidator = ()=>{
    const VALID_SCHEMA= joi.object().keys({
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().messages({
            "any.required":"Email is required"
        }) ,
        password: joi.string().required().messages({
            "any.required" : "Password is required"
        })
    });
    return VALID_SCHEMA;
}


export const addCategoriesValidator = ()=>{
    const VALID_SCHEMA= joi.object().keys({
       categoryName: joi.string().required()
    }).unknown();
    return VALID_SCHEMA;
}

export const addServicesValidator = ()=>{
    const VALID_SCHEMA= joi.object().keys({
        serviceName: joi.string().required(),
        type: joi.string().required(),
        priceOptions: joi.array().items(
            joi.object({
                duration: joi.number().required(),
                type: joi.string().required(),
                price: joi.string().required()
            }).unknown()
        ).required()
    }).unknown();
    return VALID_SCHEMA;
}

export const updateServicesValidator = ()=>{
    const VALID_SCHEMA= joi.object().keys({
        serviceName: joi.string(),
        type: joi.string(),
        priceOptions: joi.array().items(
            joi.object({
                duration: joi.number().required(),
                type: joi.string().required(),
                price: joi.string(),
                priceOptionsId: joi.number().required()
            }).unknown()
        ).required()
    });
    return VALID_SCHEMA;
}

export const upadteCategoriesValidator = ()=>{
    const VALID_SCHEMA= joi.object().keys({
       categoryName: joi.string()
    }).unknown();
    return VALID_SCHEMA;
}