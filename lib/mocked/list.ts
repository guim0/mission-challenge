export interface IProducts {
  name: string;
  price: string;
  type: string;
}

function getRandomPrice() {
  // Gera um preço aleatório entre 10 e 100
  return (Math.random() * (100 - 10) + 10).toFixed(2);
}

function generateMockData(numItems: number) {
  const mockData = [];

  for (let i = 0; i < numItems; i++) {
    const name = `Item ${i + 1}`;
    const type = i % 2 === 0 ? "default" : "limited";
    const price = getRandomPrice();

    const item: IProducts = {
      name: name,
      type: type,
      price: price,
    };

    mockData.push(item);
  }

  return mockData;
}
export const mockedList = generateMockData(3);

export const cartList: IProducts[] = [];