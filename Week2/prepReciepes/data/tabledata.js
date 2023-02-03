const tables = [
  {
    tableName: 'recipe',
    columns: [
      'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ',
      'name VARCHAR(50) NOT NULL',
    ],
    values: [
      ['No-Bake Cheesecake'],
      ['Roasted Brussels Sprouts'],
      ['Mac & Cheese'],
    ],
  },

  {
    tableName: 'ingredient',
    columns: [
      'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ',
      'name VARCHAR(50) NOT NULL',
    ],
    values: [
      ['Condensed milk'],
      ['Cream Cheese'],
      ['Lemon Juice'],
      ['Pie Crust'],
      ['Cherry Jam'],
      ['Brussels Sprouts'],
      ['Lemon juice'],
      ['Sesame seeds'],
      ['Pepper'],
      ['Salt'],
      ['Olive oil'],
    ],
  },

  {
    tableName: 'recipe_ingredient',
    columns: [
      'recipe_id INT NOT NULL, ',
      'ingredient_id INT NOT NULL, ',
      'FOREIGN KEY (recipe_id) REFERENCES recipe(id), ',
      'FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)',
    ],
    values: [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [2, 10],
      [2, 11],
    ],
  },
];

export { tables };
