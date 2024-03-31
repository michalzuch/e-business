package com.example.plugins

import kotlinx.serialization.Serializable

@Serializable
data class Product(
    val id: Int,
    val name: String,
    val description: String,
    val price: Double,
    val stock: Int,
    val category: Int
)

var products: List<Product> = listOf(
    Product(1, "Laptop", "Powerful laptop for work and gaming", 999.99, 10, 1),
    Product(2, "Smartphone", "Latest smartphone with great features", 599.99, 20, 1),
    Product(3, "Headphones", "Noise-cancelling headphones for immersive experience", 99.99, 30, 1)
)

fun getProductsDetails(category: Int): String {
    val matchingProducts = products.filter { it.category == category }
    return matchingProducts.joinToString(separator = "\n") { "**${it.name}**: ${it.description}\n$${it.price}, ${it.stock} pieces available\n---" }
}
