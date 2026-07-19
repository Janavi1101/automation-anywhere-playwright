import { test, expect, request } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Create Process API', async () => {

    const api = await request.newContext({

        baseURL: process.env.BASE_URL,

        extraHTTPHeaders: {

            'X-Authorization': process.env.TOKEN!,

            'Content-Type': 'application/json'

        }

    });

    // Create Form

    const createForm = await api.post('/v2/repository/files', {

        data: {

            name: 'Playwright Form',

            parentFolderId: process.env.PRIVATE_FOLDER_ID,

            description: '',

            contentType: 'application/vnd.aa.form'

        }

    });

    expect(createForm.status()).toBe(201);

    const form = await createForm.json();

    expect(form.id).toBeTruthy();

    const formId = form.id;

    // Create Process

    const createProcess = await api.post('/v2/repository/files', {

        data: {

            name: 'Playwright Process',

            parentFolderId: process.env.PRIVATE_FOLDER_ID,

            description: '',

            contentType: 'application/vnd.aa.workflow'

        }

    });

    expect(createProcess.status()).toBe(201);

    const process = await createProcess.json();

    expect(process.id).toBeTruthy();

    const processId = process.id;

    // Save Dependency

    const dependency = await api.put(

        `/v2/repository/files/${processId}/dependencies`,

        {

            data: {

                childFileIds: [formId]

            }

        }

    );

    expect(dependency.status()).toBe(200);

});