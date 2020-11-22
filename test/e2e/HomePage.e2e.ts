/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);
const titleText = Selector('div.main-title > p');
const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async (t) => {
  await t.expect(getPageTitle()).eql('Hello Electron React!');
});

test('should open window and contain expected page title', async (t) => {
  await t.expect(getPageTitle()).eql('Hello Electron React!');
});

test(
  'should not have any logs in console of main window',
  assertNoConsoleErrors
);

test('should contain the main title', async (t) => {
  await t
    .expect(titleText.innerText)
    .eql('Type a user name, select it from the list and see the feeds!');
});
