export const choice = <I>(items: I[]): I =>
    items[Math.floor(Math.random() * items.length)];