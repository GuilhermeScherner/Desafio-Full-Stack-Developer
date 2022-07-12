import enum


class ErrorCodeEnum(enum.Enum):
    INTERNAL_SERVER_ERROR = "internal-server-error"
    VALIDATION_ERROR = "validation-error"
    NOT_FOUND = "not-found"


class ApplicationException(Exception):
    def __init__(self, code: ErrorCodeEnum, message: str):
        self.code = code
        self.message = message


class Unauthorized(ApplicationException):
    pass


class AlreadyExists(ApplicationException):
    pass


class InternalServerError(ApplicationException):
    pass


class NotFound(Exception):
    def __init__(self, message: str):
        self.code = ErrorCodeEnum.NOT_FOUND
        self.message = message