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
      super({ code: 400, data: { message: 'Email from user already exists.' } })
  }
}

export class RegisteredEmailNotFound extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'There was an error.' } })
  }
}

export class AutenticatedEmailNotFound extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Invalid email or password' } })
  }
}

export class UserNotFound extends CustomError {
  constructor() {
      super({ code: 404, data: { message: 'User not found.' } })
  }
}

export class AlreadyRegisteredPackageException extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Name from package already exists.' } })
  }
}

export class ForbiddenExcepption extends CustomError {
  constructor() {
      super({ code: 403, data: { message: 'Not allowed.' } })
  }
}

export class InvalidGenreException extends CustomError {
  constructor() {
      super({ code: 400, data: { message: 'Invalid genre(s).' } })
  }
}

