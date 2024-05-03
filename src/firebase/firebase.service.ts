import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private storage: admin.storage.Storage;
    private bucket: any;

    constructor( private config: ConfigService) {}

    async onModuleInit(): Promise<void> {
        await this.connect();
        // to do: check connect to the storage bucket
        await this.checkBucketExistence();
    }

    private async connect(): Promise<void> {
        const serviceAccount = {
            projectId: this.config.get<string>('FIREBASE_PROJECT_ID'),
            privateKey: this.config.get<string>("FIREBASE_PRIVATE_KEY"),
            clientEmail: this.config.get<string>("FIREBASE_CLIENT_EMAIL"),
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: `${serviceAccount.projectId}.appspot.com`,
          });
      
        this.storage = admin.storage();
        this.bucket = this.storage.bucket();
    }

    private async checkBucketExistence(): Promise<void> {
        const [exists] = await this.bucket.exists();
        if (!exists) {
            throw new Error('Firebase: Storage bucket not found')
        }
        console.log('Firebase: connect to storage bucket successfully')
    }


}
