import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodb: MongoMemoryServer;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongodb = new MongoMemoryServer();
                return {
                    uri: await mongodb.getConnectionString(),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                };
            }
        })
    ]
})
export class TestDatabaseModule {}

export const closeMongoConnection = async () => {
    if (mongodb) await mongodb.stop();
}
