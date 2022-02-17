import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface HelloRequest {
  name: string;
}

interface HelloReply {
  message: string;
}

// interface HelloService {
//   SayHello(data: HelloRequest): Observable<HelloReply>;
// }

@Controller('hello')
export class HelloController {
  @GrpcMethod('Greeter', 'SayHello')
  SayHello(data: HelloRequest): HelloReply {
    Logger.debug(`HelloController.SayHello: ${data.name}`);
    return { message: `Hello ${data.name}` };
  }
}
