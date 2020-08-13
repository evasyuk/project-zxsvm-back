import { WrongArgument } from "../../error";

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
    // const defaultContextBuilder = ctx => (ctx.state.user || {})
    static contextBuilder() {}

    async run(params) {
        const cleanParams = await this.validate(params)
        return this.execute(cleanParams)
    }

    validate(data) {
        // // Cache validator
        // const validator =
        //     this.constructor.validator ||
        //     new LIVR.Validator(this.constructor.validationRules).prepare()
        // this.constructor.validator = validator
        //
        // return this._doValidationWithValidator(data, validator)

        return false
    }

    _doValidationWithValidator(data, validator) {
        const result = validator.validate(data)

        if (!result) {
            return Promise.reject({
                code: 'FORMAT_ERROR',
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