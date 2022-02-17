import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'helloworld',
      protoPath: join(__dirname, '../../pb/helloworld.proto'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(3002);
}
bootstrap();
