import requestCheck from 'request-check'
import { isEmail, isString } from '../utils/validator'
import { CustomError } from '../middlewares/error_handler'


export default class Rules {
    public validator

    constructor() {
        this.validator = requestCheck()
        this.validator.requiredMessage = 'Campo obrigatório!'

        this.validator.addRule('name', {
            validator: (value: any) => isString(value),
            message: 'Campo inválido!'
        })

        this.validator.addRule('email', {
            validator: (value: any) => isEmail(value),
            message: 'Campo inválido!'
        })

        this.validator.addRule('password', {
            validator: (value: any) => isString(value),
            message: 'Campo inválido!'
        })

        this.validator.addRule('newPassword', {
            validator: (value: any) => isString(value),
            message: 'Campo inválido!'
        })
    }

    public invalid (...args: Array<{ [key: string]: any } | null | undefined>): any {
        //@ts-ignore
        return this.validator.check(...args)
      }
    
      public validate (...args: Array<{ [key: string]: any } | undefined>) {
        //@ts-ignore
        const invalid = this.validator.check(...args)
    
        if (invalid) throw new CustomError({ code: 400, data: { 'Campos inválidos': { ...invalid } } })
      }
}