import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  // // NATS ===================================
  NATS_SERVERS: string[];

  // // TCP - NO usar TCP =====================
  // products microservice
  // PRODUCTS_MICROSERVICE_HOST: string;
  // PRODUCTS_MICROSERVICE_PORT: number;

  // orders microservice
  // ORDERS_MICROSERVICE_HOST: string;
  // ORDERS_MICROSERVICE_PORT: number;
}

// validate envs with joi schema
const envsSchema = joi
  .object({
    PORT: joi.number().required(), // ya lo parsea a number

    // // NATS ===================================
    NATS_SERVERS: joi.array().items(joi.string()).required(),

    // // TCP ===================================
    // products microservice
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),

    // orders microservice
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true); // allow other envs not defined in schema - process.env

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
  PORT: envsVars.PORT,

  // // NATS ===================================
  NATS_SERVERS: envsVars.NATS_SERVERS,

  // // TCP ===================================
  // products microservice
  // PRODUCTS_MICROSERVICE_HOST: envsVars.PRODUCTS_MICROSERVICE_HOST,
  // PRODUCTS_MICROSERVICE_PORT: envsVars.PRODUCTS_MICROSERVICE_PORT,

  // orders microservice
  // ORDERS_MICROSERVICE_HOST: envsVars.ORDERS_MICROSERVICE_HOST,
  // ORDERS_MICROSERVICE_PORT: envsVars.ORDERS_MICROSERVICE_PORT,
};
