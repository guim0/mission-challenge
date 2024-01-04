function getRandomPrice() {
  return (Math.random() * (100 - 10) + 10).toFixed(2);
}

function generateMockData(numItems: number) {
  const mockData = [];

  for (let i = 0; i < numItems; i++) {
    const name = `Item ${i + 1}`;
    const type = i % 2 === 0 ? "default" : "limited";
    const price = getRandomPrice();

    const item = {
      name: name,
      type: type,
      price: price,
    };

    mockData.push(item);
  }

  return mockData;
}

export const mockedList = generateMockData(5);
