import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // // requiere manejarse aqui y asi xq esta excepcion esta FUERA del contexto de HTTP y fuera del Exception Zonde de NestJS
    const ctx = host.switchToHttp(); // toma el contexto de ejecucion (Express, Fastify, etc)
    const response = ctx.getResponse();

    //
    const rpcError = exception.getError();
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isFinite(+rpcError.status) ? +rpcError.status : 400;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcError,
    });
  }
}
