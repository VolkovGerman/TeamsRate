import { TeamsRatePage } from './app.po';

describe('teams-rate App', function() {
  let page: TeamsRatePage;

  beforeEach(() => {
    page = new TeamsRatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
