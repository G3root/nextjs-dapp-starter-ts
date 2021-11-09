import { expect } from './chai-setup';
import { ethers, deployments, getUnnamedAccounts } from 'hardhat';
import { Storage } from '../../next-app/src/typechain';
import { setupUsers } from './utils';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('Storage');
  const contracts = {
    Storage: <Storage>await ethers.getContract('Storage'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});
describe('Storage', function () {
  it('should set data to the store', async function () {
    const { users } = await setup();
    const testMessage = 'Hello World';
    await users[0].Storage.set(testMessage);
    const currentValue = await users[0].Storage.store();
    expect(currentValue).to.be.not.undefined;
    expect(currentValue).to.be.not.null;
    expect(currentValue).to.be.not.NaN;
    expect(currentValue).to.equal(testMessage);
  });
  it('should retrieve data from the store', async function () {
    const { users } = await setup();
    const testMessage = 'Hello World';
    await users[0].Storage.set(testMessage);
    const currentValue = await users[0].Storage.retrieve();
    expect(currentValue).to.be.not.undefined;
    expect(currentValue).to.be.not.null;
    expect(currentValue).to.be.not.NaN;
    expect(currentValue).to.equal(testMessage);
  });
});
