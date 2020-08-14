import LIVR from 'livr'
import extraRules from 'livr-extra-rules'

import { WrongArgument } from "../../error";
import ErrorFromDevelopers from "../../error/ErrorFromDevelopers";

LIVR.Validator.registerDefaultRules(extraRules)

class Executable {
    constructor(args) {
        if (!args.context) throw new WrongArgument('context required')
        this.context = args.context
    }

    // Example:
    //
    // const defaultParamsBuilder = () => ({})
    static paramsBuilder() {}

    // Example:
    //
    // const defaultContextBuilder = ctx => (ctx.state.session || {})
    static contextBuilder() {}

    async run(params) {
        const cleanParams = await this.validate(params)
        return this.execute(cleanParams)
    }

    validate(data) {
        if (this.constructor.validationRules) {
            try {
                if (!this.constructor.validator) {
                    this.constructor.validator = new LIVR.Validator(this.constructor.validationRules).prepare()
                }
            } catch (err) {
                throw new ErrorFromDevelopers('wrong validation rules for ' + this.constructor.name)
            }

            return this._doValidationWithValidator(data, this.constructor.validator)
        } else {
            return data
        }
    }

    _doValidationWithValidator(data, validator) {
        const result = validator.validate(data)

        if (!result) {
            return Promise.reject({
                message: 'validation failed',
                fields: validator.getErrors(),
            })
        }

        return Promise.resolve(result)
    }

    static get RESPONSE_TYPES() {
        return {
            JSON: 'JSON',
        }
    }

    static get responseType() {
        return this.RESPONSE_TYPES.JSON
    }
}

export default Executable