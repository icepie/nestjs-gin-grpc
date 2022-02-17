import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface HelloRequest {
  name: string;
}

interface HelloReply {
  message: string;
}

interface HelloService {
  SayHello(data: HelloRequest): Observable<HelloReply>;
}

@Controller('hello')
export class HelloController implements OnModuleInit {
  private helloService: HelloService;

  constructor(@Inject('HELLO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.helloService = this.client.getService<HelloService>('Greeter');
  }

  @Get(':name')
  SayHello(@Param('name') name: string): Observable<HelloReply> {
    return this.helloService.SayHello({ name: name });
  }
}
