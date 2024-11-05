import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '@lib/providers/typeorm/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
})
export class TypeormModule {}
