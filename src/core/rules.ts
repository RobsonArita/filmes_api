import requestCheck from 'request-check'
import { isArray, isEmail, isInt, isString } from '../utils/validator'
import { CustomError } from './exceptions'


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

        this.validator.addRule('enabledThemes', {
            validator: (value: any) => isArray(value) && Boolean((value as []).map(v => isInt(v))),
            message: 'Campo inválido!'
        })
        
        this.validator.addRule('version', {
            validator: (value: any) => isInt(value),
            message: 'Campo inválido!'
        })

        this.validator.addRule('genres', {
            validator: (value: any) => isArray(value) && Boolean((value as []).map(v => isInt(v))),
            message: 'Campo inválido!'
        })

        this.validator.addRule('userId', {
            validator: (value: any) => isInt(value),
            message: 'Campo inválido!'
        })

        this.validator.addRule('id', {
            validator: (value: any) => isInt(value),
            message: 'Campo inválido!'
        })
    
        this.validator.addRule('packageId', {
            validator: (value: any) => isInt(value),
            message: 'Campo inválido!'
        })

        this.validator.addRule('movieId', {
            validator: (value: any) => isInt(value),
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