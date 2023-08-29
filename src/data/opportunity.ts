import { faker } from "@faker-js/faker";

faker.seed(1234);

export const alphabet = Array.from(Array(26)).map((_, i) =>
  String.fromCharCode(i + 65)
);

export const createOpportunity = () => ({
  id: faker.string.uuid(),
  accountId: faker.string.uuid(),
  amount: faker.commerce.price({ min: 1000, max: 10000 }),
  amountCurrencyCode: faker.finance.currencyCode(),
  aRR: faker.commerce.price({ min: 1000, max: 1000000 }),
  aRRCurrencyCode: faker.finance.currencyCode(),
  closeDate: faker.date.recent(),
  contractStartDate: faker.date.future(),
  contractEndDate: faker.date.future({ years: 2 }),
  cSMOwner: faker.string.uuid(),
  isClosed: faker.datatype.boolean(),
  isWon: faker.datatype.boolean(),
  listPriceAdjusted: faker.commerce.price(),
  ownerId: faker.string.uuid(),
  paidDate: faker.date.recent(),
  product: faker.commerce.productName(),
  margin: (faker.number.float() * 100).toFixed(0),
  profit: faker.commerce.price(),
  sEOwner: faker.string.uuid(),
  splitPercentage: (faker.number.float() * 100).toFixed(0),
  stageName: faker.commerce.department(),
  type: faker.commerce.productMaterial(),
  name: faker.company.name(),
  ...Object.fromEntries(
    alphabet.map((char) => [char, faker.random.alphaNumeric(8)])
  ),
});

export type Opportunity = ReturnType<typeof createOpportunity>;
