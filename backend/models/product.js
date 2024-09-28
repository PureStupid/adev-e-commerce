/**
 * Class that represents a product
 */
class Product {
  constructor(name, description, price, categoryId, picture) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
    this.picture = picture;
  }
}

module.exports = Product;
