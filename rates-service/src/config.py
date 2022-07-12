from pydantic import AnyUrl, BaseSettings, conint


class Settings(BaseSettings):
    API_URL: AnyUrl
    CRYPTOCOMPARE_API_URL: AnyUrl
    FETCH_INTERVAL_SEC: conint(gt=0) = 5
    TOKEN: str


settings = Settings(_env_file='.env')