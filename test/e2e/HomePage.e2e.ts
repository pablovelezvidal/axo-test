/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);
const getPageTitle = ClientFunction(() => document.title);
const feedsSelector = Selector('[data-tid="feeds"]');
const buttonsSelector = Selector('[data-tclass="btn"]');
const clickToFeedsLink = (t) =>
  t.click(Selector('a').withExactText('to Feeds'));
const incrementButton = buttonsSelector.nth(0);
const decrementButton = buttonsSelector.nth(1);
const oddButton = buttonsSelector.nth(2);
const asyncButton = buttonsSelector.nth(3);
const getFeedsText = () => feedsSelector().innerText;
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

test('should navigate to Feeds with click on the "to Feeds" link', async (t) => {
  await t.click('[data-tid=container] > a').expect(getFeedsText()).eql('0');
});

test('should navigate to /feeds', async (t) => {
  await t.click('a').expect(getPageUrl()).contains('/feeds');
});

fixture`Feeds Tests`
  .page('../../app/app.html')
  .beforeEach(clickToFeedsLink)
  .afterEach(assertNoConsoleErrors);

test('should display updated count after the increment button click', async (t) => {
  await t.click(incrementButton).expect(getFeedsText()).eql('1');
});

test('should display updated count after the descrement button click', async (t) => {
  await t.click(decrementButton).expect(getFeedsText()).eql('-1');
});

test('should not change even feeds if odd button clicked', async (t) => {
  await t.click(oddButton).expect(getFeedsText()).eql('0');
});

test('should change odd feeds if odd button clicked', async (t) => {
  await t
    .click(incrementButton)
    .click(oddButton)
    .expect(getFeedsText())
    .eql('2');
});

test('should change if async button clicked and a second later', async (t) => {
  await t
    .click(asyncButton)
    .expect(getFeedsText())
    .eql('0')
    .expect(getFeedsText())
    .eql('1');
});

test('should back to home if back button clicked', async (t) => {
  await t
    .click('[data-tid="backButton"] > a')
    .expect(Selector('[data-tid="container"]').visible)
    .ok();
});
