import { Page } from '@playwright/test';

export class AutomationPage{

    constructor(private page:Page){}

    async createForm(name:string){

        await this.page.click('text=Create');

        await this.page.click('text=Form');

        await this.page.fill('input[name="name"]',name);

        await this.page.click('text=Create');

    }

}