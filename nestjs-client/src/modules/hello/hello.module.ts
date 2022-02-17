import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'helloworld',
          url: 'localhost:50051',
          protoPath: join(__dirname, '../../../../pb/helloworld.proto'),
        },
      },
    ]),
  ],
  controllers: [HelloController],
})
export class HelloModule {}
