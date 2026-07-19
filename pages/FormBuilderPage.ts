import { Page } from '@playwright/test';

export class FormBuilderPage{

constructor(private page:Page){}

async upload(){

await this.page.setInputFiles(
'input[type=file]',
'fixtures/sample.pdf'
);

}

async save(){

await this.page.click('text=Save');

}

}