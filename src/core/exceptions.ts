import { IError } from "../middlewares/error_handler_middleware"

export class CustomError {
  readonly code: IError['code']
  readonly data: IError['data']

  constructor(err: IError) {
      this.code = err.code
      this.data = err.data
  }
}

export class AlreadyRegisteredUserException extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Já existe um usuário com o email informado.' } })
  }
}

export class RegisteredEmailNotFound extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Ocorreu um erro.' } })
  }
}

export class AutenticatedEmailNotFound extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Email ou senha inválida' } })
  }
}

export class UserNotFound extends CustomError {
  constructor() {
      super({ code: 404, data: { message: 'Usuário não encontrado.' } })
  }
}

export class AlreadyRegisteredPackageException extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Já existe um pacote com o nome informado.' } })
  }
}

export class UnauthorizedException extends CustomError {
  constructor() {
      super({ code: 401, data: { message: 'Permissão negada.' } })
  }
}
