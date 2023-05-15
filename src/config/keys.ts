import "dotenv/config";

export const config = {
    port: process.env.PORT,
    mongodb_test: process.env.TEST_DB,
    cookies_secrat: process.env.COOKIES_SECRAT
}


