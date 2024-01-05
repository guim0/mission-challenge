export interface IProducts {
  id?: number;
  name: string;
  price: string;
  type: string;
}

function getRandomPrice() {
  return (Math.random() * (100 - 10) + 10).toFixed(2);
}

function generateMockData(numItems: number) {
  const mockData = [];
  let idCounter = 1;
  for (let i = 0; i < numItems; i++) {
    const name = `Item ${i + 1}`;
    const type = i % 2 === 0 ? "default" : "limited";
    const price = getRandomPrice();

    const item: IProducts = {
      id: idCounter++,
      name: name,
      type: type,
      price: `$${price}`,
    };

    mockData.push(item);
  }

  return mockData;
}
export const mockedList = generateMockData(3);

export const cartList: IProducts[] = [];
