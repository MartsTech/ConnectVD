import swaggerJSDoc, {type Options} from "swagger-jsdoc";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ConnectVD API",
            version: "1.0.0"
        },
    },
    apis: ["./src/features/**/*-router.ts"],
};

export default swaggerJSDoc(options);