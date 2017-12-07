import { AppPage } from './app.po';

describe('angular-simon-game App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it(`should display 'Simon' message`, () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Simon');
    });
});
